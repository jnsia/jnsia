from django.db import models
from ckeditor.fields import RichTextField


class Post(models.Model):
    title = models.CharField(max_length=50)
    content = RichTextField()
