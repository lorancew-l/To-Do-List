from .views import TaskList, TaskDetail, SubtaskList, SubtaskDetail, TaskFilterList
from django.urls import path

urlpatterns = [
    path('task-filters/', TaskFilterList.as_view()),
    path('tasks/', TaskList.as_view()),
    path('tasks/<str:pk>/', TaskDetail.as_view()),
    path('tasks/<str:task_id>/subtasks/', SubtaskList.as_view()),
    path('tasks/<str:task_id>/subtasks/<str:pk>/', SubtaskDetail.as_view()),
]