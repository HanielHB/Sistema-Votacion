from rest_framework import viewsets

from admElec.serializers.votante1_serializer import Votante1Serializer
from ..models.votante1 import Votante1

class Votante1ViewSet(viewsets.ModelViewSet):
    queryset = Votante1.objects.all()
    serializer_class = Votante1Serializer


