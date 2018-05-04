import React from "react";
import ReactDOM from "react-dom";
import FoodDataProvider from "./FoodDataProvider";
import CardList from "./CardList";

const App = () => (
    <FoodDataProvider
        endpoint="food/"
        render={data => <CardList data={data} />}
    />

);

ReactDOM.render(<App />, document.getElementById('app'));