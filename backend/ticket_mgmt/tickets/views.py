from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from .models import Ticket
from .serializers import TicketSerializer


class TicketViewSet(ModelViewSet):
    serializer_class = TicketSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'priority', 'user__username']

    def get_queryset(self):

        if self.request.user.is_staff: 
            return Ticket.objects.all()
        return Ticket.objects.filter(user=self.request.user)

    def create(self, request):
        # Create a new ticket and assign the current user as the owner
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request,**kwargs):
        # Update an existing ticket.
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request):
        # Delete a ticket. Only the ticket owner or admin users can delete it.
 
        instance = self.get_object()
        if request.user != instance.user and not request.user.is_staff:
            return Response(
                {"detail": "You do not have permission to delete this ticket."},
                status=status.HTTP_403_FORBIDDEN,
            )
        instance.delete()
        return Response({"message": "Ticket deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
