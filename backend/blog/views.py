from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Header, InputField
from .serializers import HeaderSerializer, InputFieldSerializer
import base64
from django.core.files.base import ContentFile
from io import BytesIO
from PIL import Image


@api_view(['GET','POST'])
def headerView(request):
    
    if request.method == 'GET':
        headers = Header.objects.all()
        serializer = HeaderSerializer(headers, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = HeaderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def inputfieldView(request):

    if request.method == 'GET':
        inputfields = InputField.objects.all()
        serializer = InputFieldSerializer(inputfields, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        print("Incoming data:", request.data)

        # Process each input field and handle the Base64 image
        processed_data = []
        for field in request.data:
            title = field.get('title')
            label = field.get('label')
            content = field.get('content')
            language = field.get('language', None)
            image_data = field.get('image', None)  # Get the Base64 image string

            # Decode Base64 and convert to file if image is provided
            if image_data:
                format, imgstr = image_data.split(';base64,')  # Split the Base64 header
                ext = format.split('/')[-1]  # Extract the file extension
                image_file = ContentFile(base64.b64decode(imgstr), name=f"{title}.{ext}")
            else:
                image_file = None

            # Create InputField object manually, using decoded image data
            input_field = InputField(
                title=title,
                label=label,
                content=content,
                language=language,
                image=image_file
            )
            input_field.save()  # Save to the database

            # Serialize the object to return in the response
            processed_data.append(InputFieldSerializer(input_field).data)

        return Response(processed_data, status=status.HTTP_201_CREATED)