from django.urls import path
from .views import GetUserProfileView

urlpatterns = [
    path('user', GetUserProfileView.as_view())
]