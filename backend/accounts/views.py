from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from user_profile.models import UserProfile
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.contrib import auth
from .serializers import UserSerializer
from django.utils.decorators import method_decorator

# Create your views here.
class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({ 'isAuthenticated': 'success' })
            else:
                return Response({ 'isAuthenticated': 'error' })
        except:
            return Response({ 'error': 'Something went wrong when checking authentication status' })



@method_decorator(csrf_protect, name='dispatch')
class SignUpView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']
        verify_password = data['verify_password']
        group_name = data['group_name']
        phone = data['phone']
        address = data['address']
        user_type = data['user_type']

        if password == verify_password:
            if User.objects.filter(username=username).exists():
                return Response({'error': "Username already exists"})
            else:
                if len(password) < 8:
                    return Response({'error': 'Password must be at least 8 characters'})
                else:
                    # Create user
                    user = User.objects.create_user(username=username, password=password)

                    user = User.objects.get(id=user.id)

                    # Create user profile
                    user_profile = UserProfile.objects.create(user=user, group_name=group_name, phone=phone, address=address, user_type=user_type)

                    # user_profile.save()

                    return Response({'success': 'User account created'})
                    # return Response(user_profile)
        else:
            return Response({ 'error': 'Passwords do not match' })



@method_decorator(csrf_protect, name='dispatch')
class SignInView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({ 'success': 'User authenticated' })
            else:
                return Response({ 'error': 'Error Authenticating' })
        except:
            return Response({ 'error': 'Error signing in' })



class SignOutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({ 'success': 'Loggout Out' })
        except:
            return Response({ 'error': 'Something went wrong when logging out' })



@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set' })