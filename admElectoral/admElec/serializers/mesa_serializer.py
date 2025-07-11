from rest_framework import serializers
from ..models.mesa import Mesa
from ..models.recinto import Recinto

class MesaSerializer(serializers.ModelSerializer):
    recinto = serializers.PrimaryKeyRelatedField(queryset=Recinto.objects.all())

    class Meta:
        model = Mesa
        fields = '__all__'
