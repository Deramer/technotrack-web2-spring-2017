from rest_framework import permissions


class FilterPostsByUserPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.query_params.get('user_id'):
            if int(request.query_params.get('user_id')) == request.user.id:
                return True
            elif request.method == 'GET' and request.user.followed_by.filter(id=request.query_params.get('user_id')).count() != 0:
                return True
            else:
                return False
        else:
            return True
