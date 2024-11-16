from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Header, InputField
from .serializers import HeaderSerializer, InputFieldSerializer


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
        serializer = InputFieldSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    
