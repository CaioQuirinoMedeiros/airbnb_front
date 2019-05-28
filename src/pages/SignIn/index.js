import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import ReactLoading from "react-loading";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import api from "../../services/api";
import { login } from "../../services/auth";

import Logo from "../../assets/images/logo.svg";
import { Container } from "./styles";

class SingIn extends Component {
  state = {
    error: "",
    loading: false
  };

  schema = () =>
    Yup.object().shape({
      email: Yup.string().required(() =>
        this.handleError("Preecha o seu email")
      ),
      password: Yup.string().required(() =>
        this.handleError("Preecha a sua senha")
      )
    });

  componentDidMount() {
    const { location } = this.props;

    if (!location.state) return;

    if (location.state.successSignUp) {
      toast.success("Usuário registrado com sucesso!", {
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false
      });

      this.props.history.replace({
        ...this.props.location,
        state: { ...this.props.location.state, successSignUp: false }
      });
    }
  }

  handleError = error =>
    this.setState({ error: error }, () =>
      toast.error(this.state.error, {
        className: "toast",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false
      })
    );

  handleSingIn = async (formData, { resetForm }) => {
    this.setState({ loading: true });

    try {
      const { data } = await api.post("/sessions", formData);

      login(data.token, data.id);

      resetForm();

      this.setState({ loading: false });
      this.props.history.push("/app");
    } catch (err) {
      this.setState({ loading: false });
      this.handleError("Credenciais inválidas");
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <Container>
        <Form schema={this.schema()} onSubmit={this.handleSingIn}>
          <img src={Logo} alt="Logo" />
          <Input type="email" placeholder="Endereço de e-mail" name="email" />
          <Input type="password" placeholder="Senha" name="password" />
          <div className="blank">&nbsp;</div>
          {
            <button type="submit">
              {loading ? <ReactLoading type="bubbles" width={56} /> : "Login"}
            </button>
          }
          <hr />
          <Link to="/signup">Sign Up</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SingIn);
