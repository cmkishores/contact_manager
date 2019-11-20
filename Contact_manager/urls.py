
from django.contrib import admin
from django.urls import path
from contacts import views
from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/contacts/$', views.contact_list), #URL for contact listing and creation
    url(r'^api/contacts/(?P<pk>[0-9]+)$', views.contact_detail), #URL for contact update delete or details. 
]
