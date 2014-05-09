from django.shortcuts import render, redirect, render_to_response
from django.http import HttpResponse, HttpResponseRedirect
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

def create_post(request):
    # Get the context from the request.
    context = RequestContext(request)

    # A HTTP POST?
    if request.method == 'POST':
        form = PostForm(request.POST)

        # Have we been provided with a valid form?
        if form.is_valid():
            # Save the new category to the database.
            form.save(commit=True)

            # Now call the index() view.
            # The user will be shown the homepage.
            return HttpResponseRedirect('/posts/%i/' % my_file.pk)
        else:
            # The supplied form contained errors - just print them to the terminal.
            print form.errors
    else:
        # If the request was not a POST, display the form to enter details.
        form = PostForm()

    # Bad form (or form details), no form supplied...
    # Render the form with error messages (if any).
    return render_to_response('posts/create_post.html', {'form': form}, context)

def city_posts(request, city_id):
    c = City.objects.get(id=int(city_id))
    p = Post.objects.filter(city_id=city_id)
    template = loader.get_template('posts/city_posts.html')
    context = RequestContext(request, {
        'c' : c,
        'p' : p,
        })
    return HttpResponse(template.render(context))
