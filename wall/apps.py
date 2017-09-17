from django.apps import AppConfig


class WallConfig(AppConfig):
    name = 'wall'

    def ready(self):
        from wall import signals
