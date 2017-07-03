# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Todo(models.Model):
    priority = models.IntegerField(default=0)
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)