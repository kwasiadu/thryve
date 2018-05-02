from rest_framework.serializers import ModelSerializer, RelatedField
from nutrition.models import Food, Nutrient


class NutrientSerializer(ModelSerializer):
    class Meta:
        model = Nutrient
        fields = (
            'id', 'nutrient_id', 'nutrient', 'unit', 'value', 'gm',
        )


class FoodSerializer(ModelSerializer):
    nutrients = NutrientSerializer(many=True)

    class Meta:
        model = Food
        fields = (
            'id', 'nbdno', 'name', 'weight', 'measure', 'img', 'nutrients'
        )



