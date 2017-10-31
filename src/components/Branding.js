import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';

const Branding = ({
  mini,
  className,
}) => (
  <hgroup className={className}>
    <Typography type='title'>App Title</Typography>
  </hgroup>
);

Branding.propTypes = {
  mini: PropTypes.bool,
  className: PropTypes.string,
};

Branding.defaultProps = {
  mini: true,
};

export default Branding;
