import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import ReactLoading from "react-loading";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import api from "../../services/api";

import Logo from "../../assets/images/logo.svg";
import { Container } from "./styles";

class SignUp extends Component {
  state = {
    error: "",
    loading: false
  };

  schema = () =>
    Yup.object().shape({
      username: Yup.string().required(() =>
        this.handleError("Preencha o Nome do usuário")
      ),
      email: Yup.string().required(() => this.handleError("Preecha o Email")),
      password: Yup.string().required(() => this.handleError("Preecha a Senha"))
    });

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

  handleSignUp = async (data, { resetForm }) => {
    try {
      this.setState({ loading: true, error: "" });
      await api.post("/users", data);

      resetForm();

      this.props.history.push({
        pathname: "/",
        state: { successSignUp: true }
      });
    } catch (err) {
      this.handleError("Erro ao cadastrar usuário");
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <Container>
        <Form schema={this.schema()} onSubmit={this.handleSignUp}>
          <img src={Logo} alt="Logo" />
          <Input placeholder="Nome de usuário" name="username" />
          <Input type="email" placeholder="Endereço de e-mail" name="email" />
          <Input type="password" placeholder="Senha" name="password" />
          {
            <button type="submit">
              {loading ? <ReactLoading type="bubbles" width={56} /> : "Sign Up"}
            </button>
          }
          <hr />
          <Link to="/">Login</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);
