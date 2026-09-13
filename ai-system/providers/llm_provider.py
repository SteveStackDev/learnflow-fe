"""
LLM provider for FySet.

Architecture contract:
- services/llm_classifier.py is the MAIN classifier.
- Preserve benchmark failure categories:
    API_ERROR
    TRUNCATED
    INVALID_RESPONSE

Ling 3.0 Flash Fin:
- Model: inclusionai/ling-3.0-flash-fin:free
- Reasoning budget: 512 tokens
- Completion budget: 2000 tokens
"""

import json
import os
import time

try:
    from openai import OpenAI
except ImportError:
    OpenAI = None


# ============================================================
# Configuration
# ============================================================

DEFAULT_MODEL = os.getenv(
    "FYSET_LLM_MODEL",
    "inclusionai/ling-3.0-flash-fin:free",
)

OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

DEFAULT_REASONING_TOKENS = int(
    os.getenv("FYSET_LLM_REASONING_TOKENS", "512")
)

DEFAULT_MAX_TOKENS = int(
    os.getenv("FYSET_LLM_MAX_TOKENS", "2000")
)


# ============================================================
# Errors
# ============================================================

class LLMUnavailableError(RuntimeError):
    pass


class LLMAPIError(LLMUnavailableError):
    pass


class LLMTruncatedError(LLMUnavailableError):
    pass


class LLMInvalidResponseError(LLMUnavailableError):
    pass


# ============================================================
# Provider
# ============================================================

class LLMProvider:

    def __init__(
        self,
        model: str = None,
        base_url: str = OPENROUTER_BASE_URL,
        reasoning_tokens: int = DEFAULT_REASONING_TOKENS,
    ):
        self.model = model or DEFAULT_MODEL
        self.reasoning_tokens = reasoning_tokens

        api_key = os.getenv("OPENROUTER_API_KEY")

        self.available = bool(
            api_key and OpenAI is not None
        )

        self.client = (
            OpenAI(
                base_url=base_url,
                api_key=api_key,
            )
            if self.available
            else None
        )

    # ========================================================
    # Simple interface
    # ========================================================

    def chat_json(
        self,
        system,
        user,
        temperature=0.0,
        max_tokens=DEFAULT_MAX_TOKENS,
    ):
        parsed, _meta = self.chat_json_with_meta(
            system=system,
            user=user,
            temperature=temperature,
            max_tokens=max_tokens,
        )

        return parsed

    # ========================================================
    # Main request
    # ========================================================

    def chat_json_with_meta(
        self,
        system,
        user,
        temperature=0.0,
        max_tokens=DEFAULT_MAX_TOKENS,
    ):

        if not self.available:
            raise LLMAPIError(
                "LLM provider unavailable: "
                "missing OPENROUTER_API_KEY or openai package."
            )

        t0 = time.time()

        try:
            response = self.client.chat.completions.create(
                model=self.model,

                messages=[
                    {
                        "role": "system",
                        "content": system,
                    },
                    {
                        "role": "user",
                        "content": user,
                    },
                ],

                temperature=temperature,

                # Total completion budget.
                max_tokens=max_tokens,

                # IMPORTANT:
                # OpenRouter reasoning config goes through extra_body
                # when using the OpenAI Python SDK.
                extra_body={
                    "reasoning": {
                        "max_tokens": self.reasoning_tokens,
                    }
                },
            )

        except Exception as e:

            status_code = getattr(
                e,
                "status_code",
                None,
            )

            error_message = str(e)

            if status_code is not None:
                error_message = (
                    f"(status={status_code}) {error_message}"
                )

            raise LLMAPIError(
                f"LLM API error: {error_message}"
            ) from e

        latency_ms = (
            time.time() - t0
        ) * 1000.0

        # ====================================================
        # Validate response
        # ====================================================

        if not response.choices:
            raise LLMAPIError(
                "LLM returned no choices."
            )

        choice = response.choices[0]

        finish_reason = getattr(
            choice,
            "finish_reason",
            None,
        )

        message = getattr(
            choice,
            "message",
            None,
        )

        content = ""

        if message is not None:
            content = (
                getattr(
                    message,
                    "content",
                    None,
                )
                or ""
            ).strip()

        # ====================================================
        # Token metadata
        # ====================================================

        usage = getattr(
            response,
            "usage",
            None,
        )

        prompt_tokens = None
        completion_tokens = None
        total_tokens = None
        reasoning_tokens = None

        if usage:

            prompt_tokens = getattr(
                usage,
                "prompt_tokens",
                None,
            )

            completion_tokens = getattr(
                usage,
                "completion_tokens",
                None,
            )

            total_tokens = getattr(
                usage,
                "total_tokens",
                None,
            )

            completion_details = getattr(
                usage,
                "completion_tokens_details",
                None,
            )

            if completion_details:

                reasoning_tokens = getattr(
                    completion_details,
                    "reasoning_tokens",
                    None,
                )

        # ====================================================
        # Benchmark metadata
        # ====================================================

        meta = {
            "latency_ms": latency_ms,

            "finish_reason": finish_reason,

            "model": self.model,

            "prompt_tokens": prompt_tokens,
            "completion_tokens": completion_tokens,
            "total_tokens": total_tokens,

            # Actual usage reported by provider.
            "reasoning_tokens": reasoning_tokens,

            # Configured budget.
            "reasoning_budget": self.reasoning_tokens,

            # Completion limit.
            "max_tokens": max_tokens,
        }

        # ====================================================
        # Debug
        # ====================================================

        print("\n========== LLM TOKEN DEBUG ==========")
        print(f"MODEL:             {self.model}")
        print(f"MAX TOKENS:        {max_tokens}")
        print(
            f"REASONING BUDGET:  "
            f"{self.reasoning_tokens}"
        )
        print(
            f"FINISH REASON:     "
            f"{finish_reason}"
        )
        print(
            f"PROMPT TOKENS:     "
            f"{prompt_tokens}"
        )
        print(
            f"COMPLETION TOKENS: "
            f"{completion_tokens}"
        )
        print(
            f"TOTAL TOKENS:      "
            f"{total_tokens}"
        )
        print(
            f"REASONING TOKENS:  "
            f"{reasoning_tokens}"
        )
        print(
            f"LATENCY:           "
            f"{latency_ms:.0f} ms"
        )
        print("=====================================\n")

        # ====================================================
        # Truncated
        # ====================================================

        if finish_reason == "length":
            raise LLMTruncatedError(
                "LLM response truncated because "
                "completion token limit was reached."
            )

        # ====================================================
        # Empty response
        # ====================================================

        if not content:
            raise LLMInvalidResponseError(
                "LLM returned an empty response."
            )

        # ====================================================
        # Remove Markdown JSON fences
        # ====================================================

        if content.startswith("```"):

            lines = content.splitlines()

            if (
                lines
                and lines[0]
                .strip()
                .startswith("```")
            ):
                lines = lines[1:]

            if (
                lines
                and lines[-1].strip() == "```"
            ):
                lines = lines[:-1]

            content = "\n".join(lines).strip()

        # ====================================================
        # Parse JSON
        # ====================================================

        try:
            parsed = json.loads(content)

        except json.JSONDecodeError as e:

            raise LLMInvalidResponseError(
                f"LLM returned invalid JSON: {e}"
            ) from e

        # ====================================================
        # Return
        # ====================================================

        return parsed, meta