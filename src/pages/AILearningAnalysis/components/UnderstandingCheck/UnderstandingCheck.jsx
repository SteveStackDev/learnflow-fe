import { useState } from "react";
import { Link } from "react-router";
import styles from "./UnderstandingCheck.module.css";
import Icon from "~/components/Icon/Icon";
import { Card, Button } from "~/components/ui";

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];

function UnderstandingCheck({ quiz, nextProblem }) {
  const [selectedId, setSelectedId] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showAlternate, setShowAlternate] = useState(false);
  const [reExplaining, setReExplaining] = useState(false);

  if (!quiz) return null;

  const isCorrect = checked && selectedId === quiz.correctOptionId;
  const isIncorrect = checked && selectedId !== null && selectedId !== quiz.correctOptionId;

  const handleSelect = (optionId) => {
    if (checked) return;
    setSelectedId(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedId) return;
    setChecked(true);
  };

  const handleExplainDifferently = () => {
    setReExplaining(true);
    // Simulate AI re-explaining using an alternative conceptual model
    setTimeout(() => {
      setShowAlternate(true);
      setReExplaining(false);
      setChecked(false);
      setSelectedId(null);
    }, 900);
  };

  return (
    <Card hoverable className={styles.quiz_card}>
      <h3 className={styles.title}>
        <Icon name="HelpCircle" size={18} className={styles.title_icon} />
        <span>Check Your Understanding</span>
      </h3>

      {showAlternate && (
        <div className={styles.alternate_box}>
          <span className={styles.alternate_label}>
            <Icon name="RefreshCw" size={13} />
            <span>Explained a different way</span>
          </span>
          <p className={styles.alternate_text}>{quiz.alternateExplanation}</p>
        </div>
      )}

      <p className={styles.question}>{quiz.question}</p>

      {/* Multiple Choice Options List */}
      <div className={styles.options_stack}>
        {quiz.options.map((opt, idx) => {
          const isSelected = selectedId === opt.id;
          const revealCorrect = checked && opt.id === quiz.correctOptionId;
          const revealWrong = checked && isSelected && opt.id !== quiz.correctOptionId;

          let optionStateClass = "";
          if (isSelected && !checked) optionStateClass = styles["option--selected"];
          if (revealCorrect) optionStateClass = styles["option--correct"];
          if (revealWrong) optionStateClass = styles["option--wrong"];

          return (
            <button
              key={opt.id}
              type="button"
              disabled={checked}
              onClick={() => handleSelect(opt.id)}
              className={`${styles.option_btn} ${optionStateClass}`}
            >
              <span className={styles.option_letter}>{OPTION_LETTERS[idx]}</span>
              <span className={styles.option_text}>{opt.text}</span>
              {revealCorrect && <Icon name="CheckCircle2" size={17} className={styles.icon_correct} />}
              {revealWrong && <Icon name="X" size={17} className={styles.icon_wrong} />}
            </button>
          );
        })}
      </div>

      {/* Check Answer Button */}
      {!checked && (
        <Button
          variant="contained"
          size="md"
          className={styles.check_btn}
          disabled={!selectedId}
          onClick={handleCheckAnswer}
        >
          Check Answer
        </Button>
      )}

      {/* Correct Result Banner */}
      {isCorrect && (
        <div className={styles.feedback_correct}>
          <div className={styles.feedback_head}>
            <Icon name="CheckCircle2" size={18} />
            <span>Correct!</span>
          </div>
          <p className={styles.feedback_text}>You understood the key concept.</p>

          {nextProblem && (
            <Link to={`/ai-learning/problem/${nextProblem.id}`} className={styles.next_link_wrapper}>
              <Button variant="contained" size="sm" rightIcon="ArrowRight" className={styles.next_btn}>
                Try this next: {nextProblem.title}
              </Button>
            </Link>
          )}
        </div>
      )}

      {/* Incorrect Result Banner & Re-explain Option */}
      {isIncorrect && (
        <div className={styles.feedback_wrong}>
          <div className={styles.feedback_head}>
            <Icon name="AlertCircle" size={18} />
            <span>Not quite.</span>
          </div>
          <p className={styles.feedback_text}>
            Let&apos;s explain this from another perspective.
          </p>

          <Button
            variant="outlined"
            size="sm"
            leftIcon={reExplaining ? null : "RefreshCw"}
            className={styles.explain_btn}
            onClick={handleExplainDifferently}
            disabled={reExplaining}
          >
            {reExplaining ? "Thinking of another way…" : "Explain Differently"}
          </Button>
        </div>
      )}
    </Card>
  );
}

export default UnderstandingCheck;
