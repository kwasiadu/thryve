from rest_framework.generics import ListAPIView, RetrieveAPIView
from nutrition.models import Food
from nutrition.serializers import FoodSerializer
from nutrition.filters import NutrientFilter


# Create your views here.
class FoodList(ListAPIView):
    serializer_class = FoodSerializer

    queryset = Food.objects.all().order_by('id')

    filter_class = NutrientFilter


class FoodDetail(RetrieveAPIView):
    serializer_class = FoodSerializer
    queryset = Food.objects.all().order_by('id')

