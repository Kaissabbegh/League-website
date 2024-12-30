from django.urls import path
from . import views

urlpatterns = [
    path('user/login/',views.MyTokenObtainPairView.as_view(),name='token-obtain-pair'),
    path('user/register/',views.registerUser,name='register'),
    path('champions/',views.getChamps,name='champions'),
    path('champions/<str:pk>',views.get_skins_for_champion,name='skin'),
    path('ranks/',views.getRanks,name='rank'),
    path('icons/',views.getIcons,name='icon'),
    path('runes/',views.getRunes,name='rune'),
    path('secrunes/',views.getSecRunes,name='secrune'),
    path('sums/',views.getSums,name='sums'),
    path('order/',views.createOrder,name='order'),
]