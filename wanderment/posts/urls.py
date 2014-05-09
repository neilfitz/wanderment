from django.conf.urls import patterns, url

import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'), 
    url(r'^(?P<post_id>\d+)/$', views.detail, name='detail'),
    url(r'.*\.js$', views.java_script),
    url(r'^create_post/$', views.create_post, name='create_post'), 
    url(r'^cities/(?P<city_id>\d+)/$', views.city_posts, name='city_posts'),  
    # url(r'^edit_post/(?P<post_id>\d+)/$', views.edit_post, name='edit_post'),
    url(r'^edit_post/$', views.edit_post, name='edit_post'),
    url(r'^delete_post/$', views.delete_post, name='delete_post')
    
)
