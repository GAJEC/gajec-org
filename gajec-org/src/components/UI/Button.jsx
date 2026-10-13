import React from "react";
import Icon from "./Icon";

const Button = ({
  children,
  variant = "primary",
  href,
  icon,
  onClick,
  type = "button",
  className = "",
  ...rest
}) => {
  const classes = `btn btn--${variant} ${className}`.trim();
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} size={16} />}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button className={classes} type={type} onClick={onClick} {...rest}>
      {content}
    </button>
  );
};

export default Button;
