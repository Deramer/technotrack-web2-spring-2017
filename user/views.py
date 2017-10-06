from django.shortcuts import render

from rest_framework import viewsets, permissions
from rest_framework.response import Response

from .models import User, UserToUser
from .serializers import UserSerializer, SelfSerializer, UserToUserSerializer
from .permissions import IsUserOrReadOnly
from auxiliary.permissions import ListReadOnly


class UserViewSet(viewsets.ModelViewSet):

    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated, ListReadOnly, IsUserOrReadOnly)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.id == request.user.id:
            serializer = SelfSerializer(instance)
        else:
            serializer = UserSerializer(instance)
        return Response(serializer.data)


class UserToUserViewSet(viewsets.ModelViewSet):

    serializer_class = UserToUserSerializer
    queryset = UserToUser.objects.all()
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        if self.request.query_params.get('followers') is not None:
            return super(UserToUserViewSet, self).get_queryset().filter(to_user=self.request.user)
        return super(UserToUserViewSet, self).get_queryset().filter(from_user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(from_user = self.request.user)
