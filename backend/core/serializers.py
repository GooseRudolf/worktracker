from rest_framework import serializers

class ResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField( min_length=8, write_only=True)
    def validate_password(self, value):
        if value.isdigit():
            raise serializers.ValidationError("Пароль не должен быть только цифрами")
        return value