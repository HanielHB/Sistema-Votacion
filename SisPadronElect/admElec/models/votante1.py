import uuid
from django.db import models
from .recinto1 import Recinto1  # importa Recinto si está en archivo separado

class Votante1(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ci = models.CharField(max_length=20, unique=True)
    nombre_completo = models.CharField(max_length=255)
    direccion = models.TextField()

    foto_ci_anverso = models.ImageField(upload_to='ci/anverso/')
   
    foto_votante = models.ImageField(upload_to='votantes/fotos/')

    recinto = models.ForeignKey(Recinto1, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.nombre_completo} ({self.ci})"
