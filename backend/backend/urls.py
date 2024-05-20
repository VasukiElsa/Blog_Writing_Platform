from django.urls import path
from blog import views

urlpatterns = [
    path('headers/', views.headerView),
    path('inputfields/',views.inputfieldView),
]