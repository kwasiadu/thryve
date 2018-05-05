import React from "react";
import ReactDOM from "react-dom";
import FoodDataProvider from "./FoodDataProvider";
import CardList from "./CardList";

const App = () => (
    <FoodDataProvider
        endpoint="foods/"
        render={data => <CardList data={data} />}
    />

);

ReactDOM.render(<App />, document.getElementById('app'));