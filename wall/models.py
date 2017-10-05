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
    event_type = models.IntegerField()

    def __str__(self):
        return self.text

    class Meta:
        verbose_name_plural = 'Entries'


class Watchable(models.Model):
    """Class for creation of log entries for every change in its' children.

    There're three possible types of changes: creation, update, and deletion. 
    For every type the get_entry_text_user method is called with a number, event_type, as a parameter.
    By default, those numbers are constants CREATION, UPDATE, and DELETION.
    It is possible to change those numbers by changing the corresponding entry
    of the dict 'chains'. get_entry_text_user method will be called for every
    number in the array chains['*current_type_of_change*'].
    """
    
    CREATION = 1
    UPDATE = 2
    DELETION = 3
    chains = {
            'creation': [CREATION, ],
            'update': [UPDATE, ],
            'deletion': [DELETION, ],
            }

    def get_entry_text_user(self, event_type):
        raise NotImplementedError

    class Meta:
        abstract = True
