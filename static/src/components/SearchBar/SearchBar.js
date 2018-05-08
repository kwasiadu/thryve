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
                <div className="nutrient-filter">
                    <div className="form-group">
                        <label>Energy</label>
                        <input
                            type="number"
                            name="energy"
                            placeholder="0"
                            value={this.props.energy}
                            onChange={this.handleSearchTextChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Protein</label>
                        <input

                            type="number"
                            name="protein"
                            placeholder="0"
                            value={this.props.protein}
                            onChange={this.handleSearchTextChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Ash</label><input
                        type="number"
                        name="ash"
                        placeholder="0"
                        value={this.props.ash}
                        onChange={this.handleSearchTextChange}
                    />
                    </div>
                </div>
            </form>
        );
    }
}

SearchBar.propTypes = {
    searchText: PropTypes.string,
    energy: PropTypes.number,
    protein: PropTypes.number,
    ash: PropTypes.number,
    onSearchTextChange: PropTypes.func.isRequired
};

export default SearchBar;