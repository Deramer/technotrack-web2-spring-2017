from django.db.models.signals import post_save

from .models import Comment

def comment_postsave(instance, created=False, **kwargs):
    if created:
        instance.content_object.comments_count += 1
        instance.content_object.save()

post_save.connect(comment_postsave, sender=Comment)
