from rest_framework import serializers
from ..models.votante1 import Votante1
from ..models.recinto1 import Recinto1

class Votante1Serializer(serializers.ModelSerializer):
    recinto = serializers.PrimaryKeyRelatedField(
        queryset=Recinto1.objects.all(),
        allow_null=True,
        required=False
    )

    class Meta:
        model = Votante1
        fields = '__all__'
