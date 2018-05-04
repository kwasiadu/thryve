import simplejson as json
from decimal import Decimal

data_fname = 'data/food_data.json'
food_fname = 'nutrition/fixtures/food.json'
nutrient_fname = 'nutrition/fixtures/nutrient_test.json'


def convert_dict_fields(my_dict, field='value', conversion_method=None):
    if my_dict[field] == '--':
        my_dict[field] = None
    elif conversion_method:
        my_dict[field] = conversion_method(my_dict[field])


def process_data(data):
    foods = []
    nutrients = []
    nut_idx = 1

    for food_idx, food in enumerate(data):
        food_dict = {"model": "nutrition.food", "pk": food_idx + 1}
        nuts_list = food.pop('nutrients')
        food_dict['fields'] = food
        foods.append(food_dict)

        for nutrient in nuts_list:
            nut_dict = {"model": "nutrition.nutrient", "pk": nut_idx}
            convert_dict_fields(
                nutrient, field='value', conversion_method=Decimal)
            convert_dict_fields(nutrient, field='gm', conversion_method=Decimal)
            nutrient['food_id'] = food_idx + 1
            nut_dict['fields'] = nutrient
            nutrients.append(nut_dict)
            nut_idx += 1

    return foods, nutrients


with open(data_fname, 'r') as f:
    content = f.read()
    data_dict = json.loads(content)['report']['foods']
    foods_dict, nutrients_dict = process_data(data_dict)


with open(food_fname, 'w+') as f:
    json.dump(foods_dict, f, indent=4)


with open(nutrient_fname, 'w+') as f:
    json.dump(nutrients_dict, f, indent=4)

