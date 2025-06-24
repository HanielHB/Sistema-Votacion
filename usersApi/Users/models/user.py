from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.utils import timezone


class User(AbstractUser, PermissionsMixin):

    SUPER_ADMIN = 'super_admin'
    ADMIN_PADRON = 'admin_padron'
    ADMIN_ELECCIONES = 'admin_elecciones'
    JURADO_ELECTORAL = 'jurado_electoral'
    ROLE_CHOICES = [
        (SUPER_ADMIN, 'Super Administrador'),
        (ADMIN_PADRON, 'Administrador de Padrón'),
        (ADMIN_ELECCIONES, 'Administrador de Elecciones'),
        (JURADO_ELECTORAL, 'Jurado Electoral'),
    ]

    ci = models.CharField(
        max_length=20,
        unique=True,
        help_text="Número de cédula de identidad"
    )
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default=JURADO_ELECTORAL,
        help_text="Rol asignado al usuario dentro del sistema"
    )

    REQUIRED_FIELDS = ['email', 'ci']

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


class RefreshToken(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='refresh_tokens'
    )
    token = models.CharField(
        max_length=255,
        unique=True,
        help_text="Cadena del refresh token"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Fecha de creación"
    )
    expires_at = models.DateTimeField(
        help_text="Fecha de expiración"
    )
    revoked = models.BooleanField(
        default=False,
        help_text="Indica si el token fue revocado"
    )

    class Meta:
        ordering = ['-created_at']

    def is_expired(self):
        return timezone.now() >= self.expires_at

    def __str__(self):
        return f"RefreshToken(user={self.user.username}, expires={self.expires_at})"
