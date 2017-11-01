import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {
  Drawer,
  List,
  Divider,
} from 'material-ui';

import NavLink from './NavLink';
import Branding from './Branding';

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: theme.drawerWidth,
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    padding: theme.spacing.unit * 3,
    textAlign: 'center',
  },
});

const Nav = ({
  classes,
  children,
  account,
}) => (
  <div className={classes.root}>
    <Drawer
      type="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Branding subheading={account} />
      </div>
      <Divider />
      <List>
        <NavLink to="/" text="Home" icon="Inbox" exact />
        <NavLink to="/test" text="Test" icon="Send" />
      </List>
      <Divider />
      <List>Item</List>
    </Drawer>
    {children}
  </div>
)

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
  account: PropTypes.string.isRequired,
};

export default withStyles(styles)(Nav);
