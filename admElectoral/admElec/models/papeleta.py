from django.db import models
from .seccion import Seccion

class Papeleta(models.Model):
    seccion = models.ForeignKey(Seccion, on_delete=models.CASCADE)
    archivo = models.FileField(upload_to='papeletas/')  # Guarda archivo generado

    def __str__(self):
        return f"Papeleta - {self.seccion.nombre}"
