import React from 'react';
import Header from '../Header/Header'
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
            url: "/foods/",
            filters: [
                { Energy: 0 },
                { Protein: 0 },
                { Fat: 0 },
                { Carbohydrate: 0 },
                { Sugars: 0 },
                { Fiber: 0 },
                { Alcohol: 0 },
                { Ash: 0 }
            ]
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
        this.getUrlandUpdateInput(elm);
        this.getFoodsTimeout = window.setTimeout(function () {
            this.getFoods(this.state.url)
        }.bind(this), 250)

    }

    getUrlandUpdateInput(elm) {
        const updateUrl = () => {
            let initUrl = `/foods/?searchText=${this.state.searchText}`;
            const urlGenerator = (url, nutrient) => {
                for(let name in nutrient) {
                    url = url + '&' + `nutrient=${name}` +
                    `&value=${nutrient[name]}`;
                }
                return url
            };

            let url = this.state.filters.reduce(urlGenerator, initUrl);
            this.setState({
                url: url
            });
            this.updateUrlTimeout = null;
        };

        if(elm.name === 'searchText') {
            this.setState({
                searchText: elm.value
            });
        } else {
            const state = Object.assign({}, this.state);
            state.filters[elm.name] = elm.value;
            this.setState(state);
        }


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
                this.setState({ foods: data, loaded: true, errorMessage: "" });

            });
    }


    render() {
        return (
            <div>
                <Header/>
                <SearchBar searchText={this.state.searchText}
                           filters={this.state.filters}
                           onSearchTextChange={this.handleSearchTextChange}/>
                <Main
                    foods={this.state.foods}
                    errorMessage={this.state.errorMessage}
                />
            </div>
        );
    }
}

export default FoodSearch