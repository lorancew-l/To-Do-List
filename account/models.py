from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver
import api.models


class Manager(BaseUserManager):
  def create_user(self, email, password, **extra_fields):
    email = self.normalize_email(email)
    user = self.model(email=email, **extra_fields)
    user.set_password(password)
    user.save()
    
    return user

  def create_superuser(self, email, password, **extra_fields):
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)
    extra_fields.setdefault('is_active', True)

    return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
  email = models.EmailField(unique=True)
  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)

  USERNAME_FIELD = 'email'

  objects = Manager()

  
@receiver(post_save, sender=User)
def create_default_task_filters(instance, created, **kwargs):

  if created:
      api.models.TaskFilterModel.objects.bulk_create([api.models.TaskFilterModel(title='Сегодня', user=instance, type='today'),
                                                      api.models.TaskFilterModel(title='Важно', user=instance, type='important'),
                                                      api.models.TaskFilterModel(title='Все задачи', user=instance, type='all')])
