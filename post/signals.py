from django.db.models.signals import post_save

from adjacent import Client

from .serializers import PostSerializer


def watchable_postsave(instance, created=False, **kwargs):
    if (created):
        client = Client()
        client.publish('posts', PostSerializer(instance).data)
        client.send()

post_save.connect(watchable_postsave, sender=Post)
