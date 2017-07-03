# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers import serialize

import json

from .models import Todo

def index(request):
    return HttpResponse("Hi! You're at the API app index. Welcome!")

def loadTodos(request):
    if request.method == "GET":
        sort = request.GET.get('sort')
        if sort == 'desc':
            return HttpResponse(serialize('json', Todo.objects.order_by('-priority')))
        elif sort == 'asc':
            return HttpResponse(serialize('json', Todo.objects.order_by('priority')))
        else:
            return HttpResponse(serialize('json', Todo.objects.all()))

@csrf_exempt # probably better to add localhost to CSRF_TRUSTED_ORIGINS
def addTodo(request):
    if request.method == "POST":
        payload = json.loads(request.body)

        Todo.objects.create(
            priority=payload['todo']['priority'],
            name=payload['todo']['name'],
            description=payload['todo']['description']
        )

        return HttpResponse(json.dumps(payload['todo']))

def dropTodos(request):
    if request.method == "GET":
        Todo.objects.all().delete()
        return HttpResponse("DROPPED EVERYTHING!")