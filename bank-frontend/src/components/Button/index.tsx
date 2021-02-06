// @flow
import * as React from "react";
import BankContext from "../../context/BankContext";
interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "primary" | "info";
}

const buttonClasses = {
  primary: "btn-primary",
  info: "btn-info",
};
const Button = React.forwardRef<any, ButtonProps>((props, ref) => {
  const { variant = "primary", ...rest } = props;
  const bank = React.useContext(BankContext);
  const className = [
    "btn",
    buttonClasses[variant],
    bank.cssCode,
    props.className,
  ]
    .join(" ")
    .trim();
  return <button className={className} {...rest} ref={ref} />;
});

export default Button;
