import React from "react";
import styles from "./Card.module.css";

export function Card({
  children,
  variant = "default", // default | glass | elevated | popular | pro
  hoverable = false,
  className = "",
  onClick,
  ...rest
}) {

  const cardClasses = [
    styles.card,
    variant !== "default" ? styles[`card--${variant}`] : "",
    hoverable ? styles["card--hoverable"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses} onClick={onClick} {...rest}>
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className = "", ...rest }) {
  return (
    <div className={`${styles.card__header} ${className}`} {...rest}>
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, className = "", ...rest }) {
  return (
    <div className={`${styles.card__body} ${className}`} {...rest}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ children, className = "", ...rest }) {
  return (
    <div className={`${styles.card__footer} ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Card;
