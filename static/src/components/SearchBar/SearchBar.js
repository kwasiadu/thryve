import React from "react";
import PropTypes from "prop-types";
import './SearchBar.css'

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.props.onSearchTextChange(e.target);
    }

    /**
     * @desc dynamically creates filter inputs and renders them
     * along with the search input
     * @returns {*}
     */
    render() {

        const searchFilters = [];
        this.props.filters.forEach((filter) => {

                let label;
                if(filter.displayName === 'Energy') {
                    label = <label>{filter.displayName + '(kcal)'}</label>;
                } else {
                    label = <label>{filter.displayName + '(g)'}</label>;
                }

                searchFilters.push(
                <div className="form-group" key={filter.displayName}>
                    {label}
                    <div className="input-group">
                    <input
                        type="number"
                        name={filter.displayName + '_min'}
                        value={filter.min_value}
                        placeholder="min"
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="number"
                        name={filter.displayName + '_max'}
                        value={filter.max_value}
                        placeholder="max"
                        onChange={this.handleInputChange}
                    />
                    </div>
                </div>
            )


        })

        return (
            <form className="SearchBar_form">
                <input
                    className="search-input"
                    type="text"
                    name="searchText"
                    placeholder="Search..."
                    value={this.props.searchText}
                    onChange={this.handleInputChange}
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