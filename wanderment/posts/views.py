from django.shortcuts import render, redirect 
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.utils import timezone
from django import forms

from models import Post, City
from forms import PostForm

# From http://stackoverflow.com/questions/11811256/how-to-set-content-type-of-javascript-files-in-django 
def java_script(request):
    filename = request.path.strip("/")
    data = open(filename, "rb").read()
    return HttpResponse(data, mimetype="application/x-javascript")

def index(request):
  return HttpResponse("Hello, world. You're at the posts index.")

def detail(request, post_id):
  p = Post.objects.get(id=int(post_id))
  template = loader.get_template('posts/detail.html')
  context = RequestContext(request, {
    'p' : p,
    })
  return HttpResponse(template.render(context))

def add_model(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():

            # commit=False means the form doesn't save at this time.
            # commit defaults to True which means it normally saves.
            model_instance = form.save(commit=False)
            model_instance.timestamp = timezone.now()
            model_instance.save()
            return redirect('victory')
    else:
        form = PostForm()

    return render(request, "create_post.html", {'form': form})