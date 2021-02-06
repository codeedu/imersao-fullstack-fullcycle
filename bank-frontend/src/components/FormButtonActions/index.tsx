import classes from "./FormButtonActions.module.scss";

const FormButtonActions: React.FunctionComponent = (props) => {
  return <div className={classes.root}>{props.children}</div>;
};

export default FormButtonActions;