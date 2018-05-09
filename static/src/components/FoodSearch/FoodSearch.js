import React from 'react';
import Header from '../Header/Header'
import Main from '../Main/Main';
import SearchBar from '../SearchBar/SearchBar';


class FoodSearch extends React.Component {

    constructor(props) {
        super(props);
        this.default_min_value = 0;
        this.default_max_value = 1000;
        this.searchWithLoadedData = false;

        this.state = {
            searchText: '',
            loaded: false,
            foods: [],
            originalFoods: [],
            errorMessage: "",
            url: "/foods/",
            flag: "and",

            filters: [
                { name:"Energy", displayName:"Energy", "min_value": "", "max_value": "" },
                { name:"Protein", displayName:"Protein", "min_value": "", "max_value": "" },
                { name:"Total lipid (fat)", displayName:"Fat", "min_value": "", "max_value": "" },
                { name:"Carbohydrate, by difference", displayName:"Carbohydrate", "min_value": "", "max_value": "" },
                { name:"Sugars, total", displayName:"Sugars", "min_value": "", "max_value": "" },
                { name:"Fiber, total dietary", displayName:"Fiber", "min_value": "", "max_value": "" },
                { name:"Alcohol, ethyl", displayName:"Alcohol", "min_value": "", "max_value": "" },
                { name:"Ash", displayName:"Ash", "min_value": "", "max_value": "" }]
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.searchLoadedData = this.searchLoadedData.bind(this);
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
            let initUrl = `/foods/?searchText=${this.state.searchText}&`;
            const urlGenerator = (url, filter) => {
                if(filter.min_value && filter.max_value) {
                    url = url + `nutrient=${filter.displayName}` +
                        `&min_value=${filter.min_value}&max_value=${filter.max_value}&`;
                    this.searchWithLoadedData = false;
                } else if(filter.min_value) {
                    url = url + `nutrient=${filter.displayName}` +
                        `&min_value=${filter.min_value}&max_value=${this.default_max_value}&`;
                    this.searchWithLoadedData = false;
                } else if(filter.max_value) {
                    url = url + `nutrient=${filter.displayName}` +
                        `&min_value=${this.default_min_value}&max_value=${filter.max_value}&`;
                    this.searchWithLoadedData = false;
                }

                return url
            };

            let url = this.state.filters.reduce(urlGenerator, initUrl) +
                `flag=${this.state.flag}`;

            this.setState({
                url: url
            });
            this.updateUrlTimeout = null;
        };


        if(elm.name === 'searchText') {
            this.setState({
                searchText: elm.value
            });
            this.searchWithLoadedData = true;
        } else {
            const filters = this.state.filters;
            filters.map((filter) => {
                if(filter.displayName + '_min' === elm.name) {
                    filter.min_value = elm.value;
                } else if(filter.displayName + '_max' === elm.name) {
                    filter.max_value = elm.value;
                }
            });

            this.setState({
                filters: filters
            });
        }

        this.updateUrlTimeout = window.setTimeout(updateUrl, 0);
    }


    getFoods(url) {
        if(this.state.loaded && this.searchWithLoadedData) {
            this.searchLoadedData();
        } else {
            this.getFoodsFromAPI(url)
        }
    }
    /**
     * @desc Calls the API and updates state with returned data
     * @param url
     */
    getFoodsFromAPI(url) {
        fetch(url)
            .then(response => {
                if (response.status !== 200) {
                    return this.setState({
                        errorMessage: "Something went wrong",
                        foods: []
                    });
                }
                this.timeout = null;
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    this.setState({errorMessage: "No results found"})
                }
                this.setState({
                    foods: data,
                    originalFoods: data,
                    loaded: true,
                    errorMessage: ""
                });
            });
    }

    /**
     * Apply search parameters to loaded data and display results
     */
    searchLoadedData() {
        const searchResults = [];
        const searchText = this.state.searchText.toLowerCase();
        this.state.originalFoods.map(food => {
            if(food.name.toLowerCase().indexOf(searchText) > -1) {
                searchResults.push(food);
            }
        });
        if (searchResults.length === 0) {
            this.setState({errorMsg: "No results found"})
        }
        this.setState({
            foods: searchResults
        })
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