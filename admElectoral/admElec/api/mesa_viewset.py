from rest_framework import viewsets
from ..models.mesa import Mesa
from ..serializers.mesa_serializer import MesaSerializer

class MesaViewSet(viewsets.ModelViewSet):
    queryset = Mesa.objects.select_related('recinto').all()
    serializer_class = MesaSerializer
