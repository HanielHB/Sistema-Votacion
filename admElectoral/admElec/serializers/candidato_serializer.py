from rest_framework import serializers
from ..models.candidato import Candidato
from ..models.partido import Partido
from ..models.cargo import Cargo

class CandidatoSerializer(serializers.ModelSerializer):
    partido = serializers.PrimaryKeyRelatedField(queryset=Partido.objects.all())
    cargo = serializers.PrimaryKeyRelatedField(queryset=Cargo.objects.all())

    class Meta:
        model = Candidato
        fields = '__all__'
