from rest_framework import serializers
from django.contrib.auth.models import User


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', '') 
        )
        return user


class AdminRegistrationSerializer(UserRegistrationSerializer):
    def create(self, validated_data):
        user = super().create(validated_data)
        user.is_staff = True 
        user.save()
        return user
