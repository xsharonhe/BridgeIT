from django.urls import path
from .views import SignUpView, GetCSRFToken, SignInView, SignOutView, CheckAuthenticatedView

urlpatterns = [
    path('authenticated', CheckAuthenticatedView.as_view()),
    path('signup', SignUpView.as_view()),
    path('signin', SignInView.as_view()),
    path('signout', SignOutView.as_view()),
    path('csrf', GetCSRFToken.as_view())
]