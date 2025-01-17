from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import AdminRegistrationSerializer
from django.contrib.auth.hashers import make_password


from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

class UserRegistrationView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if not username or not email or not password:
            return Response(
                {"message": "All fields are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {"message": "Username already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {"message": "Email already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User(username=username, email=email)
        user.set_password(password)
        user.save()

        return Response(
            {"message": "User registered successfully"},
            status=status.HTTP_201_CREATED,
        )


class AdminRegistrationView(APIView):
    def post(self, request):
        serializer = AdminRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            admin = serializer.save()
            admin.password = make_password(admin.password)
            admin.is_staff = True
            admin.save()
            
            return Response({"message": "Admin registered successfully"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User Login View
class UserLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {"message": "Username and password are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(username=username, password=password)

        if user:
            # Generate tokens
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token

            return Response(
                {
                    "message": "User login successful",
                    "access_token": str(access_token),
                    "refresh_token": str(refresh),
                    "username":username
                },
                status=status.HTTP_200_OK
            )

        return Response(
            {"message": "Invalid username or password"},
            status=status.HTTP_401_UNAUTHORIZED
        )



class AdminLoginView(APIView):
    permission_classes = [] 

    def post(self, request):

        username = request.data.get('username')
        password = request.data.get('password')

        # Validate input
        if not username or not password:
            return Response(
                {"message": "Username and password are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Authenticate the user
        user = authenticate(username=username, password=password)

        if user:
            if user.is_staff:
                refresh = RefreshToken.for_user(user)
                access_token = refresh.access_token

                return Response(
                    {
                        "message": "Admin login successful",
                        "access_token": str(access_token),
                        "refresh_token": str(refresh),
                    },
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"message": "You do not have admin privileges."},
                    status=status.HTTP_403_FORBIDDEN
                )

        return Response(
            {"message": "Invalid username or password"},
            status=status.HTTP_401_UNAUTHORIZED
        )
