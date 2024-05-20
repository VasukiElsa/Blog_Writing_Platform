from django.db import models

class Header(models.Model):

    title = models.CharField(max_length=150)
    description = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add = True)


class InputField(models.Model):

    title = models.CharField(max_length=150)
    label = models.CharField(max_length=50)
    content = models.TextField(max_length= 2000)
