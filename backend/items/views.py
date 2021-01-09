from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Item
from .serializers import ItemSerializer

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