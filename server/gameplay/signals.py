# /server/gameplay/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import MaxAttainable, Grade, Rank, Level, UserProgress

# Global flag to prevent recursive signals
signal_trigger = False


@receiver(post_save, sender=MaxAttainable)
def update_grade_thresholds(sender, instance, **kwargs):
    total_grades = Grade.objects.count()
    max_xp = instance.max_xp
    xp_per_grade = max_xp / total_grades

    grades = Grade.objects.order_by("order")
    for i, grade in enumerate(grades):
        grade.xp_threshold = xp_per_grade * (i + 1)
        grade.save()


@receiver(post_save, sender=MaxAttainable)
def update_rank_thresholds(sender, instance, **kwargs):
    total_ranks = Rank.objects.count()
    total_challenges = instance.total_challenges
    challenges_per_rank = total_challenges / total_ranks

    ranks = Rank.objects.order_by("order")
    for i, rank in enumerate(ranks):
        rank.challenge_threshold = challenges_per_rank * (i + 1)
        rank.save()


@receiver(post_save, sender=Level)
def recheck_user_progress_on_level_update(sender, instance, **kwargs):
    global signal_trigger

    if not signal_trigger:
        signal_trigger = True
        try:
            # Fetch all UserProgress for the track of the updated level
            user_progresses = UserProgress.objects.filter(track=instance.track)

            for progress in user_progresses:
                # Check if the user now qualifies for the updated level
                completed_pages = set(progress.pages_completed)
                if set(instance.pages_required).issubset(completed_pages):
                    # Assign the new level but avoid recursion by limiting fields updated
                    progress.save(update_fields=["current_page", "last_completed"])

        finally:
            signal_trigger = False
