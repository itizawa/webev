net:
	docker network create webev_link

up-front:
	# TODO #342 survey bug about docker-compose
	# docker-compose -f docker-compose.yml up
	yarn && yarn dev

up-back:
	docker-compose -f ../webev-back/docker-compose.yml up
