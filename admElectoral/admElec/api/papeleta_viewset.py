from rest_framework import viewsets
from ..models.papeleta import Papeleta
from ..serializers.papeleta_serializer import PapeletaSerializer

class PapeletaViewSet(viewsets.ModelViewSet):
    queryset = Papeleta.objects.select_related('seccion').all()
    serializer_class = PapeletaSerializer
