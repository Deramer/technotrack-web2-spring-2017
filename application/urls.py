"""application URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from django.views.generic import TemplateView
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework import routers
from rest_framework.authtoken import views as auth_views

from post import views as post_views
from user import views as user_views
from wall import views as wall_views
from like import views as like_views


router = routers.DefaultRouter()
router.register('posts', post_views.PostViewSet)
router.register('users', user_views.UserViewSet)
router.register('follows', user_views.UserToUserViewSet)
router.register('entries', wall_views.EntryViewSet)
router.register('likes', like_views.LikeViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls')),
    url(r'api-token-auth/', auth_views.obtain_auth_token),
    url(r'', TemplateView.as_view(template_name='auxiliary/index.html'), name='index'),
#    url(r'', include('social_django.urls', namespace='social')),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]
