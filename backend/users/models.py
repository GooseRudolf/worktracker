from django.db import models
from django.contrib.auth.models import AbstractUser
from core.models import TimeStampedModel

# Create your models here.
class User(TimeStampedModel, AbstractUser):
    def __str__(self):
        return self.get_full_name() or self.username
    class Meta:
        db_table = 'users'
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'