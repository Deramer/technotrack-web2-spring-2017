from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.conf import settings

from auxiliary.models import ModelWithDates


class Entry(ModelWithDates):

    text = models.CharField(max_length=300)
    object_id = models.PositiveIntegerField()
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    content_object = GenericForeignKey()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.text

    class Meta:
        verbose_name_plural = 'Entries'


class Watchable(models.Model):

    def get_entry_text_user_repeat(self, ex_instance, instance, created, iteration):
        raise NotImplementedError

    class Meta:
        abstract = True
