from django.db.models.signals import post_save

from .models import Like

def like_postsave(instance, created=False, *args, **kwargs):
    print('here')
    if created:
        instance.content_object.likes_count += 1
        instance.content_object.save()


post_save.connect(like_postsave, sender=Like)
