# /server/gameplay/management/commands/populate_ranks.py

from django.core.management.base import BaseCommand
from gameplay.models import Rank


class Command(BaseCommand):
    help = "Populate the Rank model with default values"

    def handle(self, *args, **kwargs):
        ranks = [
            {"id": 1, "title": "Explorer", "slug": "explorer", "order": 1},
            {"id": 2, "title": "Postulant", "slug": "postulant", "order": 2},
            {"id": 3, "title": "Novice", "slug": "novice", "order": 3},
            {"id": 4, "title": "Apprentice", "slug": "apprentice", "order": 4},
            {"id": 5, "title": "Journeyman", "slug": "journeyman", "order": 5},
            {"id": 6, "title": "Professional", "slug": "professional", "order": 6},
            {"id": 7, "title": "Master", "slug": "master", "order": 7},
            {"id": 8, "title": "BEAST", "slug": "beast", "order": 8},
        ]

        for rank_data in ranks:
            Rank.objects.get_or_create(id=rank_data["id"], defaults=rank_data)

        self.stdout.write("Rank model populated successfully.")
