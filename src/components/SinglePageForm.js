import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import Branding from './Branding';

const styles = {
  hgroup: {
    textAlign: 'center',
    marginTop: '4em',
  },
  spf: {
    margin: '0 auto',
    width: 380,
  },
  card: {
    marginTop: '4em',
  }
};

const SinglePageForm = ({
  classes,
  children,
}) => (
  <div className={classes.spf}>
    <Branding mini={false} className={classes.hgroup} />
    <Paper className={classes.card}>
      {children}
    </Paper>
  </div>
);

SinglePageForm.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SinglePageForm);
