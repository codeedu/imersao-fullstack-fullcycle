import classes from './Title.module.scss';

const Title: React.FunctionComponent = (props) => {
    return (
        <h1 className={classes.root}>
            {props.children}
        </h1>
    );
};

export default Title;
