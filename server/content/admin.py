# /server/content/admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import Track  # Import the Track model


@admin.register(Track)
class TrackAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "slug",
        "icon_display",
        "image_display",
        "thumbnail_display",
    )  # Display additional fields
    search_fields = (
        "title",
        "slug",
    )  # Add search functionality based on title and slug

    # Method to display the icon character
    def icon_display(self, obj):
        return obj.icon if obj.icon else "No Icon"

    icon_display.short_description = "Icon"

    # Method to display the image thumbnail
    def image_display(self, obj):
        if obj.image:
            return format_html(
                f'<img src="{obj.image.url}" style="width: 50px; height: 50px;" />'
            )
        return "No Image"

    image_display.short_description = "Image"

    # Method to display the thumbnail
    def thumbnail_display(self, obj):
        if obj.thumbnail:
            return format_html(
                f'<img src="{obj.thumbnail.url}" style="width: 50px; height: 50px;" />'
            )
        return "No Thumbnail"

    thumbnail_display.short_description = "Thumbnail"
