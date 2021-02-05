import classes from './Footer.module.scss';
console.log(classes);
const Footer: React.FunctionComponent = (props) => {
  return (
    <footer className={classes.root}>
      <img src="/img/logo_pix.png" alt="Code Pix" />
    </footer>
  );
};

export default Footer;