# Generated by Django 3.1.7 on 2021-03-12 09:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='taskmodel',
            name='title',
            field=models.CharField(default='', max_length=64),
        ),
    ]
