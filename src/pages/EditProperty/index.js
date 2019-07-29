import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ReactLoading from 'react-loading';

import api from '../../services/api';

import { Container, DropzoneContainer, Image } from './styles';

class EditProperty extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        id: PropTypes.number,
      }),
    }).isRequired,
  };

  state = {
    property: {
      title: '',
      address: '',
      description: '',
      price: 0,
      images: [],
    },
    error: '',
    loading: false,
    files: [],
  };

  async componentDidMount() {
    const { location } = this.props;
    try {
      const { id } = location.state;
      this.setState({ loading: true });

      const { data } = await api.get(`/properties/${id}`);
      this.setState({
        property: { ...data, price: parseFloat(data.price) },
        error: '',
      });
    } catch (err) {
      console.log(err);
      this.setState({ property: null, error: 'Algo saiu errado...' });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleDrop = (files) => {
    files.map(file => (file.preview = URL.createObjectURL(file)));
    this.setState({ files: [...this.state.files, ...files] });
  };

  renderFiles = () => {
    const { files } = this.state;

    return (
      <DropzoneContainer>
        {!files.length ? (
          <p>Arraste aqui ou clique para selecionar imagens</p>
        ) : (
          files.map(file => <Image url={file.preview} key={file.path} />)
        )}
      </DropzoneContainer>
    );
  };

  handleNotification = (error, type = 'error') => this.setState({ error }, () => toast(this.state.error, {
    type,
    className: 'toast',
    autoClose: 2000,
    hideProgressBar: true,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
  }));

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      this.setState({ loading: true });
      const { files } = this.state;
      const {
        id, title, address, description, price,
      } = this.state.property;

      await api.put(`/properties/${id}`, {
        title,
        address,
        description,
        price,
      });

      if (!files.length) {
        this.handleNotification('Imóvel editado com sucesso!', 'success');
        this.props.history.push(`/app/property/${id}`);
      }

      const data = new FormData();
      files.map((file, index) => data.append(`image[${index}]`, file, file.name));

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      await api.post(`/properties/${id}/images`, data, config);

      this.handleNotification('Imóvel criado com sucesso!', 'success');
      this.props.history.push(`/app/property/${id}`);
    } catch (err) {
      this.handleNotification('Erro ao editar imóvel');
    } finally {
      this.setState({ loading: false });
    }
  };

  handleCancel = (e) => {
    e.preventDefault();

    this.props.history.goBack();
  };

  render() {
    const { loading } = this.state;
    const {
      title, price, description, address,
    } = this.state.property;

    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <h1>Editar imóvel</h1>
          <hr />
          <input
            placeholder="Título"
            name="title"
            value={title}
            onChange={e => this.setState({
              property: { ...this.state.property, title: e.target.value },
            })
            }
          />
          <input
            placeholder="Endereço"
            name="address"
            value={address}
            onChange={e => this.setState({
              property: { ...this.state.property, address: e.target.value },
            })
            }
          />
          <textarea
            rows="5"
            placeholder="Descrição"
            name="description"
            onChange={e => this.setState({
              property: {
                ...this.state.property,
                description: e.target.value,
              },
            })
            }
            value={description}
          />
          <CurrencyInput
            decimalSeparator=","
            thousandSeparator="."
            prefix="R$ "
            value={price}
            onChangeEvent={(event, maskedvalue, floatvalue) => this.setState({
              property: { ...this.state.property, price: floatvalue },
            })
            }
          />
          <Dropzone multiple onDrop={this.handleDrop} accept="image/*" className="dropzone">
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                {this.renderFiles()}
              </div>
            )}
          </Dropzone>
          <div className="actions">
            <button type="submit">
              {loading ? <ReactLoading type="bubbles" width={56} /> : 'Salvar'}
            </button>
            <button onClick={this.handleCancel} className="cancel">
              Cancelar
            </button>
          </div>
        </form>
        <i className="close fa fa-times" onClick={this.handleCancel} />
      </Container>
    );
  }
}

export default withRouter(EditProperty);
