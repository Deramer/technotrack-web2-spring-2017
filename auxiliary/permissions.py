from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.author == request.user or request.user.is_staff


class ListReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        if view.kwargs.get(view.lookup_url_kwarg or view.lookup_field) or request.method in permissions.SAFE_METHODS:
            return True
        return False


class ReadOnly(permissions.BasePermission):
    
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return False
