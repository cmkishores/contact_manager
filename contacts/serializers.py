from rest_framework import serializers
from .models import Contact


class ContactSerialize(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = ('__all__') #Serializer for the Contact model with all fields 
