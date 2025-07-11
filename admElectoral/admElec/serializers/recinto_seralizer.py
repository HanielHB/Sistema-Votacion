from rest_framework import serializers
from ..models.recinto import Recinto
from ..models.seccion import Seccion

class RecintoSerializer(serializers.ModelSerializer):
    seccion = serializers.PrimaryKeyRelatedField(queryset=Seccion.objects.all())

    class Meta:
        model = Recinto
        fields = '__all__'
