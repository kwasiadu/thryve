import React from "react";
import PropTypes from "prop-types";


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

NutrientRow.propTypes = {
    nutrient: PropTypes.object.isRequired
};

export default NutrientRow;
