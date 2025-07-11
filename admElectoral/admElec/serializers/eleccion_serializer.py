from rest_framework import serializers
from ..models import Eleccion

class EleccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eleccion
        fields = '__all__'
