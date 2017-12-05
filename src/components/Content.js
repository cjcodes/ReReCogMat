import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Paper,
} from 'material-ui';

import { signOut } from '../modules/user';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
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
    width: 900,
    margin: [0, 'auto'],
    padding: [
      theme.spacing.unit * 4,
      theme.spacing.unit * 8,
    ],
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  fullwidth: {
    width: '100%',
  },
  paper: {
    minHeight: '100%',
    padding: theme.spacing.unit * 3,
  },
});

const Content = ({
  classes,
  signOut,
  title,
  children,
  authenticated,
  fullwidth,
}) => (
  <div className={classes.root}>
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography type="title" color="inherit" noWrap className={classes.flex}>
          {title}
        </Typography>
        {authenticated &&
          <Button onClick={signOut} color='accent'>Log Out</Button>
        }
      </Toolbar>
    </AppBar>
    <main className={`${classes.content} ${fullwidth ? classes.fullwidth : ''}`}>
      <Paper className={classes.paper}>
        {children}
      </Paper>
    </main>
  </div>
);

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = state => {
  return {
    authenticated: state.user.authenticated,
  };
}

const mapDispatchToProps = {
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Content));
