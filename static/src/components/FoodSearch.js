import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import './Food.css'



class FoodItem extends React.Component {

    truncate (string, limit=20) {
        if(string.length > limit) {
            return string.slice(0, limit) + " ..."
        } else {
            return string
        }
    }

    render() {
        const food = this.props.food;
        return (
            <Link to={`/${food.id}`}>
                <div key={food.id} className='FoodDetail'>
                    <img className='FoodDetail_img' src={food.image_url}/>
                    <h4 className='FoodDetail_title FoodDetail_tooltip'>{ this.truncate(food.name) }
                        <span className="FoodDetail_tooltiptext">{ food.name }</span>
                    </h4>
                    <div className='FoodDetail_info'>
                        <span>wt: { food.weight }</span>
                        <span>measure: { food.measure }</span>
                    </div>
                    <NutrientTable nutrients={ food.nutrients } />
                </div>
            </Link>
        );
    }
}

class NutrientRow extends React.Component {
    render() {
        const nutrient = this.props.nutrient;

        return (
            <tr>
                <td>{nutrient.nutrient}</td>
                <td>{nutrient.value}{nutrient.unit}</td>
            </tr>
        );
    }
}

class NutrientTable extends React.Component {
    render() {
        const rows = [];

        this.props.nutrients.forEach((nutrient) => {
            if(nutrient.value !== null && nutrient.value != 0) {
                rows.push(
                    <NutrientRow
                        nutrient={nutrient}
                        key={nutrient.id}/>
                );
            }
        });

        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class FoodList extends React.Component {

    render() {
        const rows = [];
        const foods = this.props.foods || [];
        console.log('foods', foods)


        foods.forEach((food) => {

            rows.push(
                <FoodItem food={food} key={food.id}/>
            );
        });

        return (
            <div>
                <div className="FoodList">{rows}</div>
                <div>{this.props.errorMessage}</div>
            </div>
        );
    }
}

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    }

    handleSearchTextChange(e) {
        this.props.onSearchTextChange(e.target);
    }



    render() {
        return (
            <form>
                <input
                    type="text"
                    name="searchText"
                    placeholder="Search..."
                    value={this.props.searchText}
                    onChange={this.handleSearchTextChange}
                />
                <input
                    type="text"
                    name="energy"
                    placeholder="Energy"
                    value={this.props.energy}
                    onChange={this.handleSearchTextChange}
                />
                <input
                    type="text"
                    name="protein"
                    placeholder="Protein"
                    value={this.props.protein}
                    onChange={this.handleSearchTextChange}
                /><input
                type="text"
                name="ash"
                placeholder="Ash"
                value={this.props.ash}
                onChange={this.handleSearchTextChange}
            />
            </form>
        );
    }
}

class Main extends React.Component {

    render() {

        return (
            <main>
                <Switch>
                    <Route exact path='/'
                           render={() => <FoodList foods={this.props.foods}/>}/>
                    <Route path='/:id'
                           render={({match}) => <FoodItem food={this.props.foods[match.params.id - 1]}/>}/>
                </Switch>
            </main>
        );
    }
}

class FoodSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            loaded: false,
            foods: [],
            errorMessage: "",
            energy: "",
            ash: "",
            protein: "",
            url: "/foods/"
        };

        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    }

    componentDidMount() {
        console.log('component mounted', this.state.url)
        this.getFoods(this.state.url);
    }

    handleSearchTextChange(elm) {
        this.getUrlandUpdateInput(elm);
        this.getFoods(this.state.url);
    }

    getUrlandUpdateInput(elm) {

        const updateUrl = () => {
            console.log('state', this.state)
            let initUrl = `/foods/?searchText=${this.state.searchText}`;
            const urlGenerator = (url, term) => url + '&' + `nutrient=${term}` + `&value=${this.state[term]}`;

            let url = terms.reduce(urlGenerator, initUrl);
            this.setState({
                url: url
            })
        }

        const terms = ['energy', 'protein', 'ash'];
        this.setState({
            [elm.name]: elm.value,
        });
        window.setTimeout(updateUrl, 0)
    }


    getFoods(url) {
        console.log('url', url);
        fetch(url)
            .then(response => {
                console.log('res', response)
                if (response.status !== 200) {
                    return this.setState({ errorMessage: "Something went wrong", foods: [] });
                }
                return response.json();
            })
            .then(data => {
                console.log('foodstate', data)
                if(data.length > 0) {
                    this.setState({ errorMessage: "No results found"})
                }
                this.setState({ foods: data, loaded: true })

            });
    }




    render() {
        return (
            <div>
                <SearchBar searchText={this.state.searchText}
                           energy={this.state.energy}
                           protein={this.state.protein}
                           ash={this.state.ash}
                           onSearchTextChange={this.handleSearchTextChange}/>
                <Main
                    foods={this.state.foods}
                    searchText={this.state.searchText}
                    errorMessage={this.state.errorMessage}
                />
            </div>
        );
    }
}

export default FoodSearch