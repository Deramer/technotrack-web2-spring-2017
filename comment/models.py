from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType

from auxiliary.models import ModelWithDates, ModelWithAuthor
from like.models import LikeAble
from wall.models import Watchable

class Comment(ModelWithDates, ModelWithAuthor, LikeAble, Watchable):
    
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    text = models.TextField()
    
    def like_to_text(self, instance):
        return 'User {} liked comment {}.'.format(instance.author, self.text[0:10])

    def get_entry_text_user(self, event_type):
        if event_type == Watchable.CREATION:
            return ['{} left comment {}.'.format(self.author, self.text[0:10]),
                    self.author,
            ]
        elif event_type == Watchable.UPDATE:
            if self.text != self.watchable_ex.text:
                return ['{} edited comment {}.'.format(self.author, self.text[0:10]),
                        self.author,
                ]

    def __str__(self):
        return self.text[0:10]


class CommentAble(models.Model):
    
    comments = GenericRelation(Comment)
    comments_count = models.IntegerField(default=0)

    class Meta:
        abstract = True
