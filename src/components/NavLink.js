import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Icon from 'material-ui/Icon';
import { withStyles } from 'material-ui/styles';

const styles = {
  link: {
    textDecoration: 'none',
  },
  active: {
    color: 'red',
  },
};

const NavLink = ({
  to,
  icon,
  text,
  classes,
  exact,
}) => {
  return (
    <RouterNavLink to={to} className={classes.link} exact={exact}>
      <ListItem button>
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </RouterNavLink>
  );
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  exact: PropTypes.bool,
};

NavLink.defaultProps = {
  exact: false,
};

export default withStyles(styles)(NavLink);
