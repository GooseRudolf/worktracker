from django.db import models

from config.settings.base import AUTH_USER_MODEL
from core.models import TimeStampedModel

class VacancyStatus(models.TextChoices):
    SAVED = 'saved', 'Сохранено'
    APPLIED = 'applied', 'Откликнулся'
    INTERVIEW = 'interview', 'Интервью'
    OFFER = 'offer', 'Оффер'
    REJECTED = 'rejected', 'Отказ'

class Vacancy(TimeStampedModel):
    user = models.ForeignKey(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='vacancies'
    )
    company = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    status = models.CharField( max_length=20,
        choices=VacancyStatus.choices, default=VacancyStatus.SAVED)
    salary = models.PositiveIntegerField(null=True, blank=True)
    url = models.URLField(blank=True)
    applied_at = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)
    def __str__(self):
        return f'{self.company} - {self.position}'
    class Meta:
        db_table = 'vacancies'
        verbose_name = 'Вакансия'
        verbose_name_plural = 'Вакансии'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', 'status']),
        ]