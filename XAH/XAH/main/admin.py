from django.contrib import admin
from django.db import models
from .models import Post, Comment, Favorite, Category
from markdownx.admin import MarkdownxModelAdmin
from markdownx.widgets import AdminMarkdownxWidget

# Register your models here.
class PostAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'text': AdminMarkdownxWidget},
    }

admin.site.register(Post, PostAdmin)
admin.site.register(Comment)
admin.site.register(Favorite)
admin.site.register(Category)