from rest_framework import viewsets
from ..models.candidato import Candidato
from ..serializers.candidato_serializer import CandidatoSerializer

class CandidatoViewSet(viewsets.ModelViewSet):
    queryset = Candidato.objects.select_related('partido', 'cargo').all()
    serializer_class = CandidatoSerializer
