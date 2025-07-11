from rest_framework import viewsets
from ..models.cargo import Cargo
from ..serializers.cargo_serializer import CargoSerializer

class CargoViewSet(viewsets.ModelViewSet):
    queryset = Cargo.objects.prefetch_related('secciones_afectadas').all()
    serializer_class = CargoSerializer
