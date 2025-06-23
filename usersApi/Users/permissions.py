from rest_framework import permissions

class IsSuperAdmin(permissions.BasePermission):


    def has_permission(self, request, view):
        user = request.user
        return bool(
            user and
            user.is_authenticated and
            getattr(user, 'role', None) == user.SUPER_ADMIN
        )
