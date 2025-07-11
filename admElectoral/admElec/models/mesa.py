from django.db import models
from .recinto import Recinto

class Mesa(models.Model):
    numero = models.IntegerField()
    recinto = models.ForeignKey(Recinto, on_delete=models.CASCADE)

    def __str__(self):
        return f"Mesa {self.numero} - {self.recinto.nombre}"
