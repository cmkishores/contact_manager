from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Contact 
from .serializers import ContactSerialize



@api_view(['GET', 'POST'])
def contact_list(request):
    """
 List  contacts, or create a new contact.
 """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        contacts = Contact.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(contacts, 5)
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

        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/contacts/?page=' + str(nextPage), 'prevlink': '/api/contacts/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = ContactSerialize(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def contact_detail(request, pk):
    """
 Retrieve, update or delete a contact by id/pk.
 """
    try:
        contact = Contact.objects.get(pk=pk)
    except contact.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ContactSerialize(contact,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ContactSerialize(contact, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Create your views here.
