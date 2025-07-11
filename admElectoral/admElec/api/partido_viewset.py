from rest_framework import viewsets
from ..models.partido import Partido
from ..serializers.partido_serializer import PartidoSerializer

class PartidoViewSet(viewsets.ModelViewSet):
    queryset = Partido.objects.all()
    serializer_class = PartidoSerializer
