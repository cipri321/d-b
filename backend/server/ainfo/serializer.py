from rest_framework import  serializers
from django.db import models
from django.contrib.auth.models import User


# Register serializer
class RegisterSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        user = User.objects.create_user(
                 username=validated_data['username'],
                 email=validated_data['email'],
                 first_name=validated_data['first_name'],
                 last_name=validated_data['last_name'],
                 )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password','first_name', 'last_name')


# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
