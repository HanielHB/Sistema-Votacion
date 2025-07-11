from django.db import models
from .mesa import Mesa

class Votante(models.Model):
    ci = models.CharField(max_length=20, unique=True)
    nombre = models.CharField(max_length=100)
    apellido_paterno = models.CharField(max_length=100)
    apellido_materno = models.CharField(max_length=100)
    mesa = models.ForeignKey(Mesa, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.ci} - {self.nombre} {self.apellido_paterno}"
