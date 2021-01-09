from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('darkspots.urls')),
    path('api/v1/', include('geotabs.urls')),
    path('api/v1/', include('mobility.urls')),
    path('api/v1/items/', include('items.urls'))
]
