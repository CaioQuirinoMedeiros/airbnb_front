import React, { Component } from "react";
import Dimensions from "react-dimensions";
import MapGl from "react-map-gl";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import { withRouter } from "react-router-dom";
import { ModalRoute } from "react-router-modal";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

import api from "../../services/api";
import { logout } from "../../services/auth";
import Properties from "../../components/Properties";
import Button from "../../components/Button";
import AddProperty from "../AddProperty";
import Property from "../Property";
import EditProperty from "../EditProperty";

import { Container, ButtonContainer, PointReference, Filter } from "./styles";

const TOKEN =
  "pk.eyJ1IjoiY2Fpb3F1aXJpbm8iLCJhIjoiY2p3MGk0MW1wMGJlMTQ0cndpZ2lpdTA2byJ9.vUbijPxSSgpH2WeBZFG7Hg";

const intlMonetary = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionalDigits: 2
});

class Map extends Component {
  constructor() {
    super();
    this.updatePropertiesLocalization = debounce(
      this.updatePropertiesLocalization,
      500
    );
  }

  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired
  };

  state = {
    viewport: {
      latitude: -15.8808001,
      longitude: -47.8116024,
      zoom: 12.8,
      bearing: 0,
      pitch: 0
    },
    filter: {
      min_price: null,
      max_price: null
    },
    properties: [],
    addActivate: false
  };

  async componentDidMount() {
    await this.loadProperties();
  }

  updatePropertiesLocalization() {
    this.loadProperties();
  }

  loadProperties = async () => {
    const { latitude, longitude } = this.state.viewport;
    const { min_price, max_price } = this.state.filter;

    try {
      const { data } = await api.get("/properties", {
        params: { latitude, longitude, min_price, max_price }
      });

      data.map(property => {
        property.latitude = parseFloat(property.latitude);
        property.longitude = parseFloat(property.longitude);
        property.price = parseFloat(property.price);
        return property;
      });

      this.setState({ properties: data });
    } catch (err) {
      console.log(err);
    }
  };

  handlerLogout = e => {
    logout();
    this.props.history.push("/");
  };

  renderActions = () => {
    return (
      <ButtonContainer>
        <Button
          color="#fc6963"
          onClick={() => this.setState({ addActivate: true })}
        >
          <i className="fa fa-plus" />
        </Button>
        <Filter>
          <span>{intlMonetary.format(this.state.filter.max_price)}</span>
          <Range
            max={1000}
            vertical={true}
            defaultValue={[0, 1000]}
            railStyle={{
              backgroundColor: "#222",
              borderRadius: 10
            }}
            trackStyle={[{ background: "#fc6963" }]}
            handleStyle={[
              { border: "none", background: "#fc6963" },
              { border: "none", background: "#fc6963" }
            ]}
            onChange={([min_price, max_price]) => {
              this.setState({ filter: { min_price, max_price } });
            }}
            onAfterChange={() => this.updatePropertiesLocalization()}
          />
          <span>{intlMonetary.format(this.state.filter.min_price)}</span>
        </Filter>
        <Button color="#222" onClick={this.handlerLogout}>
          <i className="fa fa-times" />
        </Button>
      </ButtonContainer>
    );
  };

  renderPointReference() {
    return (
      this.state.addActivate && (
        <PointReference>
          <p>Arraste o mapa para escolher a localização</p>
          <i className="fa fa-map-marker" />
          <div>
            <button onClick={this.handleAddProperty} type="button">
              Adicionar
            </button>
            <button
              onClick={() => this.setState({ addActivate: false })}
              className="cancel"
            >
              Cancelar
            </button>
          </div>
        </PointReference>
      )
    );
  }

  handleAddProperty = () => {
    const { match, history } = this.props;
    const { latitude, longitude } = this.state.viewport;
    history.push(
      `${match.url}/properties/add?latitude=${latitude}&longitude=${longitude}`
    );

    this.setState({ addActivate: false });
  };

  render() {
    const {
      containerWidth: width,
      containerHeight: height,
      match
    } = this.props;
    const { properties, addActivate } = this.state;
    return (
      <Container>
        <MapGl
          width={width}
          height={height}
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={TOKEN}
          onViewportChange={viewport => {
            this.setState({ viewport });
          }}
          onViewStateChange={this.updatePropertiesLocalization.bind(this)}
        >
          {!addActivate && <Properties properties={properties} match={match} />}
        </MapGl>

        {this.renderActions()}
        {this.renderPointReference()}
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
