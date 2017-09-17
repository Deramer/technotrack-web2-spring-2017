from django.db import models

from auxiliary.models import ModelWithAuthor, ModelWithDates
from like.models import LikeAble
from comment.models import CommentAble
from wall.models import Watchable

class Post(ModelWithDates, ModelWithAuthor, LikeAble, CommentAble, Watchable):

    text = models.TextField()

    def __str__(self):
        return "{}'s {}".format(self.author, self.text[0:10])

    def like_to_text(self, instance):
        return 'User {} liked post {}'.format(instance.author, self.text[0:10])

    def get_entry_text_user_repeat(self, ex_instance, instance, created, iteration):
        if created:
            return ['{} created post {}'.format(self.author, self.text[0:10]),
                    self.author,
                    0
            ]
        elif self.text != ex_instance.text:
            return ['{} edited post {}'.format(self.author, self.text[0:10]),
                    self.author,
                    0
            ]
