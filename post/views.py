from django.shortcuts import render

from rest_framework import viewsets, permissions

from .models import Post
from .serializers import PostSerializer
from .permissions import FilterPostsByUserPermission
from auxiliary.permissions import IsOwnerOrReadOnly


class PostViewSet(viewsets.ModelViewSet):

    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly, FilterPostsByUserPermission)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        qs = super(PostViewSet, self).get_queryset()
        if self.request.query_params.get('user_id'):
            qs = qs.filter(author_id=self.request.query_params.get('user_id'))
        return qs
