from django.db import models
from django.contrib.auth.models import User


# custom field extending text field. Stores as a CSV
class CSVListField(models.TextField):
	def __init__(self, *args, **kwargs):
		super(CSVListField, self).__init__(*args,**kwargs)

	#convert from db CSV to python list
	def to_python(self, value):
		if not value: return
		if isinstance(value, list):
			return value
		return value.split(',')

	#send list or tuple to csv to unicode string
	def get_db_prep_value(self, value):
		if not value: return
		assert(isinstance(value, list) or isinstance(value, tuple))
		return ','.join([unicode(s) for s in value])

	#???
	def value_to_string(self, obj):
		value - self._get_val_from_obj(obj)
		return self.get_db_prep_value(value)


# Create your models here.

class City(models.Model):
	name = models.CharField(max_length=30)
	latitude = models.DecimalField(max_digits=9, decimal_places=6)
	longitude = models.DecimalField(max_digits=9, decimal_places=6)

class Post(models.Model):
	city = models.ForeignKey(City)
	user = models.ForeignKey(User)
	text = models.TextField()
	imgURLs = CSVListField()
	soundURL = models.URLField(max_length=200)

