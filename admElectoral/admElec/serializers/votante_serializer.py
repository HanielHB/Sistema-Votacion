from rest_framework import serializers
from ..models.votante import Votante
from ..models.mesa import Mesa

class VotanteSerializer(serializers.ModelSerializer):
    mesa = serializers.PrimaryKeyRelatedField(
        queryset=Mesa.objects.all(), allow_null=True, required=False
    )

    class Meta:
        model = Votante
        fields = '__all__'
