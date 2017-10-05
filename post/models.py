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

    def get_entry_text_user(self, event_type):
        if event_type == Watchable.CREATION:
            return ['{} created post {}'.format(self.author, self.text[0:10]),
                    self.author,
            ]
        elif event_type == Watchable.UPDATE:
            if self.text != self.watchable_ex.text:
                return ['{} edited post {}'.format(self.author, self.text[0:10]),
                        self.author,
                ]
