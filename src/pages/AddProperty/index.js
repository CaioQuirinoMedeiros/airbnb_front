import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import querySearch from 'stringquery';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '../../services/api';

import {
  Form,
  Title,
  DropzoneContainer,
  Image,
  Line,
  Input,
  PriceInput,
  ButtonsWrapper,
  Button,
} from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('A title is required'),
  address: Yup.string().required('An address is required'),
  description: Yup.string().required('A decription is required'),
});

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

  handleDrop = (dropedFiles) => {
    dropedFiles.forEach((dropedFile) => {
      dropedFile.url = URL.createObjectURL(dropedFile);
    });
    this.setState({ files: dropedFiles });
  };

  renderFiles = () => {
    const { files } = this.state;

    return (
      <>
        {!files.length ? (
          <p>Drop your images here or click to select manually</p>
        ) : (
          files.map(file => <Image url={file.url} key={file.path} />)
        )}
      </>
    );
  };

  handleSubmit = async (formData) => {
    const { history } = this.props;

    try {
      this.setState({ loading: true });

      const {
        price, latitude, longitude, files,
      } = this.state;

      const { data } = await api.post('/properties', {
        ...formData,
        price,
        latitude,
        longitude,
      });

      if (!files.length) {
        toast.success('Property added successfully!');

        history.push('/app');
      } else {
        const filesFormData = new FormData();

        files.map((file, index) => filesFormData.append(`image[${index}]`, file, file.name));

        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };

        await api.post(`/properties/${data.id}/images`, filesFormData, config);

        toast.success('Property added successfully!');

        history.push('/app');
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    } finally {
      this.setState({ loading: false });
    }
  };

  handleCancel = () => {
    const { history } = this.props;
    history.push('/app');
  };

  handlePriceChange = (event, maskedvalue, floatvalue) => {
    this.setState({ price: floatvalue });
  };

  render() {
    const { loading, price } = this.state;
    return (
      <Form schema={schema} onSubmit={this.handleSubmit}>
        <Title>Add property</Title>
        <Line />

        <Input name="title" placeholder="Title" />

        <Input name="address" placeholder="Address" />

        <Input multiline rows="3" name="description" placeholder="Description" />

        <PriceInput
          decimalSeparator=","
          thousandSeparator="."
          prefix="R$ "
          value={price}
          onChangeEvent={this.handlePriceChange}
        />

        <Dropzone multiple onDrop={files => this.handleDrop(files)} accept="image/*">
          {({ getRootProps, getInputProps }) => (
            <DropzoneContainer {...getRootProps()}>
              <input {...getInputProps()} />
              {this.renderFiles()}
            </DropzoneContainer>
          )}
        </Dropzone>

        <ButtonsWrapper>
          <Button color="red" loading={loading} type="submit">
            Confirm
          </Button>
          <Button onClick={this.handleCancel}>Cancel</Button>
        </ButtonsWrapper>
      </Form>
    );
  }
}

export default withRouter(AddProperty);
