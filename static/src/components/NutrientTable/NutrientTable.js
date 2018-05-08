import React from "react";
import NutrientRow from "../NutrientRow/NutrientRow";
import PropTypes from "prop-types";
import FoodList from "../FoodList/FoodList";

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
NutrientTable.propTypes = {
    nutrients: PropTypes.array.isRequired
};

export default NutrientTable;