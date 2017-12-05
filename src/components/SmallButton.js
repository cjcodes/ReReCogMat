import React from 'react';
import { withStyles } from 'material-ui/styles';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';

const size = 32;

const styles = {
  icon: {
    fontSize: size/2+2,
  },
  button: {
    width: size,
    height: size,
    color: 'inherit',
  },
};

const SmallButton = (props) => {
  const { title, classes, delay, ...rest } = props;
  const enterDelay = delay ? 200 : 0;

  return (
    <Tooltip title={title} enterDelay={enterDelay}>
      <IconButton
        {...rest}
        disableRipple
        classes={{
          icon: classes.icon,
        }}
        className={classes.button}
      />
    </Tooltip>
  );
};

export default withStyles(styles)(SmallButton);
