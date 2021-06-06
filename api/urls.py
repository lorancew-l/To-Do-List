from .views import TaskList, TaskDetail
from django.urls import path

urlpatterns = [
    path('task-list/', TaskList.as_view()),
    path('task-detail/<str:pk>/', TaskDetail.as_view())
]