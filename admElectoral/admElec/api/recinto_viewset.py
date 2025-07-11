from rest_framework import viewsets
from ..models.recinto import Recinto
from ..serializers.recinto_seralizer import RecintoSerializer

class RecintoViewSet(viewsets.ModelViewSet):
    queryset = Recinto.objects.select_related('seccion').all()
    serializer_class = RecintoSerializer
