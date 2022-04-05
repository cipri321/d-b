from rest_framework import generics, permissions, mixins
from rest_framework.response import Response
from .serializer import RegisterSerializer, UserSerializer
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from django.http import HttpResponse


class TestApi(APIView):
    def get(self, request, format=None):
        print(request.user)
        print(request.headers)
        return HttpResponse(request.headers)



#Register API
class RegisterApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = []
    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            return Response({
                "user": UserSerializer(user,    context=self.get_serializer_context()).data,
                "message": "User Created Successfully.  Now perform Login to get your token",
            })
        except KeyError as e:
            return Response({"message" : f"{e} is required!"}, status=400)
