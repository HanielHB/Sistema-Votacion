from rest_framework import viewsets
from ..models.eleccion import Eleccion
from ..serializers.eleccion_serializer import EleccionSerializer

class EleccionViewSet(viewsets.ModelViewSet):
    queryset = Eleccion.objects.all()
    serializer_class = EleccionSerializer
