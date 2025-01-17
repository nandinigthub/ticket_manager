from rest_framework import serializers
from .models import Ticket

class TicketSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  

    class Meta:
        model = Ticket
        fields = ['id', 'title', 'description', 'priority', 'status', 'user'] 
        read_only_fields = ['id', 'user']
