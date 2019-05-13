from rest_framework.serializers import ModelSerializer, Serializer
from rest_framework import serializers
from .models import Category, Brand, Product, Comment, Order
from django.contrib.auth.models import User

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=300)
    email = serializers.EmailField()

class CategorySerializer(Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=300)
    
    def create(self, validated_data):
        category = Category(**validated_data)
        category.save()
        return category

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

class BrandSerializer(ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name',]

class ProductSerializer(ModelSerializer):
    category = CategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ['category', 'brand', 'user', 'name', 'price',]

class CommentSerializer(ModelSerializer):
    product = ProductSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = ['message', 'product', 'user']

class OrderSerializer(ModelSerializer):
    product = ProductSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    class Meta:
        model = Order
        fields = ['message', 'product', 'user']