# posts/forms.py
from django import forms

from .models import Post

class PostForm(forms.ModelForm):

    class Meta:
        model = Post

class EditPostForm(forms.ModelForm):

    class Meta:
        model = Post
        fields = ('title', 'subTitle', 'text', 'imgURLs', 'soundURL')
        exclude = ('user', 'city')