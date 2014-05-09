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
	country = models.CharField(max_length=30)
	population = models.CharField(max_length=30)
	cityType = models.CharField(max_length=30)
	language = models.CharField(max_length=30)
	feel = models.CharField(max_length=30)
	imgURL = models.CharField(max_length=200)


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

# #sample data. Call following in shell to populate local db.
# from wanderment.posts.models import City, Post
# from django.contrib.auth.models import User

# cityInfo = [ ("Mumbai", 18.9750, 72.82583, "India", "12,478,447","Big City", "Marathi, Hindi, English", "Urban", "http://www.goldentriangle-tour-india.com/blog/wp-content/uploads/2013/11/Mumbai_city.jpg"), ("Boston", 42.3133, -71.0571, "USA", "636,479", "City", "English, Bostonian","Historic","http://media-cdn.tripadvisor.com/media/photo-s/03/9b/2f/47/boston.jpg"), ("Doha", 25.2867, 51.53333, "Qatar", "1,312,947", "Capital", "Arabic", "Sandy", "http://collegiatemodelun.files.wordpress.com/2013/02/doha.jpg"),("Bangkok",	13.7500, 100.46666, "Thailand", "8,280,925", "Capital", "Thai", "Lively", "http://www.interasia.com.au/wp-content/uploads/2012/11/bangkok-temple-of-the-dawn.jpg"),("Aberdeen", 57.14977, -2.124765, "Scotland", "220,420", "Small City", "English, Scots","Idyllic", "http://www.bmiregional.com/upload/Destinations/Aberdeen/Dunnotar%20Castle,%20Aberdeen.jpg"),("Detroit", 42.1953, -83.0245, "USA", "681,090", "City", "English","Urban","http://static1.businessinsider.com/image/520505c269bedda51100002a/detroit-fight-shows-why-public-pensions-are-bound-for-problems.jpg"),("Yellowstone", 44.36, -110.3, "USA", "N/A", "National Park", "English", "Wild", "http://images.nationalgeographic.com/wpf/media-live/photos/000/020/cache/yellowstone-fountain-geyser_2018_600x450.jpg"),("Jiuzhaigou", 33.2, 103.9, "China", "N/A", "National Park", "Chinese", "Scenic","http://images.beijing2008.cn/20080421/Img214318027.jpg"),("Nairobi", -1.283333,36.81666, "Kenya", "3,375,000", "Capital", "Swahili, English", "Lively", "http://www.stevebloom.com/images/b/003502-SB2.jpg" ),("Rome", 41.9,12.5,"Italy","2,645,907", "Capital", "Italian", "Historic", "http://eatours.com/wp-content/uploads/trevifountain.jpg")]
	
# for tu in cityInfo:
# 	c = City(name=tu[0], latitude=tu[1], longitude=tu[2], country=tu[3], population=tu[4], cityType=tu[5], language=tu[6], feel=tu[7], imgURL=tu[8])
# 	c.save()

# u = User(username="Diego")
# u.save()

# postInfo = Post(city=City.objects.get(name="Mumbai"),
# 									user=User.objects.get(username="Dora"),
# 									title="sample1", subTitle="ex1", text="text",imgURLs=[])
