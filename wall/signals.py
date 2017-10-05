from copy import deepcopy

from django.db.models.signals import post_save, post_init

from .models import Watchable, Entry


def watchable_postinit(instance, **kwargs):
    
    instance.watchable_ex = deepcopy(instance)


def watchable_postsave(instance, created=False, **kwargs):
    chain = instance.chains['creation'] if created else instance.chains['update']
    print(chain)
    for event_type in chain:
        res = instance.get_entry_text_user(event_type)
        if res == None:
            return None
        text, user = res
        instance.ex = None
        entry = Entry(text=text, content_object=instance, user=user, event_type=event_type)
        entry.save()

for model in Watchable.__subclasses__():
    post_init.connect(watchable_postinit, sender=model)
    post_save.connect(watchable_postsave, sender=model)
