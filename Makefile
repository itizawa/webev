net:
	docker network create webev_link

up-front:
	docker-compose -f docker-compose.yml up

up-back:
	docker-compose -f ../webev-back/docker-compose.yml up
