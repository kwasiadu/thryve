from django_filters import rest_framework as filters
from nutrition.models import Food


class NutrientFilter(filters.FilterSet):

    class Meta:
        model = Food
        fields = ()

    @property
    def qs(self):
        parent = super(NutrientFilter, self).qs
        q_params = dict(getattr(self.request, 'query_params', None))

        if q_params:
            nutrients = q_params['nutrient']
            values = q_params['value']
            for idx, nut in enumerate(nutrients):
                print(nut, idx)
                parent = parent.filter(
                    nutrients__nutrient__icontains=nutrients[idx],
                    nutrients__value__gte=values[idx])
        return parent

