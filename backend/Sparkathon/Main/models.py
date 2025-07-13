from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid


class User(AbstractUser):
	events = models.ManyToManyField('Event', related_name='users_events', blank=True)

class Item(models.Model):
	name = models.CharField(max_length=100)
	description = models.TextField()
	price = models.DecimalField(max_digits=20, decimal_places=4)
	created_at = models.DateTimeField(auto_now_add=True)
	 
	class Meta:
		verbose_name_plural = "Items"

	def __str__(self):
		return self.name

class Event(models.Model):
	name = models.CharField(max_length=100)
	description = models.TextField()
	date = models.DateTimeField()
	location = models.CharField(max_length=255)
	created_at = models.DateTimeField(auto_now_add=True)
	# unique UUID for each event
	eventID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

	class Meta:
		verbose_name_plural = "Events"

	def __str__(self):
		return self.name
	
class ItemEvent(models.Model):
	item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='item_events_item')
	event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='item_events_event')
	quantity = models.PositiveIntegerField(default=1)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		verbose_name_plural = "Events' Items"

	def __str__(self):
		return f"{self.item.name} for {self.event.name}"