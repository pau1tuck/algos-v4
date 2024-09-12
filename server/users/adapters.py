from allauth.account.adapter import DefaultAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):
    def save_user(self, request, user, form, commit=True):
        user = super().save_user(request, user, form, commit=False)
        user.username = user.email.split("@")[
            0
        ]  # Set username to part before @ in email
        if commit:
            user.save()
        return user
