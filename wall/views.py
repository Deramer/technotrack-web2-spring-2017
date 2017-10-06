from django.shortcuts import render
from django.contrib.auth import get_user_model

from rest_framework import viewsets, permissions

from .models import Entry
from .serializers import EntrySerializer
from .permissions import FilterEntriesByUser
from auxiliary.permissions import ReadOnly


class EntryViewSet(viewsets.ModelViewSet):

    serializer_class = EntrySerializer
    queryset = Entry.objects.all()
    permission_classes = (permissions.IsAuthenticated, ReadOnly, FilterEntriesByUser)

    def get_queryset(self):
        qs = super(EntryViewSet, self).get_queryset()
        user_id = self.request.query_params.get('user_id')
        if user_id:
            qs = qs.filter(user_id__in = 
                    get_user_model().objects.get(id = user_id).follows.all())
        else:
            qs = qs.filter(user_id__in = self.request.user.follows.all())
        return qs
