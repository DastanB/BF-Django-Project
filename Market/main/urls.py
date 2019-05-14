from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework_jwt.views import obtain_jwt_token
urlpatterns = [
    path('login/', views.login),
    path('register/', views.register),
    path('logout/', views.logout),

    path('', views.productList),
    path('<int:pk>/', views.ProductDetails.as_view()),
    path('<int:fk>/comments/', views.CommentList.as_view()),
    path('<int:fk>/comments/<int:pk>/', views.CommentDetails.as_view()),

    path('myproducts/', views.ProductListForUser.as_view()),
    path('myproducts/<int:pk>/', views.ProductDetailsForUser.as_view()),

    path('categories/', views.categoryList),
    path('categories/create/', views.CategoryCreate.as_view()),
    path('categories/update/', views.CategoryUpdate.as_view()),
    path('categories/delete/', views.CategoryDelete.as_view()),
    path('categories/<int:pk>/', views.CategoryDetails.as_view()),
    path('categories/<int:fk>/products/', views.CategoryProducts.as_view()),
    path('categories/<int:fk>/products/<int:pk>/', views.ProductDetails.as_view()),
    path('categories/<int:ffk>/products/<int:fk>/comments/', views.CommentList.as_view()),
    path('categories/<int:ffk>/products/<int:fk>/comments/<int:pk>/', views.CommentDetails.as_view()),

    path('brands/', views.brandList),
    path('brands/create/', views.BrandCreate.as_view()),
    path('brands/update/', views.BrandUpdate.as_view()),
    path('brands/delete/', views.BrandDelete.as_view()),
    path('brands/<int:pk>/', views.BrandDetails.as_view()),
    path('brands/<int:fk>/products/', views.BrandProducts.as_view()),
    path('brands/<int:fk>/products/<int:pk>/', views.ProductDetails.as_view()),
    path('brands/<int:ffk>/products/<int:fk>/comments/', views.CommentList.as_view()),
    path('brands/<int:ffk>/products/<int:fk>/comments/<int:pk>/', views.CommentDetails.as_view()),

    path('orders/', views.OrderList.as_view()),
    path('orders/product/<int:pk>/', views.OrderCreate.as_view()),
]