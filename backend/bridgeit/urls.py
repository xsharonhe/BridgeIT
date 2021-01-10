from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/v1/api-auth', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('api/v1/', include('darkspots.urls')),
    path('api/v1/', include('geotabs.urls')),
    path('api/v1/', include('mobility.urls')),
    path('api/v1/accounts/', include('accounts.urls')),
    path('api/v1/profile/', include('user_profile.urls')),
    path('api/v1/items/', include('items.urls')),
]
