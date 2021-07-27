from rest_framework import serializers
from .models import TaskModel, SubtaskModel, TaskSectionModel


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskModel
        fields = '__all__'

class SubtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubtaskModel
        fields = ('id', 'title', 'completed', 'creation_date', 'task')

class TaskSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskSectionModel
        fields = '__all__'
        read_only_fields = ('type', )