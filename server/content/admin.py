# /server/content/admin.py
from django.contrib import admin
from .models import QuestionData, QuestionType, DifficultyLevel

admin.site.register(QuestionData)
admin.site.register(QuestionType)
admin.site.register(DifficultyLevel)
