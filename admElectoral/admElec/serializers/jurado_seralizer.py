from rest_framework import serializers
from ..models.jurado import Jurado
from ..models.mesa import Mesa

class JuradoSerializer(serializers.ModelSerializer):
    mesa = serializers.PrimaryKeyRelatedField(queryset=Mesa.objects.all())

    class Meta:
        model = Jurado
        fields = '__all__'
