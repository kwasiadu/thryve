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
        this.handleInputChange = this.handleInputChange.bind(this);
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

    /**
     * @desc handle changes made to search or filter inputs
     * @param elm {Object}: Html input element
     */
    handleInputChange(elm) {
        this.getUrlandUpdateInput(elm);
        this.getFoodsTimeout = window.setTimeout(function () {
            this.getFoods(this.state.url)
        }.bind(this), 250)

    }

    /**
     * @desc constructs the url based on the search and filter inputs
     * @param elm
     */
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
            let filters = this.state.filters;
            filters.map((filter) => {
                for(let name in filter) {
                    if(name === elm.name) {
                        filter[name] = elm.value;
                    }
                }
            });

            this.setState({
                filters: filters
            });
        }

        this.updateUrlTimeout = window.setTimeout(updateUrl, 0);
    }

    /**
     * @desc Calls the API and updates state with returned data
     * @param url
     */
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
                           onSearchTextChange={this.handleInputChange}/>
                <Main
                    foods={this.state.foods}
                    errorMessage={this.state.errorMessage}
                />
            </div>
        );
    }
}

export default FoodSearch