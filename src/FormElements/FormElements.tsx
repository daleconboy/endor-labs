import React from "react";
import styles from "./FormElements.module.css"
import classNames from "classnames";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...rest }: ButtonProps): React.ReactElement {
  return <button {...rest} className={styles.button}>{children}</button>;
}


type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  labelText: string;
}

export function InputField({
  className,
  labelText,
  ...rest
}: InputFieldProps): React.ReactElement {
  return (
    <div className={classNames(styles.field, className)}>
      <p>
        <label className={styles.fieldLabel} htmlFor="todo-name">{labelText}</label>
      </p>
      <input {...rest} className={styles.inputLike} type="text" id="todo-name"></input>
    </div>
  );
}

export type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
  options: { id: string, value: string }[];
  labelText: string;
}

export function SelectField({
  className,
  options,
  labelText,
  ...rest
}: SelectFieldProps): React.ReactElement {
  return (
    <div className={classNames(styles.field, className)}>
      <p>
        <label className={styles.fieldLabel} htmlFor="todo-tags">{labelText}</label>
      </p>
      <select {...rest} className={classNames(styles.inputLike, styles.select)} id="todo-tags">
        {options.map(
          ({id, value}) => <option value={id} key={id}>{value}</option>
        )}
      </select>
    </div>
  );
}
