import django_heroku
import dj_database_url
from food.settings.base import *


DEBUG = True

ALLOWED_HOSTS = ['thryve-food.herokuapp.com']


DATABASES: {
    'default': dj_database_url.config(conn_max_age=600, ssl_require=True)
}


django_heroku.settings(locals())