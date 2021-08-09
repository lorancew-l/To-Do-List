from django.contrib import admin
from .models import TaskModel, SubtaskModel, TaskFilterModel


@admin.register(TaskModel, SubtaskModel, TaskFilterModel)
class Admin(admin.ModelAdmin):
    pass

