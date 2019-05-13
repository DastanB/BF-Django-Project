from django.shortcuts import render, redirect
from . import forms
from .models import Post, Comment, Favorite

def index(request):
    posts = Post.objects.all()
    context = {
        'posts': posts
    }

    return render(request, 'main/index.html', context)

def post_create(request):
    form = forms.PostForm()
    return render(request, 'main/post_create.html', {'form': form})

def store(request):
    print(request.POST.get('mdfield', ''))
    return redirect('index')
