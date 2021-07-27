from rest_framework.response import Response
from rest_framework import status
from .models import TaskModel, SubtaskModel, TaskSectionModel
from .serializers import TaskSerializer, SubtaskSerializer, TaskSectionSerializer   
from rest_framework import generics
from rest_framework.generics import mixins

from datetime import datetime, timezone


class TaskList(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        task_section_id = self.request.query_params.get('task-section')

        try:
            task_section_id = int(task_section_id)
        except ValueError:
            return []

        task_section = TaskSectionModel.objects.get(pk=task_section_id)

        if not task_section:
            return []

        task_section_filter = {'today': {'deadline__date': datetime.now(timezone.utc)},
                               'important': {'is_important': True},
                               'all': {},
                               'custom': {'task_section__pk': task_section_id}}
    
        return TaskModel.objects.filter(completed=False, user=self.request.user, **task_section_filter[task_section.type])

    
    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        for item in response.data:
            item['subtask_list'] = (SubtaskModel.objects.filter(task__pk=item['id']).values('id', 'title', 'completed', 'creation_date', 'task'))

        return response

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
        return SubtaskModel.objects.filter(task__pk=self.kwargs.get('task_id'))

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

class TaskSectionList(generics.ListCreateAPIView):
    serializer_class = TaskSectionSerializer
    
    def get_queryset(self):
        return TaskSectionModel.objects.filter(user=self.request.user)

    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        for item in response.data:
            item['count'] = self.get_task_count(item['id'], request.user)

        return response

    def create(self, request):
        data = request.data.copy()
        data.update({'user': request.user.pk})
        serializer = self.get_serializer(data=data)
        serializer.is_valid()
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_task_count(self, task_section_id, user):
        task_section = TaskSectionModel.objects.get(pk=task_section_id)

        task_section_filter = {'today': {'deadline__date': datetime.now(timezone.utc)},
                               'important': {'is_important': True},
                               'all': {},
                               'custom': {'task_section__pk': task_section_id}}

        return len(TaskModel.objects.filter(completed=False, user=user, **task_section_filter[task_section.type]))