import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
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
} from '../AddProperty/styles';

class EditProperty extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        id: PropTypes.number,
      }),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
      goBack: PropTypes.func,
    }).isRequired,
  };

  state = {
    property: {
      id: null,
      title: '',
      address: '',
      description: '',
      price: null,
      images: [],
    },
    loading: false,
    files: [],
  };

  async componentDidMount() {
    const { location } = this.props;

    try {
      this.setState({ loading: true });

      const { id } = location.state;

      const { data } = await api.get(`/properties/${id}`);

      this.setState({
        property: { id, ...data, price: parseFloat(data.price) },
      });
    } catch (err) {
      console.log(err);
      toast.error('Error trying to get the property');
      this.setState({ property: null });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleDrop = (dropedFiles) => {
    dropedFiles.forEach((dropedFile) => {
      dropedFile.url = URL.createObjectURL(dropedFile);
    });
    this.setState({ files: dropedFiles });
  };

  renderFiles = () => {
    const { files, property } = this.state;
    const { images } = property;

    return (
      <>
        {!files.length && !images.length ? (
          <p>Drop your images here or click to select manually</p>
        ) : (
          [
            ...files.map(file => <Image url={file.url} key={file.path} />),
            ...images.map(image => <Image url={image.url} key={image.path} />),
          ]
        )}
      </>
    );
  };

  handleSubmit = async (formData) => {
    const { history } = this.props;

    try {
      this.setState({ loading: true });

      const { title, address, description } = formData;
      const { files, property } = this.state;
      const { id, price } = property;

      await api.put(`/properties/${id}`, {
        title,
        address,
        description,
        price,
      });

      if (!files.length) {
        toast.success('Property edited successfully!');

        history.push(`/app/property/${id}`);
      } else {
        const filesFormData = new FormData();

        files.map((file, index) => filesFormData.append(`image[${index}]`, file, file.name));

        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };

        await api.post(`/properties/${id}/images`, filesFormData, config);

        toast.success('Property edited successfully!');

        history.push(`/app/property/${id}`);
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
    history.goBack();
  };

  handlePriceChange = (e, maskedvalue, floatvalue) => {
    this.setState(({ property }) => ({ property: { ...property, price: floatvalue } }));
  };

  handleDescriptionChange = (e) => {
    e.persist();
    this.setState(({ property }) => ({ property: { ...property, description: e.target.value } }));
  };

  render() {
    const { loading, property } = this.state;
    const {
      title, price, description, address,
    } = property;

    return (
      <Form onSubmit={this.handleSubmit} initialData={{ title, address, description }}>
        <Title>Edit Property</Title>

        <Line />

        <Input name="title" placeholder="Title" />

        <Input name="address" placeholder="Address" />

        <Input
          multiline
          rows="3"
          name="description"
          value={description}
          placeholder="Description"
          onChange={this.handleDescriptionChange}
        />

        <PriceInput
          decimalSeparator=","
          thousandSeparator="."
          prefix="R$ "
          value={price}
          onChangeEvent={this.handlePriceChange}
        />

        <Dropzone multiple onDrop={this.handleDrop} accept="image/*" className="dropzone">
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

export default withRouter(EditProperty);
