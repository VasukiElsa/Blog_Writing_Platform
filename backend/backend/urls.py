from django.urls import path
from blog import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('headers/', views.headerView),
    path('inputfields/',views.inputfieldView),
] 

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)