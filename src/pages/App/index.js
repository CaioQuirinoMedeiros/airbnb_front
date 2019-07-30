import React, { Component } from 'react';
import Dimensions from 'react-dimensions';
import MapGl from 'react-map-gl';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { withRouter } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { logout } from '../../services/auth';

import Properties from '../../components/Properties';
import BigButton from '../../components/BigButton';

import AddProperty from '../AddProperty';
import Property from '../Property';
import EditProperty from '../EditProperty';

import {
  Container,
  ButtonContainer,
  PointReference,
  ButtonsWrapper,
  Button,
  Filter,
  Range,
} from './styles';

const intlMonetary = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionalDigits: 2,
});

class Map extends Component {
  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    match: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,
  };

  state = {
    viewport: {
      latitude: -15.8808001,
      longitude: -47.8116024,
      zoom: 12.8,
      bearing: 0,
      pitch: 0,
    },
    filter: {
      min_price: null,
      max_price: null,
    },
    properties: [],
    addPropertyOpen: false,
  };

  updatePropertiesLocalization = debounce(() => this.loadProperties(), 500);

  async componentDidMount() {
    await this.loadProperties();
  }

  loadProperties = async () => {
    const { viewport, filter } = this.state;
    const { latitude, longitude } = viewport;
    const { min_price, max_price } = filter;

    try {
      const { data } = await api.get('properties', {
        params: {
          latitude,
          longitude,
          min_price,
          max_price,
        },
      });

      const formatedData = data.map(property => ({
        ...property,
        latitude: parseFloat(property.latitude),
        longitude: parseFloat(property.longitude),
        price: parseFloat(property.price),
      }));

      this.setState({ properties: formatedData });
    } catch (err) {
      console.log(err);
      toast.error('Error trying to load properties');
    }
  };

  handleLogout = () => {
    const { history } = this.props;

    logout();
    history.push('/');
  };

  renderActions = () => {
    const { filter } = this.state;
    return (
      <ButtonContainer>
        <BigButton color="#fc6963" onClick={() => this.setState({ addPropertyOpen: true })}>
          <i className="fa fa-plus" />
        </BigButton>

        <Filter>
          <span>{filter.max_price && intlMonetary.format(filter.max_price)}</span>
          <Range
            max={10000}
            step={100}
            value={[filter.min_price, filter.max_price]}
            onChange={([min_price, max_price]) => {
              max_price = max_price === 0 ? null : max_price;
              this.setState({ filter: { min_price, max_price } });
            }}
            onAfterChange={this.updatePropertiesLocalization}
          />
          <span>{intlMonetary.format(filter.min_price)}</span>
        </Filter>
        <BigButton color="#222" onClick={this.handleLogout}>
          <i className="fa fa-times" />
        </BigButton>
      </ButtonContainer>
    );
  };

  handleAddProperty = () => {
    const { match, history } = this.props;
    const { viewport } = this.state;
    const { latitude, longitude } = viewport;

    this.setState({ addPropertyOpen: false });

    history.push(`${match.url}/properties/add?latitude=${latitude}&longitude=${longitude}`);
  };

  renderPointReference = () => (
    <PointReference>
      <p>Drag to choose the location</p>
      <i className="fa fa-map-marker" />
      <ButtonsWrapper>
        <Button color="red" onClick={this.handleAddProperty}>
          Right here
        </Button>
        <Button onClick={() => this.setState({ addPropertyOpen: false })}>Cancel</Button>
      </ButtonsWrapper>
    </PointReference>
  );

  render() {
    const { containerWidth: width, containerHeight: height, match } = this.props;
    const { properties, addPropertyOpen, viewport } = this.state;
    return (
      <Container>
        <MapGl
          width={width}
          height={height}
          {...viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={(newViewport) => {
            this.setState({ viewport: newViewport });
          }}
          onViewStateChange={this.updatePropertiesLocalization}
        >
          {!addPropertyOpen && <Properties properties={properties} match={match} />}
        </MapGl>

        {this.renderActions()}
        {addPropertyOpen && this.renderPointReference()}

        <ModalRoute
          path={`${match.url}/properties/add`}
          parentPath={match.url}
          component={AddProperty}
        />
        <ModalRoute
          exact
          path={`${match.url}/property/:id`}
          parentPath={match.url}
          component={Property}
        />
        <ModalRoute
          exact
          path={`${match.url}/property/:id/edit`}
          parentPath={match.url}
          component={EditProperty}
        />
      </Container>
    );
  }
}

const DimensionedMap = withRouter(Dimensions()(Map));

const App = () => (
  <Container>
    <DimensionedMap />
  </Container>
);

export default App;
