from django.shortcuts import render
from rest_framework import serializers
from rest_framework.serializers import Serializer
from .models import TaskModel, SubtaskModel
from .serializers import TaskSerializer, SubtaskSerializer

from rest_framework import generics
from rest_framework.generics import mixins


class TaskList(generics.ListCreateAPIView):
    queryset = TaskModel.objects.filter(completed=False)
    serializer_class = TaskSerializer

class TaskDetail(generics.GenericAPIView,
                 mixins.UpdateModelMixin,
                 mixins.RetrieveModelMixin,
                 mixins.DestroyModelMixin,
                 mixins.CreateModelMixin):

    queryset = TaskModel.objects.all()
    serializer_class = TaskSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class SubtaskList(generics.ListCreateAPIView):
    serializer_class = SubtaskSerializer

    def get_queryset(self):
        return SubtaskModel.objects.filter(task__pk = self.kwargs.get('taskId'))

    def perform_create(self, serializer):
        serializer.save(task=TaskModel.objects.get(pk=int(self.kwargs.get('taskId'))))

class SubtaskDetail(generics.GenericAPIView,
                    mixins.UpdateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.DestroyModelMixin,
                    mixins.CreateModelMixin):

    queryset = SubtaskModel.objects.all()
    serializer_class = SubtaskSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)