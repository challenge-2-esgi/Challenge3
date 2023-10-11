up:
	docker compose up -d
down:
	docker compose down
stop:
	docker compose stop

# back + front
install:
	docker compose exec node npm install
	docker compose exec react npm install
dev: install
	docker compose exec -ti node npm run dev
	docker compose exec -ti react npm run dev

# back
back-install:
	docker compose exec node npm install
back-dev: back-install
	docker compose exec -ti node npm run dev
back-shell:
	docker compose exec -ti node /bin/sh
d-s-u:
	docker compose exec -ti node npm run d:s:u

# front
front-install:
	docker compose exec react npm install
front-dev: front-install
	docker compose exec -ti react npm run dev
front-shell:
	docker compose exec -ti react /bin/sh