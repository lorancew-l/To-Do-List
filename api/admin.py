from django.contrib import admin
from .models import TaskModel, SubtaskModel, TaskSectionModel


@admin.register(TaskModel, SubtaskModel, TaskSectionModel)
class Admin(admin.ModelAdmin):
    pass

