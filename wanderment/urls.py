from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'wanderment.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^sample_post/', TemplateView.as_view(template_name="sample_post.html")),
    url(r'^posts/', include('wanderment.posts.urls')),
    url(r'^editor/', TemplateView.as_view(template_name="editor.html")),
    url(r'^$', TemplateView.as_view(template_name="index.html")),
    url(r'^autocomplete_city/$', 'wanderment.views.autocomplete_city', name='autocomplete_city'),
    url(r'^get_city_info/$', 'wanderment.views.get_city_info', name='get_city_info'),
    url(r'^get_marker_info/$', 'wanderment.views.get_marker_info', name='get_marker_info')
)
