from django.db import models

class Seccion(models.Model):
    nombre = models.CharField(max_length=100)
    coordenadas_mapa = models.TextField()  # JSON o texto que representa las coordenadas

    def __str__(self):
        return self.nombre
