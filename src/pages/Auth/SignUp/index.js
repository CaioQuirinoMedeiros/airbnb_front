import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ReactLoading from 'react-loading';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import Logo from '../../../assets/images/logo.svg';

import {
  Container, Form, Input, ButtonsWrapper, Button, Line, Link,
} from '../styles';

const schema = Yup.object().shape({
  username: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Type a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Your password must have at least 6 characters')
    .required('Password is required'),
});

class SignUp extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  state = {
    loading: false,
  };

  handleSignUp = async (formData) => {
    const { history } = this.props;

    try {
      this.setState({ loading: true });

      await api.post('/users', formData);

      history.push('/');

      toast.success('Great! Now you can login');
    } catch (err) {
      toast.error('Unable to register');
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading } = this.state;

    return (
      <Container>
        <Form schema={schema} onSubmit={this.handleSignUp}>
          <img src={Logo} alt="Logo" />

          <Input name="username" placeholder="Name" />

          <Input type="email" name="email" placeholder="Email" />

          <Input type="password" name="password" placeholder="Password" />

          <ButtonsWrapper>
            <Button color="red" type="submit">
              {loading ? <ReactLoading type="bubbles" width={40} /> : 'Sign Up'}
            </Button>
            <Line />
            <Link to="/">I already have an account</Link>
          </ButtonsWrapper>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);
