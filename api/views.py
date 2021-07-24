from rest_framework.response import Response
from rest_framework import status
from .models import TaskModel, SubtaskModel
from .serializers import TaskSerializer, SubtaskSerializer
from rest_framework import generics
from rest_framework.generics import mixins


class TaskList(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        return TaskModel.objects.filter(completed=False, user=self.request.user)

    def create(self, request):
        data = request.data.copy()
        data.update({'user': request.user.pk})
        serializer = self.get_serializer(data=data)
        serializer.is_valid()
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
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
        return SubtaskModel.objects.filter(task__pk = self.kwargs.get('task_id'))

    def create(self, request, **kwargs):
        data = request.data.copy()
        data.update({'task': kwargs['task_id']})
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

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