from .views import TaskList, TaskDetail
from django.urls import path

urlpatterns = [
    path('tasks/', TaskList.as_view()),
    path('tasks/<str:pk>/', TaskDetail.as_view()),
]