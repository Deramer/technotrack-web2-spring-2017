from copy import deepcopy

from django.db.models.signals import post_save, post_init

from .models import Watchable, Entry


def watchable_postinit(instance, **kwargs):
    
    instance.ex = deepcopy(instance)


def watchable_postsave(instance, created=False, **kwargs):
    iteration = 1
    while iteration:
        res = instance.get_entry_text_user_repeat(instance.ex, instance, created, iteration)
        if res == None:
            return None
        text, user, iteration = res
        instance.ex = None
        entry = Entry(text=text, content_object=instance, user=user)
        entry.save()

for model in Watchable.__subclasses__():
    post_init.connect(watchable_postinit, sender=model)
    post_save.connect(watchable_postsave, sender=model)
