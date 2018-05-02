from django.db import models
IMAGE_URL = 'https://s3.amazonaws.com/bridge_foundation/static/img/'

# Create your models here.


class Food(models.Model):
    nbdno = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=256)
    weight = models.DecimalField(max_digits=10, decimal_places=2)
    measure = models.CharField(max_length=32)
    img = models.CharField(max_length=256, blank=True)

    def __unicode__(self):
        return self.name

    @property
    def image_url(self):
        return IMAGE_URL + self.image_name


class Nutrient(models.Model):
    food = models.ForeignKey(Food, related_name='nutrients',
                             on_delete=models.SET_NULL, blank=True, null=True)
    nutrient_id = models.IntegerField()
    nutrient = models.CharField(max_length=64)
    unit = models.CharField(max_length=8)
    value = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    gm = models.DecimalField(max_digits=10, decimal_places=2, blank=True)

    class Meta:
        unique_together = ('food', 'nutrient_id')

    def __unicode__(self):
        return '{name}: {id}: {value}: {unit}'.format(
            name=self.nutrient,
            id=self.nutrient_id,
            value=self.value,
            unit=self.unit
        )
