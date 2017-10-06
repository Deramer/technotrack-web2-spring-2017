from rest_framework import serializers
from .models import User, UserToUser


class UserSerializer(serializers.ModelSerializer):

    id = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'date_joined', 'last_login', )


class SelfSerializer(serializers.ModelSerializer):

    id = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'date_joined', 'last_login', )


class UserToUserSerializer(serializers.ModelSerializer):

    from_user = serializers.ReadOnlyField(source='from_user_id')

    class Meta:
        model = UserToUser
        fields = ('from_user', 'to_user')
