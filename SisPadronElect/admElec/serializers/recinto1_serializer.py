from rest_framework import serializers
from ..models.recinto1 import Recinto1

class Recinto1Serializer(serializers.ModelSerializer):
    class Meta:
        model = Recinto1
        fields = '__all__'
