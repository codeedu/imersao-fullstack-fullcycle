import * as React from "react";
import classes from "./Card.module.scss";

const Card: React.FunctionComponent = (props) => {
  return <div className={classes.root}>{props.children}</div>;
};

export default Card;
