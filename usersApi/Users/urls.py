from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from Users.apis import UserViewSet, AuthViewSet

router = routers.DefaultRouter()

router.register(r'users', UserViewSet, basename='user')
router.register(r'auth', AuthViewSet, basename='auth')

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include(router.urls)),


]
