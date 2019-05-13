from django.db import models
from datetime import datetime
from django.contrib.auth.models import User
from markdownx.models import MarkdownxFormField
from markdownx.utils import markdownify
# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"

class Post(models.Model):
    title = models.CharField(max_length=255)
    photo = models.ImageField()
    text = MarkdownxFormField()
    published = models.DateTimeField(default=datetime.now())
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    likes = models.BigIntegerField(default=0)
    dislikes = models.BigIntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='posts')

    def __str__(self):
        return self.title

    @property 
    def formatted_markdown(self):
        return markdownify(self.content)

class Comment(models.Model):
    text = models.TextField()
    published = models.DateTimeField(default=datetime.now())
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.BigIntegerField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return self.text

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favourites')
    post = models.ForeignKey(Post, on_delete=models.CASCADE)