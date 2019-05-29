import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { Container, Images, Image } from "./styles";

import api from "../../services/api";
import { getId } from "../../services/auth";

const intlMonetary = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2
});

export default class Property extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    }).isRequired
  };

  state = {
    property: null,
    loading: false
  };

  async componentDidMount() {
    try {
      const { id } = this.props.match.params;
      this.setState({ loading: true });

      const { data } = await api.get(`/properties/${id}`);
      this.setState({ property: data, error: "" });
    } catch (err) {
      console.log(err);
      this.setState({ property: null, error: "Something went wrong" });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleNotification = (error, type = "error") =>
    this.setState({ error: error }, () =>
      toast(this.state.error, {
        type,
        className: "toast",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false
      })
    );

  deleteProperty = async () => {
    try {
      const { id } = this.props.match.params;

      await api.delete(`/properties/${id}`);

      this.handleNotification("Móvel deletado com sucesso!", "success");
      this.props.history.push("/app");
    } catch (err) {
      console.log(err);
    }
  };

  handleCancel = () => {
    this.props.history.push("/app");
  };

  renderProperty = () => {
    const { property } = this.state;
    const { match } = this.props;

    if (!property) return "Imóvel não encontrado";

    return (
      <>
        <h1>{property.title}</h1>
        <hr />
        <h4>Endereço:</h4>
        <p>{property.address}</p>
        <h4>Descrição:</h4>
        <p>{property.description}</p>
        <Images>
          {property.images.map(image => {
            return <Image url={image.url} key={image.path} />;
          })}
        </Images>
        <div className="footer">
          <span>{intlMonetary.format(property.price)}</span>
          {parseInt(getId()) === property.user_id && (
            <div>
              <Link
                to={{
                  pathname: `${match.url}/edit`,
                  state: { id: property.id }
                }}
              >
                Editar
              </Link>
              <button onClick={this.deleteProperty}>
                <i className="fa fa-trash" />
              </button>
            </div>
          )}
        </div>
        <i className="close fa fa-times" onClick={this.handleCancel} />
      </>
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <Container>
        {loading ? <p>Carregando</p> : this.renderProperty()}
      </Container>
    );
  }
}
