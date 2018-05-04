import React, { Component } from "react";
import PropTypes from "prop-types";
class FoodDataProvider extends Component {

  state = {
      data: [],
      loaded: false,
      defaultMessage: "Loading..."
    };

  componentDidMount() {
    fetch(this.props.endpoint)
      .then(response => {
        if (response.status !== 200) {
          return this.setState({ defaultMessage: "Something went wrong" });
        }
        return response.json();
      })
      .then(data => this.setState({ data: data, loaded: true }));
  }

  render() {
    const { data, loaded, defaultMessage } = this.state;
    return loaded ? this.props.render(data) : <p>{ defaultMessage }</p>;
  }

}
export default FoodDataProvider;

FoodDataProvider.propTypes = {
    endpoint: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
}