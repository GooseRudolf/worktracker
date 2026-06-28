from .models import User
from .serializers import UserSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action, permission_classes
from rest_framework.viewsets import GenericViewSet
from rest_framework_simplejwt.tokens import RefreshToken

from core.service import send_html_email
from django.contrib.auth import authenticate
from django.utils.encoding import force_bytes
from drf_spectacular.utils import extend_schema
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from rest_framework.permissions import IsAuthenticated, AllowAny

@extend_schema(tags=["Users"])
class UsersViewSet(GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    def get_permissions(self):
        if self.action in ['create', 'login', 'resetpassword','logout']:
            return [AllowAny()]
        return [IsAuthenticated()]

    @extend_schema(tags=["Auth"])
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response( { "errors": [ {
                            "code": "USER_ALREADY_EXISTS","field": "username",
                            "message": "Такой пользователь уже существует"
                        } ] }, status=400)
        user = serializer.save(is_active=False)
        uid = urlsafe_base64_encode(force_bytes(user.id))
        token = default_token_generator.make_token(user)
        print(f"http://localhost:8000/verify-email/{uid}/{token}")
        send_html_email( to_email=user.email, subject="Подтверждение почты",
            template="email/verify.html",
            context={
                "link": f"http://localhost:8000/verify-email/{uid}/{token}",
                "username": user.username
            }
        )
        return Response({ "message": "Письмо с подтверждением отправлено на email"}, status=status.HTTP_201_CREATED)
    @extend_schema(tags=["Auth"])
    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if not user:
            return Response({
                "errors": [{ "code": "INVALID_CREDENTIALS",
                    "field": "password",
                    "message": "Неверный логин или пароль"
                }] }, status=400)
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": { "id": user.id, "username": user.username,},
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        })
    @extend_schema(tags=["Auth"])
    @action(detail=False, methods=['post'])
    def logout(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=205)
        except Exception:
            return Response({
                "errors": [{ "code": "INVALID_REFRESH",
                    "field": "password",
                    "message": "Рефреш токен не валиден"
                }] }, status=400)
    
    @extend_schema(tags=["Password"])
    @action(detail=False, methods=['post'])
    def resetpassword(self, request):
        email = request.data.get("email")
        print(email)
        user = User.objects.filter(email=email).first()
        if not user:
            return Response({
                "errors": [{ "code": "INVALID_EMAIL",
                    "field": "email",
                    "message": "Пользователя с такой почтой не сущетвует"
                }] }, status=400)
        uid = urlsafe_base64_encode(force_bytes(user.id))
        token = default_token_generator.make_token(user)
        print(f"http://localhost:8000/reset-password/{uid}/{token}")
        send_html_email( to_email=user.email, subject="Сброс пароля",
            template="password/reset_password_email.html",
            context={
                "link": f"http://localhost:8000/reset-password/{uid}/{token}",
                "username": user.username
            }
        )
        return Response({ "message": "Письмо для сброса пароля отправлено"}, status=status.HTTP_201_CREATED)
    
    @extend_schema(tags=["User"])
    @action(detail=False, methods=['get'],permission_classes=[IsAuthenticated])
    def me(self, request):
        try:
            user = request.user
            profile = getattr(user, "profile", None)
            avatar = None
            if profile and profile.avatar:
                print(profile.avatar)
                avatar = profile.avatar.url if hasattr(profile.avatar, "url") else profile.avatar
            return Response({ "id": user.id, "username": user.username,
                "email": user.email, "avatar": "http://127.0.0.1:8000"+avatar if avatar else None }, status=200)
        except Exception:
            return Response({
                "errors": [{ "code": "USER_FETCH_ERROR",
                    "field": "user", "message": "Ошибка получения данных пользователя" }]
            }, status=400)

    @extend_schema(tags=["User"])
    @permission_classes([IsAuthenticated])
    def update(self, request, pk=None, *args, **kwargs):
        user = request.user
        if not user:
            Response({
                "errors": [{ "code": "USER_CHANGE_ERROR",
                    "field": "user", "message": "Ошибка изменения данных пользователя" }]
            }, status=400)
        username = request.data.get("username")
        if username:
            user.username = username
            user.save()
        return Response({
            "username": user.username,
            "email": user.email,
        }, status=status.HTTP_200_OK)