from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView

from nutrition.models import Food
from nutrition.serializers import FoodSerializer


# Create your views here.
class FoodList(ListAPIView):
    serializer_class = FoodSerializer
    queryset = Food.objects.all().order_by('id')


class FoodDetail(RetrieveAPIView):
    serializer_class = FoodSerializer
    queryset = Food.objects.all().order_by('id')
