from rest_framework import serializers
from .models import Header,InputField

class HeaderSerializer(serializers.ModelSerializer):

    class Meta:

        model = Header
        fields = ['id','title', 'description', 'image', 'created_at']


class InputFieldSerializer(serializers.ModelSerializer):

    class Meta:

        model = InputField
        fields = ['id', 'title', 'label', 'content']