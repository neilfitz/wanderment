from django.conf.urls import patterns, url

import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'), 
    url(r'^(?P<post_id>\d+)/$', views.detail, name='detail'),
    url(r'.*\.js$', views.java_script),
    url(r'^create_post/$', views.create_post, name='create_post'), 
)