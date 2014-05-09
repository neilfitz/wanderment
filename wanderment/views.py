import json
import collections
from django.http import HttpResponse

from wanderment.posts.models import Post, City

#http://stackoverflow.com/questions/4980662/jquery-autocomplete-plugin-using-a-django-database-model
#set max on autocomplete
MAX_AUTOCOMPLETE = 10

def autocomplete_city(request):
	term = request.GET.get('term') #"term" is the search term
	cities = City.objects.filter(name__istartswith=term)[:MAX_AUTOCOMPLETE]
	names = [city.name for city in cities]
	return HttpResponse(json.dumps(names))

def get_marker_info(request):
	cities = City.objects.all()
	res = [{'name':city.name,'latitude':float(city.latitude),'longitude':float(city.longitude),'imgURL':city.imgURL,'info':makeInfo(city), 'id':city.id} for city in cities]
	return HttpResponse(json.dumps(res), content_type='application/json')

def get_city_info(request):
	cityName = request.GET.get('name')
	match = list(City.objects.filter(name__iexact=cityName))
	res = {}
	if match:
		city = match[0]
		res['name'] = city.name
		res['latitude'] = float(city.latitude)
		res['longitude'] = float(city.longitude)
		res['found'] = True
		res['info'] = makeInfo(city)
	else:
		res['found'] = False
	return HttpResponse(json.dumps(res), content_type='application/json')

#helper function for making "cityInfo" dictionary object given a City
# TODO add in other params like country, language, etc in city model. Include in city info
def makeInfo(city):
	return {'name': city.name, 'info':collections.OrderedDict([('Country', city.country), ('Population', city.population), ('Type', city.cityType), ('Language', city.language), ('Feel', city.feel)])}
