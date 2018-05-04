from food.settings.base import *


DEBUG = True

ALLOWED_HOSTS = ['*']


# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'food',
        'USER': os.environ.get('FOOD_DATABASE_USER', 'kwasi'),
        'PASSWORD': os.environ.get('FOOD_DATABASE_PASSWORD', 'D15turb3d'),
        'HOST': 'localhost',
        'PORT': '',
    }
}