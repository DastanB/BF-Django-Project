from django.contrib import admin
from .models import CheatSheet, Project, Discussion, Comment_to_discussion

# Register your models here.
admin.site.register(CheatSheet)
admin.site.register(Project)
admin.site.register(Discussion)
admin.site.register(Comment_to_discussion)