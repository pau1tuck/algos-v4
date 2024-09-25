# /server/gameplay/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import MaxAttainable, Grade


@receiver(post_save, sender=MaxAttainable)
def update_grade_thresholds(sender, instance, **kwargs):
    total_grades = Grade.objects.count()
    max_xp = instance.max_xp
    xp_per_grade = max_xp / total_grades

    grades = Grade.objects.order_by("order")
    for i, grade in enumerate(grades):
        grade.xp_threshold = xp_per_grade * (i + 1)
        grade.save()
