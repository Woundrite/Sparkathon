from django.urls import path, include, re_path

from . import views

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    re_path('signup', views.signup),
    re_path('login', views.login),
    re_path('test_token', views.test_token),
]