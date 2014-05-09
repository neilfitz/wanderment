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
	def get_db_prep_value(self, value, connection, prepared=False ):
		if not value: return
		assert(isinstance(value, list) or isinstance(value, tuple))
		return ','.join([unicode(s) for s in value])

	#???
	def value_to_string(self, obj):
		value = self._get_val_from_obj(obj)
		return self.get_db_prep_value(value)


# Create your models here.

class City(models.Model):
	name = models.CharField(max_length=30)
	latitude = models.DecimalField(max_digits=9, decimal_places=6)
	longitude = models.DecimalField(max_digits=9, decimal_places=6)

	def __unicode__(self):
		return self.name

class Post(models.Model):
	city = models.ForeignKey(City)
	user = models.ForeignKey(User)
	title = models.CharField(max_length=140)
	subTitle = models.CharField(max_length=140)
	text = models.TextField()
	imgURLs = CSVListField()
	soundURL = models.URLField(max_length=200)

	# The first image is the title image
	def getTitleImage(self):
		return str(self.imgURLs.split(',')[0])

	# All other images but the first image
	def getCarouselImages(self):
		return str(self.imgURLs.split(',')[1:])

	def __unicode__(self):
		return self.title 

#sample data. Call following in shell to populate local db.
# from wanderment.posts.models import City, Post
# from django.contrib.auth.models import User

# cityInfo = [ ("Mumbai", 	18.9750,  72.82583),
# 							("Boston", 	42.3133, -71.0571),
# 							("Doha",   	25.2867,  51.53333),
# 							("Bangkok",	13.7500, 100.46666)
# 						]
# for tu in cityInfo:
# 	c = City(name=tu[0], latitude=tu[1], longitude=tu[2])
# 	c.save()

# u = User(username="Dora")
# u.save()

# postInfo = Post(city=City.objects.get(name="Mumbai"),
#									user=User.objects.get(username="Dora"),
#									title="sample1", subTitle="ex1", text="text",imgURLs=[])
