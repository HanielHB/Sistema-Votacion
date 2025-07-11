from rest_framework import viewsets

from ..models.recinto1 import Recinto1
from ..serializers.recinto1_serializer import Recinto1Serializer

class Recinto1ViewSet(viewsets.ModelViewSet):
    queryset = Recinto1.objects.all()
    serializer_class = Recinto1Serializer
