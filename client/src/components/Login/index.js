import React from 'react';
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.primary.contrastText,
    display: 'flex',
    flexDirection: 'column',
    flexFlow: 'auto',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    height: '100vh',
    backgroundImage:
      "url('https://images.pexels.com/photos/459469/pexels-photo-459469.jpeg?cs=srgb&dl=basil-delicious-food-459469.jpg&fm=jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  loginCard: {
    width: '100%',
    maxWidth: 384,
    boxShadow: '9px 9px 5px -8px rgba(0,0,0,0.75)',
    border: '1px solid black'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    fontWeight: 'bolder',
    color: '#335B86'
  },
  formtext: {
    margin: '16px 0 32px 0'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%'
  },
  action: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 0 24px 0'
  },
  textField: {
    marginBottom: 12,
    backgroundColor: 'white',
    border: '1px solid white'
  },
  button: {
    backgroundColor: 'lightgrey',
    color: 'black',
    '&:hover': {
      backgroundColor: '#335B86',
      color: 'white'
    }
  },
  link: {
    color: '#881128'
  },
  logo: {
    position: 'absolute',
    top: 10,
    margin: '0 auto',
    objectFit: 'cover'
  }
}));

export default props => {
  const classes = useStyles();

  const renderLogo = () => (
    <div className={classes.logo}>
      <img alt="logo" src={logo} />
    </div>
  );

  return (
    <div className={`${classes.root} root-comp`}>
      {renderLogo()}
      <div className={classes.container}>
        <Card className={classes.loginCard}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h4" className={classes.formtext}>
              Sign In
            </Typography>

            <form name="loginForm" noValidate className={classes.form}>
              <TextField
                className={classes.textField}
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                required
                fullWidth
              />

              <TextField
                className={classes.textField}
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                required
                fullWidth
              />

              <Button
                style={{ margin: '0 auto' }}
                className={classes.button}
                fullWidth
                variant="contained"
                color="primary"
                aria-label="Login"
                type="button"
                onClick={() => props.history.push('./dashboard')}
              >
                Log In
              </Button>
            </form>

            <div className={classes.action}>
              <span>Don't have an account?</span>
              <Link className={classes.link} to="/">
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
