from rest_framework import serializers
from .models import Entry

class EntrySerializer(serializers.ModelSerializer):
    user_id = serializers.ReadOnlyField(source='user.id')
    user_username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Entry
        fields = ('user_id', 'user_username', 'id', 'created', 'updated', 'text')
