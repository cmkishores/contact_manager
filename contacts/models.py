from django.db import models



class Contact(models.Model):
    first_name = models.CharField("First Name", max_length = 250)
    last_name = models.CharField("Last Name" , max_length = 250)
    email = models.EmailField()
    phone_number = models.CharField(max_length = 20)
    description = models.CharField(max_length = 250, blank=True, null=True)
    organization = models.CharField(max_length = 250, blank=True, null=True)
    title = models.CharField(max_length = 250 , blank=True, null=True)
    avatar = models.ImageField(upload_to='images')
    createdAt = models.DateTimeField("Created At", auto_now_add=True)


    def __str__(self):
        return self.first_name



# Create your models here.
