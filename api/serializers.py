from rest_framework import serializers
from .models import TaskModel, SubtaskModel


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskModel
        fields = ('id', 'title', 'deadline', 'completed', 'creation_date')

class SubtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubtaskModel
        fields = ('id', 'title', 'completed', 'creation_date')