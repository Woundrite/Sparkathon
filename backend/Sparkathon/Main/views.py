from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404
from Main.models import User
from rest_framework.authtoken.models import Token
from Main.models import ItemEvent, Event, Item
from .serializers import UserSerializer

@api_view(['POST'])
def signup(request):
	serializer = UserSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
		user = User.objects.get(username=request.data['username'])
		user.set_password(request.data['password'])
		user.save()
		token = Token.objects.create(user=user)
		return Response({'token': token.key, 'user': serializer.data})
	print(serializer.errors['username'])
	return Response(serializer.errors, status=status.HTTP_200_OK)

@api_view(['POST'])
def login(request):
	user = get_object_or_404(User, username=request.data['username'])
	if not user.check_password(request.data['password']):
		return Response("missing user", status=status.HTTP_404_NOT_FOUND)
	token, created = Token.objects.get_or_create(user=user)
	serializer = UserSerializer(user)
	return Response({'token': token.key, 'user': serializer.data})

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
	return Response({'message': 'Token is valid'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_event(request):
	if request.method == 'POST':
		user = request.user
		eventName = request.data.get('name')
		eventDescription = request.data.get('description')
		eventDate = request.data.get('date')
		eventLocation = request.data.get('location')
		if not all([eventName, eventDescription, eventDate, eventLocation]):
			# find the missing field and return an error
			missing_fields = []
			if not eventName:
				missing_fields.append('name')
			if not eventDescription:
				missing_fields.append('description')
			if not eventDate:
				missing_fields.append('date')
			if not eventLocation:
				missing_fields.append('location')
			
			return Response({'error': 'All fields are required', "missing_fields": missing_fields}, status=status.HTTP_400_BAD_REQUEST)
		event = Event.objects.create(
			name=eventName,
			description=eventDescription,
			date=eventDate,
			location=eventLocation)
		event.save()
		user.events.add(event)
		user.save()

		if request.data.get('items'):
			items = request.data.get('items')
			for item in items:
				item_obj = Item.objects.get_or_create(name=item['name'], description=item['description'], price=item['price'])
				item_event = ItemEvent.objects.create(
						item=item_obj,
						event=event,
						quantity=item['quantity']
					)
				item_event.save()
				

		return Response({'message': 'Event created', 'EventID':event.eventID, **request.data}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_event(request, event_id):
	# return the event with the given id along with the items associated with it and their quantities
	event = get_object_or_404(Event, eventID=event_id)
	if(event not in request.user.events.all()):
		return Response({'error': 'You are not authorized to view this event'}, status=status.HTTP_403_FORBIDDEN)
	items = ItemEvent.objects.filter(event=event)
	items_data = []
	for item_event in items:
		items_data.append({
			'item': {
				'name': item_event.item.name,
				'description': item_event.item.description,
				'price': str(item_event.item.price)
			},
			'quantity': item_event.quantity
		})
	event_data = {
		'name': event.name,
		'description': event.description,
		'date': event.date,
		'location': event.location,
		'items': items_data
	}
	return Response(event_data, status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_items_to_event(request):
	# add an items(more than one possible at a time) to an event, if any of the item already exist, just update the quantity
	event_id = request.data.get('event_id')
	item_data = request.data.get('item')
	if not event_id or not item_data:
		return Response({'error': 'Event ID and item data are required'}, status=status.HTTP_400_BAD_REQUEST)
	
	event = get_object_or_404(Event, id=event_id)
	items = request.data.get('items')
	for item in items:
		if Item.objects.filter(name=item['name']).exists():
			# just get the item if it already exists and associate it with the event
			existing_item = Item.objects.get(name=item['name'], description=item['description'])
			item_event = ItemEvent.objects.create(
				item=existing_item,
				event=event,
				quantity=item['quantity']
			)
			item_event.save()
		else:
			# create a new item if it does not exist
			new_item = Item.objects.create(
				name=item['name'],
				description=item['description'],
				price=item['price']
			)
			new_item.save()
			item_event = ItemEvent.objects.create(
				item=new_item,
				event=event,
				quantity=item['quantity']
			)
			item_event.save()

	return Response({'message': 'Items added to event', 'event_id': event_id, 'items': items}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_events(request):
	user = request.user
	events = user.events.all()
	events_data = []
	for event in events:
		items = ItemEvent.objects.filter(event=event)
		items_data = []
		for item_event in items:
			items_data.append({
				'item': {
					'name': item_event.item.name,
					'description': item_event.item.description,
					'price': str(item_event.item.price)
				},
				'quantity': item_event.quantity
			})
		event_data = {
			'id': event.id,
			'name': event.name,
			'description': event.description,
			'date': event.date,
			'location': event.location,
			'items': items_data
		}
		events_data.append(event_data)
	
	return Response(events_data, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_collaborator_to_event(request, event_id):
	# the collaborator (the current user) will be added to the event witht the given id
	event = get_object_or_404(Event, id=event_id)
	if request.user not in event.users.all():
		event.users.add(request.user)
		event.save()
		return Response({'message': 'Collaborator added to event'}, status=status.HTTP_200_OK)
	else:
		return Response({'message': 'User already a collaborator'}, status=status.HTTP_400_BAD_REQUEST)