# /server/gameplay/admin.py
from django.contrib import admin
from .models import Grade, Rank, Level, UserProgress, MaxAttainable

admin.site.register(Grade)
admin.site.register(Rank)
admin.site.register(Level)
admin.site.register(UserProgress)
admin.site.register(MaxAttainable)
