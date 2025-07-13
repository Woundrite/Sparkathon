from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Item, Event, ItemEvent

class CustomUserAdmin(UserAdmin):
	model = User
	# add the Events field to the UserAdmin
	fieldsets = UserAdmin.fieldsets + (
		(None, {'fields': ('Events',)}),
	)

admin.site.register(User, CustomUserAdmin)
admin.site.register(Item)
admin.site.register(Event)
admin.site.register(ItemEvent)