import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import {
  Container, Images, Image, PopUp,
} from './styles';

import api from '../../services/api';
import { getId } from '../../services/auth';

const intlMonetary = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
});

export default class Property extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  state = {
    property: null,
    loading: false,
    confirmationPopUp: false,
  };

  async componentDidMount() {
    const { match } = this.props;

    try {
      const { id } = match.params;
      this.setState({ loading: true });

      const { data } = await api.get(`/properties/${id}`);
      this.setState({ property: data });
    } catch (err) {
      console.log(err);
      this.setState({ property: null });
    } finally {
      this.setState({ loading: false });
    }
  }

  openConfirmationPopUp = () => {
    this.setState({ confirmationPopUp: true });
  };

  deleteProperty = async () => {
    const { history, match } = this.props;

    try {
      const { id } = match.params;

      await api.delete(`/properties/${id}`);

      toast.success('Móvel deletado com sucesso!');
      history.push('/app');
    } catch (err) {
      console.log(err);
    }
  };

  handleCancel = () => {
    const { history } = this.props;
    history.push('/app');
  };

  renderProperty = () => {
    const { property } = this.state;
    const { match } = this.props;

    if (!property) return 'Imóvel não encontrado';

    return (
      <>
        <h1>{property.title}</h1>
        <hr />
        <h4>Endereço:</h4>
        <p>{property.address}</p>
        <h4>Descrição:</h4>
        <p>{property.description}</p>
        <Images>
          {property.images.map(image => (
            <Image url={image.url} key={image.path} />
          ))}
        </Images>
        <div className="footer">
          <span>{intlMonetary.format(property.price)}</span>
          {parseInt(getId()) === property.user_id && (
            <div>
              <Link
                to={{
                  pathname: `${match.url}/edit`,
                  state: { id: property.id },
                }}
              >
                Editar
              </Link>
              <button type="button" onClick={this.openConfirmationPopUp}>
                <i className="fa fa-trash" />
              </button>
            </div>
          )}
        </div>
        <button type="button" onClick={this.handleCancel}>
          <i className="close fa fa-times" />
        </button>
      </>
    );
  };

  renderConfirmationPopUp = () => (
    <PopUp>
      <h3>Deseja prosseguir?</h3>
      <div>
        <button type="button" onClick={() => this.setState({ confirmationPopUp: false })}>
          Não
        </button>
        <button type="button" onClick={this.deleteProperty}>
          Sim
        </button>
      </div>
    </PopUp>
  );

  render() {
    const { loading, confirmationPopUp } = this.state;
    return (
      <Container>
        {loading ? <p>Carregando</p> : this.renderProperty()}
        {confirmationPopUp && this.renderConfirmationPopUp()}
      </Container>
    );
  }
}
