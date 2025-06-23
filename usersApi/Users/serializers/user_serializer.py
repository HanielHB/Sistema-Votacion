from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from Users.models.user import User, RefreshToken


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'ci', 'first_name', 'last_name', 'email', 'role']
        read_only_fields = ['id']


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'ci', 'first_name', 'last_name', 'email', 'role', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError("Las contraseñas no coinciden.")
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class RefreshTokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = RefreshToken
        fields = ['id', 'user', 'token', 'created_at', 'expires_at', 'revoked']
        read_only_fields = ['id', 'created_at']


class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(username=attrs.get('username'), password=attrs.get('password'))
        if not user:
            raise AuthenticationFailed('Credenciales inválidas')
        if not user.is_active:
            raise AuthenticationFailed('Usuario inactivo')
        attrs['user'] = user
        return attrs


class LogoutSerializer(serializers.Serializer):

    refresh = serializers.CharField()

    def validate(self, attrs):
        token_str = attrs.get('refresh')
        try:
            token_obj = RefreshToken.objects.get(token=token_str, revoked=False)
        except RefreshToken.DoesNotExist:
            raise serializers.ValidationError('Token inválido o ya revocado')
        attrs['token_obj'] = token_obj
        return attrs

    def save(self, **kwargs):
        token_obj = self.validated_data['token_obj']
        token_obj.revoked = True
        token_obj.save()
        return token_obj
