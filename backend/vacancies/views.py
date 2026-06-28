from rest_framework.viewsets import ModelViewSet
from .models import Vacancy
from .serializers import VacancySerializer
from rest_framework.permissions import IsAuthenticated


class VacancyViewSet(ModelViewSet):
    serializer_class = VacancySerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Vacancy.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)