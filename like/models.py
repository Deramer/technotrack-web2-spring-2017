from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType

from auxiliary.models import ModelWithDates, ModelWithAuthor
from wall.models import Watchable

class Like(ModelWithDates, ModelWithAuthor, Watchable):
    
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    def get_entry_text_user_repeat(self, ex_instance, instance, created, iteration):
        if created:
            text = self.content_object.like_to_text(instance)
            return [text, self.author, 0]

    def __str__(self):
        return "{}'s like".format(self.author)

class LikeAble(models.Model):
    
    likes = GenericRelation(Like)
    likes_count = models.IntegerField(default=0)

    def like_to_text(self, instance):
        raise NotImplementedError

    class Meta:
        abstract = True
