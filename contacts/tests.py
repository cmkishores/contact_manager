from django.test import TestCase
from django.urls import reverse, reverse_lazy

from .models import Contact

class ContactTest(TestCase):
    def setUp(self):
        self.post = Contact.objects.create(first_name = "test_first", last_name = "test_last", email = "test@test.com", phone_number = "9" )
    
    def test_object_creation(self):
        test_object = Contact.objects.get(pk=1)
        expected_object_firstName = f'{test_object.first_name}'
        expected_object_lastName = f'{test_object.last_name}'
        expected_object_emailId = f'{test_object.email}'
        expected_object_phoneNumber = f'{test_object.phone_number}'
        self.assertEqual(expected_object_firstName,'test_first')
        self.assertEqual(expected_object_lastName,'test_last')
        self.assertEqual(expected_object_emailId,'test@test.com')
        return self.assertEqual(expected_object_phoneNumber,'9')








# Create your tests here.
