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
            # TODO: find out why there are trailing spaces
            name_list = q_params['searchText']
            if len(name_list) > 0:
                name = name_list[0]
                results = parent.filter(name__icontains=name)
            else:
                results = parent.all()
            nutrients = q_params.get('nutrient', [])
            values = q_params.get('value', [])

            for idx, nut in enumerate(nutrients):
                if len(values) > 0 and values[idx] == '':
                    values[idx] = 0
                results = results.filter(
                    nutrients__nutrient__icontains=nutrients[idx],
                    nutrients__value__gte=values[idx])
        else:
            results = parent.all()
        return results

