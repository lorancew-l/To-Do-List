# Generated by Django 3.1.7 on 2021-03-13 12:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_taskmodel_complited'),
    ]

    operations = [
        migrations.RenameField(
            model_name='taskmodel',
            old_name='complited',
            new_name='completed',
        ),
    ]
