FRONTEND_FOLDER := ./frontend
BACKEND_FOLDER := ./backend

install_backend_deps:
	sudo apt install python-pip && \
	pip install --upgrade pip && \
	pip install psycopg2 && \
	pip install virtualenv && \
	pip install virtualenvwrapper && \
	pip install Django
prepare_backend: install_backend_deps

install_frontend_deps:
	cd $(FRONTEND_FOLDER) && yarn install
build_frontend:
	cd $(FRONTEND_FOLDER) && yarn run build
prepare_frontend: install_frontend_deps build_frontend

run_api:
	python $(BACKEND_FOLDER)/manage.py runserver &
run_frontend:
	cd $(FRONTEND_FOLDER) && yarn run prod &
run_project: run_api run_frontend

stop_api:
	ps aux | grep "python $(BACKEND_FOLDER)/manage.py runserver" | awk '{print $$2}' | xargs kill -9 &
stop_frontend:
	ps aux | grep "node server.js" | awk '{print $$2}' | xargs kill -9 &
stop_project: stop_api stop_frontend