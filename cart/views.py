from django.shortcuts import render
from .serializers import CartSerializer, CartItemSerializer
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Cart, CartItem


class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cart, created = Cart.objects.get_or_create(user = request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    def post(self, request):
        cart, created = Cart.objects.get_or_create(user = request.user)
        product = request.data['product']
        quantity = request.data.get('quantity')
        cart_item = CartItem.objects.create(cart = cart, product_id = product, quantity = quantity)
        return Response({'message': 'Item added to cart'}, status=status.HTTP_201_CREATED)
    
    def delete(self, request):
        item = request.data['item_id']
        delete_item = CartItem.objects.get(id = item)
        delete_item.delete()
        return Response({'message': 'Item removed from cart'}, status=status.HTTP_204_NO_CONTENT)