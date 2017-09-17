from django.contrib import admin
from django.contrib.contenttypes.admin import GenericStackedInline

from .models import Like

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):

    pass


class LikesInline(GenericStackedInline):
    
    model = Like


class LikeAbleAdmin(admin.ModelAdmin):

    inlines = [LikesInline,]
    readonly_fields = ['likes_count',]
