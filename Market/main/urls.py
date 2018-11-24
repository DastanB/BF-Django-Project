from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework_jwt.views import obtain_jwt_token
urlpatterns = [
    path('login/', obtain_jwt_token),
    path('register/', views.register),

    path('', views.ProductList.as_view()),
    path('<int:pk>/', views.ProductDetails.as_view()),
    path('<int:fk>/comments/', views.CommentList.as_view()),
    path('<int:fk>/comments/<int:pk>/', views.CommentDetails.as_view()),

    path('myproducts/', views.ProductListForUser.as_view()),
    path('myproducts/<int:pk>/', views.ProductDetailsForUser.as_view()),

    path('categories/', views.CategoryList.as_view()),
    path('categories/<int:fk>/products/', views.CategoryProducts.as_view()),
    path('categories/<int:fk>/products/<int:pk>/', views.ProductDetails.as_view()),
    path('categories/<int:ffk>/products/<int:fk>/comments/', views.CommentList.as_view()),
    path('categories/<int:ffk>/products/<int:fk>/comments/<int:pk>/', views.CommentDetails.as_view()),

    path('brands/', views.BrandList.as_view()),
    path('brands/<int:fk>/products/', views.BrandProducts.as_view()),
    path('brands/<int:fk>/products/<int:pk>/', views.ProductDetails.as_view()),
    path('brands/<int:ffk>/products/<int:fk>/comments/', views.CommentList.as_view()),
    path('brands/<int:ffk>/products/<int:fk>/comments/<int:pk>/', views.CommentDetails.as_view()),
]