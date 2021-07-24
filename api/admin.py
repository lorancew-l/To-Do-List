from django.contrib import admin
from .models import TaskModel, SubtaskModel


@admin.register(TaskModel, SubtaskModel)
class Admin(admin.ModelAdmin):
    pass

