"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from app.views import *
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("spec/", SpectacularAPIView.as_view(), name="spec.api"),
    path(
        "swagg/",
        SpectacularSwaggerView.as_view(url_name="spec.api"),
        name="spec.swagg",
    ),
    path("api/register/", RegisterView.as_view(), name="register"),
    path("api/login/", LoginView.as_view(), name="login"),
    path("api/logout/", LogoutView.as_view(), name="logout"),
    path("api/update/", UpdateInfoView.as_view(), name="info"),
    path("api/event/", EventView.as_view(), name="event"),
    path("api/event/<int:id>/", EventUpdateView.as_view(), name="event_change"),
    path("api/event/<int:id>/roster/", RosterUpdateView.as_view(), name="roster"),
]
