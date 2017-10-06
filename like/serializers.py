from rest_framework import serializers
from .models import Like


class LikeSerializer(serializers.ModelSerializer):

    author = serializers.ReadOnlyField(source='author.id')

    class Meta:
        model = Like
        fields = ('author', 'created', 'updated', 'content_type', 'object_id')
