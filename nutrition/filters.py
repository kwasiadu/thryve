from django_filters import rest_framework as filters
from django.db.models import Q
from nutrition.models import Food


class NutrientFilter(filters.FilterSet):

    class Meta:
        model = Food
        fields = ()

    # overwriting FilterSet method in order to construct the right query
    @property
    def qs(self):

        parent = super(NutrientFilter, self).qs
        q_objects = Q()
        max_default = 1000
        min_default = 0

        # get the search/filter parameters from the request url query parameters
        q_params = dict(getattr(self.request, 'query_params', {}))
        names = q_params.get('searchText', [])
        name = names[0] if len(names) > 0 else ''
        results = parent.filter(name__icontains=name)
        nutrients = q_params.get('nutrient', [])
        values = q_params.get('value', [])
        min_values = q_params.get('min_value', [])
        max_values = q_params.get('max_value', [])
        flag = q_params.get('flag', [])
        #print(nutrients, max_values, min_values, flag, values)
        # check if min and max values are available and then run query
        if len(min_values) > 0 and len(max_values) > 0:
            for idx, nut in enumerate(nutrients):
                if nutrients[idx]:
                    if not min_values[idx]:
                        min_values[idx] = min_default
                    if not max_values[idx]:
                        max_values[idx] = max_default
                    #print('filter:', name, nutrients[idx], min_values[idx], max_values[idx])

                    # if OR results are needed, use Q objects
                    if len(flag) > 0 and flag[0] == 'or':
                        q_objects |= Q(
                            name__icontains=name,
                            nutrients__nutrient__icontains=nutrients[idx],
                            nutrients__value__gte=min_values[idx],
                            nutrients__value__lte=max_values[idx])

                    # otherwise use chain filters
                    else:
                        results = results.filter(
                            nutrients__nutrient__icontains=nutrients[idx],
                            nutrients__value__gte=min_values[idx],
                            nutrients__value__lte=max_values[idx])

        # remove duplicates in OR results,
        if len(flag) > 0 and flag[0] == 'or':
            results = parent.filter(q_objects).distinct()

        return results

