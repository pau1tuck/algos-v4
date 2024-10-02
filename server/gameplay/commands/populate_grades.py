# /server/gameplay/management/commands/populate_grades.py
"""
0.	White Belt
1.  White + Yellow Stripe
2.	Yellow Belt 
3.	Yellow + Green Stripe
4.	Green Belt
5.	Green + Purple Stripe
6.	Purple Belt
7.	Blue Belt
8.	Red Belt
9.	Black Belt
10.	Black + Camouflage Stripe
11.	Black + Red Dragon Stripe
12.	Black + Yellow Emperor Stripe
"""
from django.core.management.base import BaseCommand
from gameplay.models import Grade


class Command(BaseCommand):
    help = (
        "Populate the Grade model with belt colors and percentage-based XP thresholds"
    )

    def handle(self, *args, **kwargs):
        grades = [
            {
                "id": 1,
                "title": "White Belt",
                "slug": "white-belt",
                "order": 1,
                "xp_threshold": 0.00,
            },
            {
                "id": 2,
                "title": "White + Yellow Stripe",
                "slug": "white-yellow-stripe",
                "order": 2,
                "xp_threshold": 0.08,
            },
            {
                "id": 3,
                "title": "Yellow Belt",
                "slug": "yellow-belt",
                "order": 3,
                "xp_threshold": 0.17,
            },
            {
                "id": 4,
                "title": "Yellow + Green Stripe",
                "slug": "yellow-green-stripe",
                "order": 4,
                "xp_threshold": 0.25,
            },
            {
                "id": 5,
                "title": "Green Belt",
                "slug": "green-belt",
                "order": 5,
                "xp_threshold": 0.33,
            },
            {
                "id": 6,
                "title": "Green + Purple Stripe",
                "slug": "green-purple-stripe",
                "order": 6,
                "xp_threshold": 0.42,
            },
            {
                "id": 7,
                "title": "Purple Belt",
                "slug": "purple-belt",
                "order": 7,
                "xp_threshold": 0.50,
            },
            {
                "id": 8,
                "title": "Blue Belt",
                "slug": "blue-belt",
                "order": 8,
                "xp_threshold": 0.58,
            },
            {
                "id": 9,
                "title": "Red Belt",
                "slug": "red-belt",
                "order": 9,
                "xp_threshold": 0.67,
            },
            {
                "id": 10,
                "title": "Black Belt",
                "slug": "black-belt",
                "order": 10,
                "xp_threshold": 0.75,
            },
            {
                "id": 11,
                "title": "Black + Camouflage Stripe",
                "slug": "black-camouflage-stripe",
                "order": 11,
                "xp_threshold": 0.83,
            },
            {
                "id": 12,
                "title": "Black + Red Dragon Stripe",
                "slug": "black-red-dragon-stripe",
                "order": 12,
                "xp_threshold": 0.92,
            },
            {
                "id": 13,
                "title": "Black + Yellow Emperor Stripe",
                "slug": "black-yellow-emperor-stripe",
                "order": 13,
                "xp_threshold": 1.00,
            },
        ]

        for grade_data in grades:
            Grade.objects.get_or_create(id=grade_data["id"], defaults=grade_data)

        self.stdout.write("Grades populated successfully!")
