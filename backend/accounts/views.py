from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from user_profile.models import UserProfile

# Create your views here.
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
                    print(user)

                    # Create user profile
                    user_profile = UserProfile.objects.create(user=user, group_name=group_name, phone=phone, address=address, user_type=user_type)

                    # user_profile.save()

                    return Response({'success': 'User account created'})
                    # return Response(user_profile)
        else:
            return Response({ 'error': 'Passwords do not match' })