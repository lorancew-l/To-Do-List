from .views import TaskList, TaskDetail, SubtaskList, SubtaskDetail, TaskFilterList, TaskFilterDetail
from django.urls import path

urlpatterns = [
    path('task-filters/<str:pk>/', TaskFilterDetail.as_view()),
    path('task-filters/', TaskFilterList.as_view()),
    path('tasks/', TaskList.as_view()),
    path('tasks/<str:pk>/', TaskDetail.as_view()),
    path('tasks/<str:task_id>/subtasks/', SubtaskList.as_view()),
    path('tasks/<str:task_id>/subtasks/<str:pk>/', SubtaskDetail.as_view()),
]