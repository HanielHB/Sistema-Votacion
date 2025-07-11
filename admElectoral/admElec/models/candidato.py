from django.db import models
from .partido import Partido
from .cargo import Cargo

class Candidato(models.Model):
    nombre = models.CharField(max_length=100)
    partido = models.ForeignKey(Partido, on_delete=models.CASCADE)
    cargo = models.ForeignKey(Cargo, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
