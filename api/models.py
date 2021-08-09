from django.db import models
import account.models


class TaskFilterModel(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=30, default='')
    type = models.CharField(max_length=30, default='custom')
    favorite = models.BooleanField(default=False)
    user = models.ForeignKey(account.models.User, on_delete=models.CASCADE)

class TaskModel(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=64, default='')
    creation_date = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    is_important = models.BooleanField(default=False)
    note = models.TextField(null=True, blank=True)
    user = models.ForeignKey(account.models.User, on_delete=models.CASCADE)
    task_filter = models.ForeignKey(TaskFilterModel, on_delete=models.CASCADE, null=True, blank=True)

class SubtaskModel(models.Model):
    id = models.AutoField(primary_key=True)
    task = models.ForeignKey(TaskModel, on_delete=models.CASCADE)
    title = models.CharField(max_length=64, default='')
    creation_date = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)

