import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from 'material-ui';

import { signOut } from '../modules/user';

const styles = theme => ({
  root: {
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    width: `calc(100% - ${theme.drawerWidth}px)`,
    marginLeft: theme.drawerWidth,
  },
  flex: {
    flex: 1,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

const Content = ({
  classes,
  user,
  signOut,
  title,
  children,
}) => (
  <div className={classes.root}>
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography type="title" color="inherit" noWrap className={classes.flex}>
          {title}
        </Typography>
        {user !== null &&
          <Button onClick={signOut} color='accent'>Log Out</Button>
        }
      </Toolbar>
    </AppBar>
    <main className={classes.content}>
      {children}
    </main>
  </div>
);

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
}

const mapDispatchToProps = {
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Content));
