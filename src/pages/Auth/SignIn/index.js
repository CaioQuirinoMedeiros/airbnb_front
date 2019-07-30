import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ReactLoading from 'react-loading';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import api from '../../../services/api';
import { login } from '../../../services/auth';

import Logo from '../../../assets/images/logo.svg';

import {
  Container, Form, Input, Link, ButtonsWrapper, Line, Button,
} from '../styles';

const schema = Yup.object().shape({
  email: Yup.string().required('Fill in your email'),
  password: Yup.string().required('Fill in your password'),
});

class SingIn extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  state = {
    loading: false,
  };

  handleSingIn = async (formData) => {
    const { history } = this.props;

    try {
      this.setState({ loading: true });

      const { data } = await api.post('/sessions', formData);

      login(data.token, data.id);

      history.push('/app');

      toast.success(`Welcome, ${data.username}!`);
    } catch (err) {
      console.log(err);
      toast.error('Invalid credentials');
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading } = this.state;

    return (
      <Container>
        <Form schema={schema} onSubmit={this.handleSingIn}>
          <img src={Logo} alt="Logo" />

          <Input type="email" name="email" placeholder="Email" />

          <Input type="password" name="password" placeholder="Password" />

          <ButtonsWrapper>
            <Button type="submit" color="red">
              {loading ? <ReactLoading type="bubbles" width={40} /> : 'Login'}
            </Button>
            <Line />
            <Link to="/signup">Sign up for free</Link>
          </ButtonsWrapper>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SingIn);
