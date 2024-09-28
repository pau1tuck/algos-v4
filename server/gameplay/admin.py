# /server/gameplay/admin.py
from django.contrib import admin
from .models import Grade, Rank, Level, UserProgress

# Registering models for admin dashboard visibility
admin.site.register(Grade)
admin.site.register(Rank)
admin.site.register(Level)
admin.site.register(UserProgress)
