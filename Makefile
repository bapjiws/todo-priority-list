run_api:
	python ./back/manage.py runserver &
run_frontend:
	cd ./front && exec yarn run prod &
run_project: run_api run_frontend

stop_api:
	ps aux | grep "python ./back/manage.py runserver" | awk '{print $$2}' | xargs kill -9 &
stop_frontend:
	ps aux | grep "node server.js" | awk '{print $$2}' | xargs kill -9 &
stop_project: stop_api stop_frontend