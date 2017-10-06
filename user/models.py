from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericRelation

from wall.models import Watchable

from copy import deepcopy

class User(AbstractUser):

    follows = models.ManyToManyField('self', symmetrical=False, 
            through='UserToUser', through_fields=('from_user', 'to_user'),
            related_name='followed_by'
            )

class UserToUser(Watchable):

    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='from_user')
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='to_user')

    chains = deepcopy(Watchable.chains)
    WATCHABLE_FIRST = 4
    WATCHABLE_SECOND = 5
    chains['creation'] = [WATCHABLE_FIRST, WATCHABLE_SECOND]

    class Meta:
        unique_together = ('from_user', 'to_user')
    
    def get_entry_text_user(self, event_type):
        if event_type == self.WATCHABLE_FIRST:
            return ['User {} now follows {}'.format(self.from_user, self.to_user),
                    self.from_user,
            ]
        elif event_type == self.WATCHABLE_SECOND:
            return ['User {} now follows {}'.format(self.from_user, self.to_user),
                    self.to_user,
            ]

