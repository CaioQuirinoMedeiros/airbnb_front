import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import querySearch from 'stringquery';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import CurrencyInput from 'react-currency-input';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ReactLoading from 'react-loading';

import api from '../../services/api';

import { Container, DropzoneContainer, Image } from './styles';

class AddProperty extends Component {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  state = {
    price: 0,
    files: [],
    latitude: null,
    longitude: null,
    loading: false,
  };

  componentDidMount() {
    const { location, history } = this.props;
    const params = querySearch(location.search);

    if (!params.latitude || !params.longitude) {
      history.push('/app');
    }

    this.setState({ ...params });
  }

  schema = () => Yup.object().shape({
    title: Yup.string().required(() => toast.error('Preencha o título')),
    address: Yup.string().required(() => toast.error('Preencha o endereço')),
    description: Yup.string().required(() => toast.error('Preencha a descrição')),
  });

  handleDrop = (dropedFiles) => {
    dropedFiles.map(file => ({ ...file, preview: URL.createObjectURL(file) }));
    this.setState(({ files }) => ({ files: [...files, ...dropedFiles] }));
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

  handleSubmit = async (formData) => {
    const { history } = this.props;

    try {
      this.setState({ loading: true });
      const {
        price, latitude, longitude, files,
      } = this.state;

      const {
        data: { id },
      } = await api.post('/properties', {
        ...formData,
        price,
        latitude,
        longitude,
      });

      if (!files.length) {
        toast.success('Móvel criado com sucesso!');
        history.push('/app');
      }

      const data = new FormData();
      files.map((file, index) => data.append(`image[${index}]`, file, file.name));

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      await api.post(`/properties/${id}/images`, data, config);

      toast.success('Imóvel criado com sucesso!');
      history.push('/app');
    } catch (err) {
      toast.error('Erro ao criar imóvel');
    } finally {
      this.setState({ loading: false });
    }
  };

  handleCancel = (e) => {
    const { history } = this.props;
    e.preventDefault();

    history.push('/app');
  };

  handlePriceChange = (event, maskedvalue, floatvalue) => {
    this.setState({ price: floatvalue });
  };

  render() {
    const { loading, price } = this.state;
    return (
      <Container>
        <Form schema={this.schema()} onSubmit={this.handleSubmit}>
          <h1>Adicionar imóvel</h1>
          <hr />
          <Input placeholder="Título" name="title" />
          <Input placeholder="Endereço" name="address" />
          <Input multiline rows="5" placeholder="Descrição" name="description" />
          <CurrencyInput
            decimalSeparator=","
            thousandSeparator="."
            prefix="R$ "
            value={price}
            onChangeEvent={this.handlePriceChange}
          />
          <Dropzone
            multiple
            onDrop={files => this.handleDrop(files)}
            accept="image/*"
            className="dropzone"
          >
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                {this.renderFiles()}
              </div>
            )}
          </Dropzone>
          <div className="actions">
            <button type="submit">
              {loading ? <ReactLoading type="bubbles" width={56} /> : 'Adicionar'}
            </button>
            <button type="button" onClick={this.handleCancel} className="cancel">
              Cancelar
            </button>
          </div>
        </Form>
      </Container>
    );
  }
}

export default withRouter(AddProperty);
