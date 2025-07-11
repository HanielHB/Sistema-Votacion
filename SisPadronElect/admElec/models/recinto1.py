from django.db import models

class Recinto1(models.Model):
    nombre = models.CharField(max_length=255)
    ubicacion = models.TextField()  # Puedes usar JSON o una cadena de texto

    def __str__(self):
        return self.nombre
