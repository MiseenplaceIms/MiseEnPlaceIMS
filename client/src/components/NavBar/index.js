import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Six Caps, sans-serif;',
    letterSpacing: 3,
    fontSize: '3rem'
  },
  icon: {
    backgroundColor: 'white',
    color: '#335B86',
    height: 40,
    width: 40,
    borderRadius: '50%'
  }
}));

export default function MenuAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const signOut = () => {
    handleClose();
    props.history.push('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" className={classes.title}>
            Mise en Place
          </Typography>
          {
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle className={classes.icon} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>My Account</MenuItem>
                <MenuItem onClick={signOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
