from django.urls import path, include, re_path

from . import views

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    re_path('signup', views.signup),
    re_path('login', views.login),
    re_path('test_token', views.test_token),
	re_path('create_event', views.create_event),
	re_path('get_event/(?P<event_id>[^/]+)', views.get_event),
	re_path('get_user_events', views.get_user_events),
	re_path('add_items_to_event', views.add_items_to_event),
	re_path('add_collaborator_to_event', views.add_collaborator_to_event),
	re_path('get_event_uuids', views.get_event_uuids),
]