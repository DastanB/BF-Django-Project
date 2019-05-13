from django.db import models
from datetime import datetime
from authboss.models import Profile
# Create your models here.
class Project(models.Model):
    description = models.TextField()
    file = models.FileField()
    date = models.DateTimeField(default=datetime.now())
    due_on = models.DateTimeField()
    price = models.IntegerField()
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='projects')

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

    def __str__(self):
        return self.description

class CheatSheet(models.Model):
    description = models.TextField()
    file = models.FileField()
    date = models.DateTimeField(default=datetime.now())
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='cheats')

    class Meta:
        verbose_name = "Шпаргалка"
        verbose_name_plural = "Шпаргалки"

    def __str__(self):
        return self.description

class Discussion(models.Model):
    topic = models.CharField(max_length=255)
    date = models.DateTimeField(default=datetime.now())
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='discussions')

    class Meta:
        verbose_name = 'Обсуждение'
        verbose_name_plural = 'Обсуждения'

    def __str__(self):
        return self.name

class Comment_to_discussion(models.Model):
    message = models.TextField()
    date = models.DateTimeField(default=datetime.now())
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Комментарий к обсуждению'
        verbose_name_plural = 'Комментарии к обсуждениям'

    def __str__(self):
        return self.message