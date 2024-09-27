# /server/users/urls.py
from django.urls import path, include
from dj_rest_auth.views import PasswordResetConfirmView
from dj_rest_auth.registration.views import VerifyEmailView, ResendEmailVerificationView
from users.views import CustomUserView, CustomRegisterView

urlpatterns = [
    path("", include("dj_rest_auth.urls")),
    path("me/", CustomUserView.as_view(), name="custom-user"),
    path("register/", CustomRegisterView.as_view(), name="custom-register"),
    path(
        "account-confirm-email/",
        VerifyEmailView.as_view(),
        name="account_email_verification_sent",
    ),
    path(
        "account-confirm-email/<str:key>/",
        VerifyEmailView.as_view(),
        name="account_confirm_email",
    ),
    path(
        "password/reset/confirm/<str:uidb64>/<str:token>/",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path(
        "resend-email/", ResendEmailVerificationView.as_view(), name="rest_resend_email"
    ),
]
