from rest_framework import viewsets
from ..models.seccion import Seccion
from ..serializers.seccion_serializer import SeccionSerializer

class SeccionViewSet(viewsets.ModelViewSet):
    queryset = Seccion.objects.all()
    serializer_class = SeccionSerializer
