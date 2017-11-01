import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { withStyles } from 'material-ui/styles';
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
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

class Login extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    error: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      remember: false,
      loading: false,
      errors: {
        email: null,
        password: null,
      }
    };

    autoBind(this);
  }

  submit(event) {
    event.preventDefault();

    this.setState({
      loading: true,
    });

    const { email, password } = this.state;
    this.props.onSubmit(email, password);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errors: {
        ...this.state.errors,
        [event.target.name]: null,
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.error) {
      return;
    }

    switch (nextProps.error.code) {
      case 'NotAuthorizedException':
        this.setState({
          errors: {
            email: 'Email or password is incorrect.',
            password: 'Email or password is incorrect.',
          },
          loading: false,
        });
        break;
      default:
        this.setState({
          errors: {
            email: 'Something went wrong with this email address.',
          },
          loading: false,
        });
    }
  }

  render() {
    const { loading, errors } = this.state;
    const { classes, className } = this.props;

    return (
      <form onSubmit={this.submit} className={className}>
        <TextField
          className={classes.field}
          onChange={this.handleChange}
          label='Email'
          name='email'
          type='email'
          error={errors.email !== null}
          helperText={errors.email}
          fullWidth
        />
        <TextField
          className={classes.field}
          onChange={this.handleChange}
          label='Password'
          type='password'
          name='password'
          error={errors.password !== null}
          helperText={errors.password}
          fullWidth
        />
        <Button
          className={classes.button}
          color='primary'
          type='submit'
          raised
          disabled={loading}>
          { loading ?
            <CircularProgress color='primary' size={14} /> :
            <Typography color='inherit'>Log In</Typography>
          }
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(Login);
