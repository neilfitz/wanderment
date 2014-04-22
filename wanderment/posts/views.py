from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader

from models import Post, City

def index(request):
  return HttpResponse("Hello, world. You're at the posts index.")

def detail(request, post_id):
  p = Post.objects.get(id=int(post_id))
  template = loader.get_template('posts/detail.html')
  context = RequestContext(request, {
    'p' : p,
    })
  return HttpResponse(template.render(context))