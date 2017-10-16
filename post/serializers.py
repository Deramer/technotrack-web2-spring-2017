from django.contrib.contenttypes.models import ContentType

from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):

    id = serializers.ReadOnlyField()
    author_id = serializers.ReadOnlyField(source='author.id')
    author_username = serializers.ReadOnlyField(source='author.username')
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()
    content_type = serializers.SerializerMethodField()

    def get_content_type(self, obj):
        return ContentType.objects.get_for_model(obj).id

    class Meta:
        model = Post
        fields = ('author_id', 'author_username',
                'text', 'created', 'updated', 'comments_count',
                'likes_count', 'content_type', 'id')
