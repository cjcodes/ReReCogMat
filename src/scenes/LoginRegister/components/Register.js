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
    onSubmitForm: PropTypes.func.isRequired,
    onSubmitCode: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    registered: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    registered: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      loadingRegister: false,
      loadingCode: false,
    };

    autoBind(this);
  }

  submitForm(event) {
    event.preventDefault();

    this.setState({
      loadingRegister: true,
    });

    const {
      email,
      password,
      given_name,
      family_name,
      phone_number,
    } = this.state;

    this.props.onSubmitForm(email, password, given_name, family_name, phone_number);
  }

  submitCode(event) {
    event.preventDefault();

    this.setState({
      loadingCode: true,
    });

    const { code, password } = this.state;

    this.props.onSubmitCode(code, password);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  renderForm() {
    const { loadingRegister } = this.state;
    const { classes, className } = this.props;

    return (
      <form onSubmit={this.submitForm} className={className}>
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
          disabled={loadingRegister}>
          { loadingRegister ?
            <CircularProgress color='primary' size={14} /> :
            <Typography color='inherit'>Register</Typography>
          }
        </Button>
      </form>
    );
  }

  renderCode() {
    const { loadingCode } = this.state;
    const { classes, className } = this.props;

    return (
      <form onSubmit={this.submitCode} className={className}>
        <Typography className={classes.field}>
          Great! Check your email for a confirmation code to verify your email address.
        </Typography>

        <TextField
          className={classes.field}
          onChange={this.handleChange}
          label='Confirmation Code'
          name='code'
          fullWidth
        />

        <Button
          className={classes.button}
          color='primary'
          type='submit'
          raised
          disabled={loadingCode}>
          { loadingCode ?
            <CircularProgress color='primary' size={14} /> :
            <Typography color='inherit'>Confirm</Typography>
          }
        </Button>
      </form>
    )
  }

  render() {
    const { registered } = this.props;

    return (
      <div>
        {registered
          ? this.renderCode()
          : this.renderForm()
        }
      </div>
    )
  }
}

export default withStyles(styles)(Register);
