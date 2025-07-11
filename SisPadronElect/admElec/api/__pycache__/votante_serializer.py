from rest_framework import serializers
from ..models.votante import Votante
from ..models.recinto import Recinto

class VotanteSerializer(serializers.ModelSerializer):
    recinto = serializers.PrimaryKeyRelatedField(
        queryset=Recinto.objects.all(),
        required=False,
        allow_null=True
    )

    class Meta:
        model = Votante
        fields = [
            'id',
            'ci',
            'nombre_completo',
            'direccion',
            'foto_ci_anverso',
            'foto_ci_reverso',
            'foto_votante',
            'recinto',
        ]
