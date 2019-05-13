from django.contrib import admin
from .models import Faculty, Teacher, Comment_to_teacher, Vote, Subject, Comment_to_subject

# Register your models here.
admin.site.register(Faculty)
admin.site.register(Teacher)
admin.site.register(Comment_to_teacher)
admin.site.register(Comment_to_subject)
admin.site.register(Subject)
admin.site.register(Vote)