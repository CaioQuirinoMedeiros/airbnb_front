import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';

import api from '../../services/api';
import { isMyId } from '../../services/auth';

import Confirmation from '../../components/Confirmation';

import {
  Container,
  Title,
  Line,
  Info,
  Footer,
  ButtonsWrapper,
  Button,
  CloseButton,
  Images,
  Image,
} from './styles';

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
      url: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  state = {
    property: null,
    loading: false,
    confirmationOpen: false,
  };

  async componentDidMount() {
    const { match } = this.props;

    try {
      this.setState({ loading: true });

      const { id } = match.params;

      const { data } = await api.get(`/properties/${id}`);

      this.setState({ property: data });
    } catch (err) {
      console.log(err);
      toast.error('Error trying to get this property');
      this.setState({ property: null });
    } finally {
      this.setState({ loading: false });
    }
  }

  openConfirmation = () => {
    this.setState({ confirmationOpen: true });
  };

  deleteProperty = async () => {
    const { history, match } = this.props;

    try {
      const { id } = match.params;

      await api.delete(`/properties/${id}`);

      toast.success('Property deleted!');

      history.push('/app');
    } catch (err) {
      console.log(err);
      toast.error("Couldn't delete property");
    }
  };

  handleCancel = () => {
    const { history } = this.props;
    history.push('/app');
  };

  renderProperty = () => {
    const { property } = this.state;
    const { match } = this.props;

    if (!property) return 'Property not found';

    return (
      <>
        <Title>{property.title}</Title>

        <Line />

        <Info>
          <h4>Address:</h4>
          <p>{property.address}</p>
        </Info>

        <Info>
          <h4>Description:</h4>
          <p>{property.description}</p>
        </Info>

        <Images>
          {property.images.map(image => (
            <Image key={image.path} href={image.url}>
              <div />
            </Image>
          ))}
        </Images>

        <Footer>
          <span>{intlMonetary.format(property.price)}</span>
          {isMyId(property.user_id) && (
            <ButtonsWrapper>
              <Link
                to={{
                  pathname: `${match.url}/edit`,
                  state: { id: property.id },
                }}
              >
                <Button color="red">
                  <i className="fa fa-edit" />
                </Button>
              </Link>
              <Button color="red" onClick={this.openConfirmation}>
                <i className="fa fa-trash" />
              </Button>
            </ButtonsWrapper>
          )}
        </Footer>
        <CloseButton type="button" onClick={this.handleCancel}>
          <i className="fa fa-times" />
        </CloseButton>
      </>
    );
  };

  render() {
    const { loading, confirmationOpen } = this.state;
    return (
      <Container>
        {loading ? <ReactLoading type="bubbles" color="#fc6963" /> : this.renderProperty()}
        {confirmationOpen && (
          <Confirmation
            message="Are you sure you want to delete?"
            confirmation={this.deleteProperty}
            cancel={() => this.setState({ confirmationOpen: false })}
          />
        )}
      </Container>
    );
  }
}
