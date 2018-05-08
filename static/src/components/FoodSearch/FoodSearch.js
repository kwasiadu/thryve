import React from 'react';

import Main from '../Main/Main';
import SearchBar from '../SearchBar/SearchBar';


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
        this.getFoods(this.state.url);
    }

    componentWillUnmount () {
        if(this.getFoodsTimeout) {
            clearTimeout(this.getFoodsTimeout)
        }

        if(this.updateUrlTimeout) {
            clearTimeout(this.updateUrlTimeout);
        }

    }

    handleSearchTextChange(elm) {
        console.log('handle change')
        this.getUrlandUpdateInput(elm);
        this.getFoodsTimeout = window.setTimeout(function () {
            this.getFoods(this.state.url)
        }.bind(this), 250)

    }

    getUrlandUpdateInput(elm) {

        const updateUrl = () => {
            let initUrl = `/foods/?searchText=${this.state.searchText}`;
            const urlGenerator = (url, term) => url + '&' + `nutrient=${term}` + `&value=${this.state[term]}`;

            let url = terms.reduce(urlGenerator, initUrl);
            this.setState({
                url: url
            });
            this.updateUrlTimeout = null;
        }

        const terms = ['energy', 'protein', 'ash'];
        this.setState({
            [elm.name]: elm.value,
        });
        this.updateUrlTimeout = window.setTimeout(updateUrl, 0);
    }


    getFoods(url) {
        fetch(url)
            .then(response => {
                if (response.status !== 200) {
                    return this.setState({ errorMessage: "Something went wrong", foods: [] });
                }
                this.timeout = null;
                return response.json();
            })
            .then(data => {
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