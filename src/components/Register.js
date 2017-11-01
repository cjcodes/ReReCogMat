import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import MaskedInput from 'react-text-mask';
import { withStyles } from 'material-ui/styles';
import {
  TextField,
  Input,
  Button,
  Typography,
  CircularProgress,
  Grid,
} from 'material-ui';

const styles = {
  field: {
    marginBottom: '2em',
  },
  button: {
    margin: '0 auto',
    display: 'block',
  },
};

class PhoneInput extends Component {
  render() {
    return (
      <MaskedInput
        {...this.props}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', '-', ' ', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }
}


class Register extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

    autoBind(this);
  }

  submit(event) {
    event.preventDefault();

    this.setState({
      loading: true,
    });

    const {
      email,
      password,
      given_name,
      family_name,
      phone_number,
    } = this.state;

    this.props.onSubmit(email, password, given_name, family_name, phone_number);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { loading } = this.state;
    const { classes, className } = this.props;

    return (
      <form onSubmit={this.submit} className={className}>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              className={classes.field}
              onChange={this.handleChange}
              label='First Name'
              name='given_name'
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.field}
              onChange={this.handleChange}
              label='Last Name'
              name='family_name'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              className={classes.field}
              onChange={this.handleChange}
              label='Mobile Number'
              name='phone_number'
              inputComponent={PhoneInput}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.field}
              onChange={this.handleChange}
              label='Email'
              name='email'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.field}
              onChange={this.handleChange}
              label='Password'
              name='password'
              type='password'
              fullWidth
            />
          </Grid>
        </Grid>

        <Button
          className={classes.button}
          color='primary'
          type='submit'
          raised
          disabled={loading}>
          { loading ?
            <CircularProgress color='primary' size={14} /> :
            <Typography color='inherit'>Register</Typography>
          }
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(Register);
