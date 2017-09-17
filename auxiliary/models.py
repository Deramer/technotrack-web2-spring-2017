from django.db import models
from django.conf import settings

class ModelWithAuthor(models.Model):

    author = models.ForeignKey(settings.AUTH_USER_MODEL, models.SET_NULL, null=True)

    class Meta:
        abstract = True


class ModelWithDates(models.Model):

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
