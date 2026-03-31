from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from cart.models import Cart 
from .models import Order, OrderItem
from django.http import HttpResponse
# Create your views here.

@login_required
def checkout(request):
    user = request.user

    # 1. Get Cart
    cart = Cart.objects.get(user=user)

    # 2. Create Order
    order = Order.objects.create(user=user)

    # 3. Copy Items
    for item in cart.items.all():
       OrderItem.objects.create(
           order=order,
           product_name=item.product.name,
           price=item.product.price,
           quantity=item.quantity
       )

    # 4. Clear Cart
    cart.items.all().delete()

    return redirect('success')

def success(request):
    return HttpResponse("Order placed successfully!")