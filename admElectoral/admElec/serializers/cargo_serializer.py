from rest_framework import serializers
from ..models import Cargo, Seccion

class CargoSerializer(serializers.ModelSerializer):
    secciones_afectadas = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Seccion.objects.all()
    )

    class Meta:
        model = Cargo
        fields = '__all__'
