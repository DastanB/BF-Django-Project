from django.db import models
from datetime import datetime
from authboss.models import Profile

# Create your models here.
class Faculty(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Факультет"
        verbose_name_plural = "Факультеты"

    def __str__(self):
        return self.name

class Teacher(models.Model):
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    fathers_name = models.CharField(max_length=255)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name='teachers')

    class Meta:
        verbose_name = "Учитель"
        verbose_name_plural = "Учителя"

    def __str__(self):
        return self.name + " " + self.fathers_name + " " + self.surname

class Comment_to_teacher(models.Model):
    text = models.TextField()
    date = models.DateTimeField(default=datetime.now())
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='comments_to_teacher')
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='comments')

    class Meta:
        verbose_name = "Комментарий к преподавателю"
        verbose_name_plural = "Комментарии к преподавателям"

    def __str__(self):
        return self.text

class Vote(models.Model):
    vote_for_teachenig = models.IntegerField()
    vote_for_evaluating = models.IntegerField()
    vote_for_humanity = models.IntegerField()
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='votes')
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='votes')

    class Meta:
        verbose_name = "Оценка преподавателю"
        verbose_name_plural = "Оценки преподавателей"

    def __str__(self):
        return  self.teacher + " " + self.user

class Subject(models.Model):
    name = models.CharField(max_length=255)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name='subjects')
    syllabus = models.FileField()

    class Meta:
        verbose_name = "Предмет"
        verbose_name_plural = "Предметы"

    def __str__(self):
        return self.name

class Comment_to_subject(models.Model):
    text = models.TextField()
    date = models.DateTimeField(default=datetime.now())
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='comments_to_subjects')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='comments')
    file = models.FileField()

    class Meta:
        verbose_name = "Комментарий к предмету"
        verbose_name_plural = "Комментарии к предметам"

    def __str__(self):
        return self.text