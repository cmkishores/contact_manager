# Generated by Django 2.2.7 on 2019-11-17 18:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0003_remove_contact_avatar'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contact',
            name='description',
        ),
    ]
