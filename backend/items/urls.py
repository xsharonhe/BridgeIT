from django.urls import path
from .views import ItemListView, ItemView, DonatedItemView, RequestedItemView

urlpatterns = [
    path('', ItemListView.as_view()),
    path('donations', DonatedItemView.as_view()),
    path('requests', RequestedItemView.as_view()),
    path('<pk>', ItemView.as_view()),
]