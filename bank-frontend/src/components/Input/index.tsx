// @flow
import { forwardRef } from "react";
import slug from "slug";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  labelText?: string;
}
const formGroupClasses = {
  text: "form-group",
  number: "form-group",
  radio: "form-check",
};

const inputClasses = {
  text: "form-control",
  number: "form-control",
  radio: "form-check-input",
};

const labelClasses = {
  text: "",
  number: "",
  radio: "form-check-label",
};
const Input = forwardRef<any, InputProps>((props, ref) => {
  const { labelText, type = "text", ...rest } = props;
  const id = props.id ?? props.name ?? slug(labelText ?? "");
  const Label = labelText && (
    <label className={labelClasses[type]} htmlFor={id}>
      {labelText}
    </label>
  );

  const CustomInput = (
    <input id={id} className={inputClasses[type]} type={type} {...rest} ref={ref} />
  );
  return (
    <div className={formGroupClasses[type]}>
      {type === "radio" && (
        <>
          {CustomInput}
          {Label}
        </>
      )}
      {(type === "text" || type === "number") && (
        <>
          {Label}
          {CustomInput}
        </>
      )}
    </div>
  );
});

export default Input;
