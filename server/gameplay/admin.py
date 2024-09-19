# /server/gameplay/admin.py
from django.contrib import admin
from .models import SkillLevel, Rank, GameplaySettings

admin.site.register(SkillLevel)
admin.site.register(Rank)
admin.site.register(GameplaySettings)
