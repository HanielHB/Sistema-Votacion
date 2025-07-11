from rest_framework import serializers
from ..models.papeleta import Papeleta
from ..models.seccion import Seccion

class PapeletaSerializer(serializers.ModelSerializer):
    seccion = serializers.PrimaryKeyRelatedField(queryset=Seccion.objects.all())

    class Meta:
        model = Papeleta
        fields = '__all__'
