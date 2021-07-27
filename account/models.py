from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
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

  def save(self, *args, **kwargs):
      created = not self.pk
      super().save(self, *args, **kwargs)

      if created:
         api.models.TaskSectionModel.objects.bulk_create([api.models.TaskSectionModel(title='Сегодня', user=self, type='today'),
                                                          api.models.TaskSectionModel(title='Важно', user=self, type='important'),
                                                          api.models.TaskSectionModel(title='Все задачи', user=self, type='all')])
