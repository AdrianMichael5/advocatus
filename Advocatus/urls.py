from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("processes/", include('processes.urls')),
    path('', include('users.urls')),
    path('clients/', include('clients.urls'))
]
