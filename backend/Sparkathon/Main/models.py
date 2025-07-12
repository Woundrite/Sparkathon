from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
	pass

class Item(models.Model):
	name = models.CharField(max_length=100)
	description = models.TextField()
	price = models.DecimalField(max_digits=20, decimal_places=4)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.name