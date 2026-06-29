from .models import Vacancy
from django.db.models import Q, Count
from .serializers import VacancySerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

@extend_schema(tags=["Vacancy"])
class VacancyViewSet(ModelViewSet):
    serializer_class = VacancySerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        qs = Vacancy.objects.filter(user=self.request.user)
        search = self.request.query_params.get('search')
        status = self.request.query_params.get('status')
        if search:
            qs = qs.filter( Q(company__icontains=search) | Q(position__icontains=search) )
        if status: qs = qs.filter(status=status)
        return qs
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    @action(detail=False, methods=["get"])
    def dashboard(self, request):
        qs = self.get_queryset()
        stats = qs.aggregate(
            total=Count("id"),
            active=Count("id", filter=Q(status="active")),
            interview=Count("id", filter=Q(status="interview")),
            offer=Count("id", filter=Q(status="offer")),
        )
        latest = qs.order_by("-updated_at")[:5]
        return Response({ **stats,
            "latest": self.get_serializer(latest, many=True).data
        })