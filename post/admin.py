from django.contrib import admin

from .models import Post
from like.admin import LikeAbleAdmin
from comment.admin import CommentAbleAdmin


@admin.register(Post)
class PostAdmin(LikeAbleAdmin, CommentAbleAdmin):

    readonly_fields = LikeAbleAdmin.readonly_fields + CommentAbleAdmin.readonly_fields
    inlines = LikeAbleAdmin.inlines + CommentAbleAdmin.inlines
