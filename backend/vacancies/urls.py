from rest_framework.routers import DefaultRouter
from .views import VacancyViewSet


router = DefaultRouter()
router.register('', VacancyViewSet, basename='vacancies')

urlpatterns = router.urls