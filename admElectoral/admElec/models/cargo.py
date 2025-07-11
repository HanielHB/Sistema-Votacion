from django.db import models
from .seccion import Seccion

class Cargo(models.Model):
    nombre = models.CharField(max_length=100)
    secciones_afectadas = models.ManyToManyField(Seccion)

    def __str__(self):
        return self.nombre
