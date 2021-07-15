from .views import TaskList, TaskDetail, SubtaskList, SubtaskDetail
from django.urls import path

urlpatterns = [
    path('tasks/', TaskList.as_view()),
    path('tasks/<str:pk>/', TaskDetail.as_view()),
    path('tasks/<str:taskId>/subtasks/', SubtaskList.as_view()),
    path('tasks/<str:taskId>/subtasks/<str:pk>/', SubtaskDetail.as_view()),
]