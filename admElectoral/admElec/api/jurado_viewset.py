from rest_framework import viewsets
from ..models.jurado import Jurado
from ..serializers.jurado_seralizer import JuradoSerializer

class JuradoViewSet(viewsets.ModelViewSet):
    queryset = Jurado.objects.select_related('mesa').all()
    serializer_class = JuradoSerializer
