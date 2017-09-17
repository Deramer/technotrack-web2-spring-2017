from django.db import models
from django.contrib.auth.models import AbstractUser

from wall.models import Watchable


class User(AbstractUser):

    follows = models.ManyToManyField('self', symmetrical=False, through='UserToUser', through_fields=('from_user', 'to_user'))


class UserToUser(Watchable):

    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='from_user')
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='to_user')

    def get_entry_text_user_repeat(self, ex_instance, instance, created, iteration):
        if created and iteration == 1:
            return ['User {} now follows {}'.format(self.from_user, self.to_user),
                    self.from_user,
                    2
            ]
        elif created and iteration == 2:
            return ['User {} now follows {}'.format(self.from_user, self.to_user),
                    self.to_user,
                    0
            ]

