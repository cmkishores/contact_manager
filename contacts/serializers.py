from rest_framework import serializers
from .models import Contact


class ContactSerialize(serializers.Serializer):

    class Meta:
        model = Contact
        fields = ( 'pk' , 'firstName' , 'lastName' , 'email' , 'phone_number' , 'description' , 'organization' , 'title' , 'avatar')