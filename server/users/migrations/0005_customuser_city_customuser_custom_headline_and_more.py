# Generated by Django 5.1.1 on 2024-09-27 22:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0004_customuser_avatar_alter_customuser_email"),
    ]

    operations = [
        migrations.AddField(
            model_name="customuser",
            name="city",
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AddField(
            model_name="customuser",
            name="custom_headline",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="customuser",
            name="headline",
            field=models.CharField(
                blank=True,
                choices=[
                    ("Backend Developer", "Backend Developer"),
                    ("Data Scientist", "Data Scientist"),
                    ("DevOps Engineer", "DevOps Engineer"),
                    ("Frontend Developer", "Frontend Developer"),
                    ("Full Stack Developer", "Full Stack Developer"),
                    ("JavaScript Developer", "JavaScript Developer"),
                    ("Software Engineer", "Software Engineer"),
                    ("Student", "Student"),
                    ("Custom", "Custom"),
                ],
                default="Custom",
                max_length=100,
            ),
        ),
        migrations.AlterField(
            model_name="customuser",
            name="avatar",
            field=models.ImageField(
                blank=True, null=True, upload_to="uploads/avatars/"
            ),
        ),
    ]
