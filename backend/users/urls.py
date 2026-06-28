from rest_framework.routers import DefaultRouter
from .views import UsersViewSet


router = DefaultRouter()
router.register('', UsersViewSet)

urlpatterns = router.urls