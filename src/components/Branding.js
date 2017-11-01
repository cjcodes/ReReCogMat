import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';

const Branding = ({
  mini,
  className,
  subheading
}) => (
  <hgroup className={className}>
    <Typography type='title'>Rise Messaging</Typography>
    {subheading &&
      <Typography type='subheading'>
        {subheading}
      </Typography>
    }
  </hgroup>
);

Branding.propTypes = {
  mini: PropTypes.bool,
  className: PropTypes.string,
  subheading: PropTypes.string,
};

Branding.defaultProps = {
  mini: true,
};

export default Branding;
