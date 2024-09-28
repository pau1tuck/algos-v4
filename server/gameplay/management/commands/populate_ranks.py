# /server/gameplay/management/commands/populate_ranks.py
"""
0.	Explorer
1.	Postulant
2.	Novice
3.	Apprentice
4.	Disciple
5.	Artisan
6.	Master
7.	Grand Master
8.	BEAST
"""
from django.core.management.base import BaseCommand
from gameplay.models import Rank


class Command(BaseCommand):
    help = "Populate the Rank model with default values based on challenge completion"

    def handle(self, *args, **kwargs):
        ranks = [
            {
                "id": 1,
                "title": "Explorer",
                "slug": "explorer",
                "order": 1,
                "challenge_threshold": 0.0,  # Default rank for all users
            },
            {
                "id": 2,
                "title": "Postulant",
                "slug": "postulant",
                "order": 2,
                "challenge_threshold": 0.12,
            },
            {
                "id": 3,
                "title": "Novice",
                "slug": "novice",
                "order": 3,
                "challenge_threshold": 0.25,
            },
            {
                "id": 4,
                "title": "Apprentice",
                "slug": "apprentice",
                "order": 4,
                "challenge_threshold": 0.37,
            },
            {
                "id": 5,
                "title": "Disciple",
                "slug": "disciple",
                "order": 5,
                "challenge_threshold": 0.50,
            },
            {
                "id": 6,
                "title": "Artisan",
                "slug": "artisan",
                "order": 6,
                "challenge_threshold": 0.62,
            },
            {
                "id": 7,
                "title": "Master",
                "slug": "master",
                "order": 7,
                "challenge_threshold": 0.75,
            },
            {
                "id": 8,
                "title": "Grand Master",
                "slug": "grand-master",
                "order": 8,
                "challenge_threshold": 0.87,
            },
            {
                "id": 9,
                "title": "BEAST",
                "slug": "beast",
                "order": 9,
                "challenge_threshold": 1.0,
            },
        ]

        for rank_data in ranks:
            Rank.objects.get_or_create(id=rank_data["id"], defaults=rank_data)

        self.stdout.write("Rank model populated successfully.")
