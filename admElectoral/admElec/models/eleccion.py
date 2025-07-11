from django.db import models

class Eleccion(models.Model):
    TIPO_CHOICES = [
        ('nacional', 'Nacional'),
        ('departamental', 'Departamental'),
        ('municipal', 'Municipal'),
    ]
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    fecha = models.DateField()
    descripcion = models.TextField()

    def __str__(self):
        return f"{self.tipo} - {self.fecha}"
