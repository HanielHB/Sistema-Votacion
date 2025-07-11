from rest_framework import viewsets
from ..models.votante import Votante
from ..serializers.votante_serializer import VotanteSerializer

class VotanteViewSet(viewsets.ModelViewSet):
    queryset = Votante.objects.select_related('mesa').all()
    serializer_class = VotanteSerializer
