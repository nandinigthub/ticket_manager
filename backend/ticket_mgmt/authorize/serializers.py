from rest_framework import serializers
from django.contrib.auth.models import User


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']  # You can add more fields if needed

    def create(self, validated_data):
        # Create a new user with the validated data
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', '')  # Ensure email is optional
        )
        return user


class AdminRegistrationSerializer(UserRegistrationSerializer):
    def create(self, validated_data):
        # Create an admin user by using the UserRegistrationSerializer logic
        user = super().create(validated_data)
        user.is_staff = True  # Mark the user as an admin
        user.save()
        return user
