from django.shortcuts import render
from rest_framework import viewsets
from .seralizers import ProductSerializer, CategorySerializer
from .models import Product, Category

# Create your views here.

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer