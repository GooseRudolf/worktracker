from django.contrib import admin

from .models import Vacancy


@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = ( 'id', 'company', 'position', 'status', 'user', 
                    'applied_at', 'created_at', )
    list_filter = ('status', 'created_at')
    search_fields = ('company', 'position', 'user__email', 'user__username')
    ordering = ('-created_at',)
    autocomplete_fields = ('user',)