import re
from django.shortcuts import render
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.urls import get_resolver
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema

from core.serializers import ResetPasswordSerializer

User = get_user_model()

class VerifyEmailView(APIView):
    @extend_schema(exclude=True)
    def get(self, request, uid, token):
        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=user_id)
            if default_token_generator.check_token(user, token):
                user.is_active = True
                user.save()
                return render(request, "email/email_verified.html", 
                              { "username": user.username})
            return render(request, "email/email_error.html")
        except:
            return render(request, "email/email_error.html")

class ResetPasswordView(APIView):
    serializer_class = ResetPasswordSerializer
    @extend_schema(exclude=True)
    def get(self, request, uid, token):
        return render(request, "password/reset_password.html", {
            "uid": uid, "token": token})
    @extend_schema(exclude=True)
    def post(self, request, uid, token):
        password = request.data.get("password")
        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=user_id)
            if not default_token_generator.check_token(user, token):
                return render(request, "password/password_error.html")
            user.set_password(password)
            user.save()
            return render(request, "password/password_success.html")
        except:
            return render(request, "password/password_error.html")

def get_all_urls():
    resolver = get_resolver()
    urls = set()
    def extract_patterns(patterns, prefix=''):
        for pattern in patterns:
            if hasattr(pattern, 'url_patterns'):
                extract_patterns(pattern.url_patterns, prefix + str(pattern.pattern))
            else:
                raw_url = prefix + str(pattern.pattern)
                if not raw_url: continue
                if raw_url.startswith('admin'): continue
                if raw_url.startswith('_'): continue
                if 'drf_format_suffix' in raw_url: continue
                url = raw_url.replace('^', '').replace('$', '')
                url = re.sub(r'\.\(\?P<format>.*?\)\?/?', '', url)
                url = re.sub(r'\(\?P<(.*?)>.*?\)', r'<\1>', url)
                if '.' in url: continue
                urls.add(url)
    extract_patterns(resolver.url_patterns)
    return sorted(urls)
def home(request):
    return render(request, 'home.html', {'urls': get_all_urls()})