from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    UserRegistrationView,
    AdminRegistrationView,
    UserLoginView,
    AdminLoginView,
    AdminOnlyView,
)

urlpatterns = [
    # User Register
    path('register/user/', UserRegistrationView.as_view(), name='user-register'),
    # Admin Register
    path('register/admin/', AdminRegistrationView.as_view(), name='admin-register'),
    # User login
    path('login/user/', UserLoginView.as_view(), name='user-login'),
    
    # Admin login
    path('login/admin/', AdminLoginView.as_view(), name='admin-login'),

    # Token obtain pair (JWT)
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Token refresh (JWT)
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
