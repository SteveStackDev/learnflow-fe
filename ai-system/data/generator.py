from pathlib import Path
import json

# ============================================================
# CONFIG
# ============================================================

OUTPUT_DIR = Path(r"C:\fyset_llm\data\sample_bai1")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


# ============================================================
# BASE CORRECT SOLUTION
# Problem: Thuê công nhân
# ============================================================

BASE = r'''
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    long long t;
    cin >> n >> t;

    vector<long long> a(n);

    for (int i = 0; i < n; ++i) {
        cin >> a[i];
    }

    sort(a.begin(), a.end());

    long long sum = 0;
    int count = 0;

    for (int i = 0; i < n; ++i) {
        if (sum + a[i] <= t) {
            sum += a[i];
            ++count;
        } else {
            break;
        }
    }

    cout << count << '\n';

    return 0;
}
'''


# ============================================================
# HELPERS
# ============================================================

cases = {}


def add_case(number, error_type, code):
    filename = f"case{number:02d}.cpp"

    (OUTPUT_DIR / filename).write_text(
        code.strip() + "\n",
        encoding="utf-8"
    )

    cases[filename] = error_type


# ============================================================
# 01-05: OFF_BY_ONE
# ============================================================

add_case(
    1,
    "OFF_BY_ONE",
    BASE.replace(
        "for (int i = 0; i < n; ++i) {",
        "for (int i = 1; i < n; ++i) {",
        1
    )
)

add_case(
    2,
    "OFF_BY_ONE",
    BASE.replace(
        "for (int i = 0; i < n; ++i) {",
        "for (int i = 0; i <= n; ++i) {",
        1
    )
)

add_case(
    3,
    "OFF_BY_ONE",
    BASE.replace(
        "for (int i = 0; i < n; ++i) {",
        "for (int i = 0; i < n - 1; ++i) {",
        1
    )
)

add_case(
    4,
    "OFF_BY_ONE",
    BASE.replace(
        "sum + a[i] <= t",
        "sum + a[i] < t"
    )
)

add_case(
    5,
    "OFF_BY_ONE",
    BASE.replace(
        "++count;",
        "count += (i + 1 < n);"
    )
)


# ============================================================
# 06-09: LOOP_CONDITION
# ============================================================

add_case(
    6,
    "LOOP_CONDITION",
    BASE.replace(
        "sum + a[i] <= t",
        "sum + a[i] < t"
    )
)

add_case(
    7,
    "LOOP_CONDITION",
    BASE.replace(
        "for (int i = 0; i < n; ++i) {",
        "for (int i = 0; i <= n; ++i) {",
        1
    )
)

add_case(
    8,
    "LOOP_CONDITION",
    BASE.replace(
        "sum + a[i] <= t",
        "sum + a[i] > t"
    )
)

add_case(
    9,
    "LOOP_CONDITION",
    BASE.replace(
        "sum + a[i] <= t",
        "sum + a[i] >= t"
    )
)


# ============================================================
# 10-13: BOUNDARY_ERROR
# ============================================================

code = BASE.replace(
    "vector<long long> a(n);",
    "vector<long long> a(100005);"
)

add_case(10, "BOUNDARY_ERROR", code)


code = BASE.replace(
    "vector<long long> a(n);",
    "vector<long long> a(n - 1);"
)

add_case(11, "BOUNDARY_ERROR", code)


code = BASE.replace(
    "if (sum + a[i] <= t)",
    "if (i < n - 1 && sum + a[i] <= t)"
)

add_case(12, "BOUNDARY_ERROR", code)


code = BASE.replace(
    "if (sum + a[i] <= t)",
    "if (i > 0 && sum + a[i] <= t)"
)

add_case(13, "BOUNDARY_ERROR", code)


# ============================================================
# 14-17: INTEGER_OVERFLOW
# ============================================================

add_case(
    14,
    "INTEGER_OVERFLOW",
    BASE.replace(
        "long long t;",
        "int t;"
    )
)

add_case(
    15,
    "INTEGER_OVERFLOW",
    BASE.replace(
        "long long sum = 0;",
        "int sum = 0;"
    )
)

add_case(
    16,
    "INTEGER_OVERFLOW",
    BASE.replace(
        "vector<long long> a(n);",
        "vector<int> a(n);"
    ).replace(
        "long long sum = 0;",
        "int sum = 0;"
    )
)

add_case(
    17,
    "INTEGER_OVERFLOW",
    BASE.replace(
        "sum + a[i] <= t",
        "(int)(sum + a[i]) <= t"
    )
)


# ============================================================
# 18-21: WRONG_SORT_ORDER
# ============================================================

add_case(
    18,
    "WRONG_SORT_ORDER",
    BASE.replace(
        "sort(a.begin(), a.end());",
        "sort(a.begin(), a.end(), greater<long long>());"
    )
)

add_case(
    19,
    "WRONG_SORT_ORDER",
    BASE.replace(
        "sort(a.begin(), a.end());",
        "sort(a.rbegin(), a.rend());"
    )
)

add_case(
    20,
    "WRONG_SORT_ORDER",
    BASE.replace(
        "sort(a.begin(), a.end());",
        """sort(
        a.begin(),
        a.end(),
        [](long long x, long long y) {
            return x > y;
        }
    );"""
    )
)

add_case(
    21,
    "WRONG_SORT_ORDER",
    BASE.replace(
        "sort(a.begin(), a.end());",
        "sort(a.begin(), a.end(), [](long long x, long long y) { return x >= y; });"
    )
)


# ============================================================
# 22-25: GREEDY_LOGIC_ERROR
# ============================================================

code = BASE.replace(
    "sort(a.begin(), a.end());",
    "sort(a.begin(), a.end());\n    reverse(a.begin(), a.end());"
)
add_case(22, "GREEDY_LOGIC_ERROR", code)


code = BASE.replace(
    "sum + a[i] <= t",
    "sum + 2 * a[i] <= t"
)
add_case(23, "GREEDY_LOGIC_ERROR", code)


code = BASE.replace(
    "sum + a[i] <= t",
    "sum + a[i] <= t - 1"
)
add_case(24, "GREEDY_LOGIC_ERROR", code)


code = BASE.replace(
    "sum + a[i] <= t",
    "sum + a[i] <= t / 2"
)
add_case(25, "GREEDY_LOGIC_ERROR", code)


# ============================================================
# 26-28: MISSING_UPDATE
# ============================================================

code = BASE.replace(
    "sum += a[i];",
    "// BUG: forgot to update sum"
)
add_case(26, "MISSING_UPDATE", code)


code = BASE.replace(
    "++count;",
    "// BUG: forgot to update count"
)
add_case(27, "MISSING_UPDATE", code)


code = BASE.replace(
    "sum += a[i];\n            ++count;",
    "++count;"
)
add_case(28, "MISSING_UPDATE", code)


# ============================================================
# 29-31: WRONG_INITIALIZATION
# ============================================================

add_case(
    29,
    "WRONG_INITIALIZATION",
    BASE.replace(
        "long long sum = 0;",
        "long long sum = 1;"
    )
)

add_case(
    30,
    "WRONG_INITIALIZATION",
    BASE.replace(
        "int count = 0;",
        "int count = 1;"
    )
)

add_case(
    31,
    "WRONG_INITIALIZATION",
    BASE.replace(
        "long long sum = 0;",
        "long long sum = -1;"
    )
)


# ============================================================
# 32-35: WRONG_FORMULA
# ============================================================

add_case(
    32,
    "WRONG_FORMULA",
    BASE.replace(
        "sum + a[i] <= t",
        "sum + a[i] * 2 <= t"
    )
)

add_case(
    33,
    "WRONG_FORMULA",
    BASE.replace(
        "sum += a[i];",
        "sum += a[i] * a[i];"
    )
)

add_case(
    34,
    "WRONG_FORMULA",
    BASE.replace(
        "++count;",
        "count += a[i];"
    )
)

add_case(
    35,
    "WRONG_FORMULA",
    BASE.replace(
        "sum + a[i] <= t",
        "sum + a[i] + 1 <= t"
    )
)


# ============================================================
# 36-38: EDGE_CASE
# ============================================================

code = BASE.replace(
    "if (sum + a[i] <= t) {",
    """if (n == 1) {
            if (a[i] < t) {"""
).replace(
    "        } else {",
    """            } else {
                break;
            }
        } else {""",
    1
)
add_case(36, "EDGE_CASE", code)


code = BASE.replace(
    "if (sum + a[i] <= t) {",
    """if (t == 0) {
            if (sum + a[i] <= t) {"""
).replace(
    "        } else {",
    """            } else {
                break;
            }
        } else {""",
    1
)
add_case(37, "EDGE_CASE", code)


code = BASE.replace(
    "if (sum + a[i] <= t)",
    "if (a[i] == 1 ? sum + a[i] < t : sum + a[i] <= t)"
)
add_case(38, "EDGE_CASE", code)


# ============================================================
# 39-40: OTHER
# ============================================================

code = BASE.replace(
    "sort(a.begin(), a.end());",
    """sort(a.begin(), a.end());
    if (!a.empty()) {
        a[0] = 0;
    }"""
)
add_case(39, "OTHER", code)


code = BASE.replace(
    "sort(a.begin(), a.end());",
    """sort(a.begin(), a.end());
    if (n > 0) {
        a[n - 1] = a[n - 1] + 1000000000LL;
    }"""
)
add_case(40, "OTHER", code)


# ============================================================
# GROUND TRUTH
# ============================================================

ground_truth_path = OUTPUT_DIR / "ground_truth.json"

ground_truth_path.write_text(
    json.dumps(cases, indent=2, ensure_ascii=False),
    encoding="utf-8"
)


# ============================================================
# SUMMARY
# ============================================================

from collections import Counter

counter = Counter(cases.values())

print("=" * 60)
print("FySet - 40 Error Cases Generator")
print("=" * 60)
print()
print(f"Output folder:")
print(OUTPUT_DIR)
print()
print(f"Generated: {len(cases)} .cpp files")
print(f"Generated: ground_truth.json")
print()
print("Distribution:")

for error_type, count in counter.items():
    print(f"  {error_type:<25} {count}")

print()
print("DONE.")
print("=" * 60)