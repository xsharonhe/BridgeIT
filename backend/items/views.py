from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .models import Item
from .serializers import ItemSerializer, CreateItemSerializer

# List all items
class ItemListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )

    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    pagination_class = None

# Retrieves a single item by ID
class ItemView(RetrieveAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

# List items to be donated
class DonatedItemView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Item.objects.filter(is_donation=True)
    serializer_class = ItemSerializer
    pagination_class = None

# List all requested items
class RequestedItemView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Item.objects.filter(is_donation=False)
    serializer_class = ItemSerializer
    pagination_class = None

# List all items for certain donor
class DonorItemView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Item.objects.filter(donor="Bridgeit")
    serializer_class = ItemSerializer
    pagination_class = None

# Create item
class CreateItemView(APIView):
    serializer_class = CreateItemSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            id = self.request.session.session_key
            name = serializer.data.get('name')
            quantity = serializer.data.get('quantity')
            expiry = serializer.data.get('expiry')
            is_donation = serializer.data.get('is_donation')
            location = serializer.data.get('location')
            queryset = Item.objects.filter(id=id)
            if queryset.exists():
                item = queryset[0]
                item.name = name
                item.quantity = quantity
                item.save(update_fields=['name', 'quantity', 'expiry', 'is_donation', 'location'])
            else:
                item = Item(id=id, name=name, quantity=quantity, expiry=expiry, is_matched=False, is_donation=is_donation, location="", is_weekday=True, time=0, duration=0, donor="", receiver="")
                item.save()

            # return Response(ItemSerializer(item).data)
            return Response({'success': 'Item added to database'})