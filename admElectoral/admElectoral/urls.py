"""
URL configuration for admElectoral project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.db import router
from django.urls import path, include
from rest_framework import routers

from admElec.api import EleccionViewSet, SeccionViewSet, CargoViewSet, RecintoViewSet, MesaViewSet, VotanteViewSet, \
    JuradoViewSet, CandidatoViewSet, PapeletaViewSet, PartidoViewSet

router = routers.DefaultRouter()
router.register(r'elecciones', EleccionViewSet)
router.register(r'secciones', SeccionViewSet)
router.register(r'cargos', CargoViewSet)
router.register(r'recinto', RecintoViewSet)
router.register(r'mesa', MesaViewSet)
router.register(r'votantes', VotanteViewSet)
router.register(r'jurados', JuradoViewSet)
router.register(r'candidato', CandidatoViewSet)
router.register(r'papeletas', PapeletaViewSet) # Para la gestión o visualización de papeletas generadas
router.register(r'partidos', PartidoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]
