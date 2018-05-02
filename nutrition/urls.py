from django.urls import path
from nutrition import views


urlpatterns = [
    path('', views.FoodList.as_view()),
    path('<int:id>', views.FoodDetail.as_view()),
]
