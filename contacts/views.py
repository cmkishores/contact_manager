from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger #Default classes in django that handles page segmentation of lists. 
from .models import Contact 
from .serializers import ContactSerialize
import urllib.request, json




@api_view(['GET', 'POST']) 
def contact_list(request): #View for contact listing and creating
    """
 List  contacts, or create a new contact.
 """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        contacts = Contact.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(contacts, 5) #paginator takes in the countable queryset and a size.
        try:
            data = paginator.page(page) 
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = ContactSerialize(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()
        #Returns the number of pages, the list of contacts and links to the next and previous pages if any. 
        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/contacts/?page=' + str(nextPage), 'prevlink': '/api/contacts/?page=' + str(previousPage)})
 
    elif request.method == 'POST': #For creating new contact. 
        serializer = ContactSerialize(data=request.data)
        if serializer.is_valid():
            
            serializer.save() #If the requested method is POST, then valid responses are saved as a new object. 

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def contact_detail(request, pk): #View for contact deletion and updation
    """
 Retrieve, update or delete a contact by id/pk.
 """
    try:
        contact = Contact.objects.get(pk=pk) #Gets the contact object with matching primary key
    except contact.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND) #Returns not found if doesn't exist. 

    if request.method == 'GET':
        serializer = ContactSerialize(contact,context={'request': request})
        return Response(serializer.data) #Returns the serialized data back to the caller. 

    elif request.method == 'PUT': #For updating the contact details. 
        serializer = ContactSerialize(contact, data=request.data,context={'request': request})
        if serializer.is_valid(): #Checks validity and saves the updates. 
            print(" reached is valid ")
            serializer.save()
            return Response(serializer.data) #If the update 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        contact.delete() #Deletes the contact object. 
        return Response(status=status.HTTP_204_NO_CONTENT)

# Create your views here.
