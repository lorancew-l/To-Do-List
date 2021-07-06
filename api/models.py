from django.db import models


class TaskModel(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=64, default='')
    creation_date = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField(null=True, blank=True)
    completed = models.BooleanField(default=False)

