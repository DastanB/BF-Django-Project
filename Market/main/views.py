from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import authenticate, TokenAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework import generics
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.views import APIView
from .models import Category, Brand, Product, Comment
from .serializers import CategorySerializer, BrandSerializer, ProductSerializer, CommentSerializer, UserSerializer
from django.contrib.auth.models import User

# Create your views here.
@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        User.objects.create(username=username, email=email)
        user = User.objects.get(username=username)
        User.set_password(user, raw_password=password)
        user.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response({"errors": "Invalid data"})

class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

@api_view(['GET'])
def productList(request):
    paginator = LimitOffsetPagination()
    paginator.page_size = 10
    prods = Product.objects.all()
    result_page = paginator.paginate_queryset(prods, request)
    serializer = ProductSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def brandList(request):
    paginator = LimitOffsetPagination()
    paginator.page_size = 10
    brands = Brand.objects.all()
    result_page = paginator.paginate_queryset(brands, request)
    serializer = BrandSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def categoryList(request):
    paginator = LimitOffsetPagination()
    paginator.page_size = 10
    cats = Category.objects.all()
    result_page = paginator.paginate_queryset(cats, request)
    serializer = CategorySerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

class ProductListForUser(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JSONWebTokenAuthentication,)

    def get_queryset(self):
        return Product.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        category = Category.objects.get(pk=self.request.data["category"]['id'])
        brand = Brand.objects.get(pk=self.request.data['brand']['id'])
        serializer.save(user=self.request.user, category=category, brand=brand)

class ProductDetailsForUser(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JSONWebTokenAuthentication,)

    def get_object(self):
        return Product.objects.filter(user=self.request.user).get(id=self.kwargs['pk'])


    def perform_update(self, serializer):
        if self.get_object().is_owner(self.request):
            serializer.save()

    def perform_destroy(self, instance):
        if self.get_object().is_owner(self.request):
            instance.delete()


class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryCreate(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (IsAdminUser,)
    authentication_classes = (JSONWebTokenAuthentication,)

class CategoryDetails(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryUpdate(generics.UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (IsAdminUser,)
    authentication_classes = (JSONWebTokenAuthentication,)

class CategoryDelete(generics.DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (IsAdminUser,)
    authentication_classes = (JSONWebTokenAuthentication,)

class BrandList(generics.ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class BrandCreate(generics.CreateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = (IsAdminUser,)
    authentication_classes = (JSONWebTokenAuthentication,)

class BrandDetails(generics.RetrieveAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class BrandUpdate(generics.UpdateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = (IsAdminUser,)
    authentication_classes = (JSONWebTokenAuthentication,)

class BrandDelete(generics.DestroyAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = (IsAdminUser,)
    authentication_classes = (JSONWebTokenAuthentication,)

class CategoryProducts(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(category=Category.objects.get(pk=self.kwargs['fk']))

class BrandProducts(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(brand=Brand.objects.get(pk=self.kwargs['fk']))


class ProductDetails(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_object(self):
        return Product.objects.get(pk=self.kwargs['pk'])

class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JSONWebTokenAuthentication,)

    def get_queryset(self):
        return Comment.objects.filter(product=Product.objects.get(id=self.kwargs["fk"]))

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, product=Product.objects.get(pk=self.kwargs["fk"]))

class CommentDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JSONWebTokenAuthentication,)

    def perform_update(self, serializer):
        if self.get_object().is_owner(self.request):
            serializer.save()

    def perform_destroy(self, instance):
        if self.get_object().is_owner(self.request):
            instance.delete()