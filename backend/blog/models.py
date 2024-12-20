from djongo import models

class Header(models.Model):

    
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=500)
    image = models.ImageField(upload_to='input_field_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add = True)
    


class InputField(models.Model):

    
    title = models.CharField(max_length=150)
    label = models.CharField(max_length=50)
    content = models.TextField(max_length= 2000)
