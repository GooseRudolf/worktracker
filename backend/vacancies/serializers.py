from rest_framework import serializers
from .models import Vacancy

class VacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = [ 'id', 'company', 'position',
            'status', 'salary', 'url', 'applied_at',
            'notes', 'created_at', 'updated_at',
        ]
        read_only_fields = ('id', 'created_at', 'updated_at')