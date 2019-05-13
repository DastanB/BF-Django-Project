from django.shortcuts import render
from django.contrib.auth import views as auth_views
from django.contrib.auth.forms import AuthenticationForm, PasswordResetForm


class LoginView(auth_views.LoginView):
    template_name = 'authboss/login.html'
    authentication_form = AuthenticationForm
    redirect_authenticated_user = True


class LogoutView(auth_views.LogoutView):
    next_page = '/'


class PasswordResetView(auth_views.PasswordResetView):
    template_name = 'authboss/password_reset_form.html'
    email_template_name = 'authboss/password_reset_email.html'
    form_class = PasswordResetForm
    success_url = '/profile/'
