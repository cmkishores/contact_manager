from rest_framework import serializers
from .models import Contact


class ContactSerialize(serializers.ModelSerializer):

    class Meta:
        model = Contact
        #fields = ( 'pk' , 'first_name' , 'last_name' , 'email' , 'phone_number' , 'description' , 'organization' , 'title' )
        fields = ('__all__') #Serializer for the Contact model with all fields 
