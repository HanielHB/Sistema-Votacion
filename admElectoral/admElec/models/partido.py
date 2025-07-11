from django.db import models

class Partido(models.Model):
    nombre = models.CharField(max_length=100)
    sigla = models.CharField(max_length=10)
    color = models.CharField(max_length=20)

    def __str__(self):
        return self.nombre
