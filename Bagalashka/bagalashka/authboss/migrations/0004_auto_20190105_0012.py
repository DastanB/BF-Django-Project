# Generated by Django 2.1.2 on 2019-01-04 18:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authboss', '0003_auto_20181218_2345'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='is_helper',
            field=models.BooleanField(default=False, verbose_name='Помогайка'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='is_student',
            field=models.BooleanField(default=False, verbose_name='Студент'),
        ),
    ]
