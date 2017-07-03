from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^loadTodos$', views.loadTodos, name='loadTodos'),
    url(r'^dropTodos$', views.dropTodos, name='dropTodos'),
    url(r'^addTodo$', views.addTodo, name='addTodo'),
]