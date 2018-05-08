import React from "react";
import PropTypes from "prop-types";
import './SearchBar.css'

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    }

    handleSearchTextChange(e) {
        this.props.onSearchTextChange(e.target);
    }


    render() {

        const searchFilters = [];
        this.props.filters.forEach((filterObj) => {
            for(let name in filterObj) {
                let label;
                if(name === 'energy') {
                    label = <label>{name + '(kcal)'}</label>;
                } else {
                    label = <label>{name + '(g)'}</label>;
                }

                searchFilters.push(
                <div className="form-group" key={name}>
                    {label}
                    <input
                        type="number"
                        name={name}
                        value={this.props.filters[name]}
                        placeholder="0"
                        onChange={this.handleSearchTextChange}
                    />
                </div>
            )
            }

        })

        return (
            <form className="SearchBar_form">
                <input
                    className="search-input"
                    type="text"
                    name="searchText"
                    placeholder="Search..."
                    value={this.props.searchText}
                    onChange={this.handleSearchTextChange}
                />
                <div className="nutrient-filter">{searchFilters}</div>
            </form>
        );
    }
}

SearchBar.propTypes = {
    searchText: PropTypes.string,
    filters: PropTypes.array.isRequired,
    onSearchTextChange: PropTypes.func.isRequired
};

export default SearchBar;