from django.shortcuts import render
from .models import TaskModel
from .serializers import TaskSerializer

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

