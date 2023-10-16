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

# database
migration:
#	migration: should specify migration name
	docker compose exec -ti node npx sequelize-cli migration:create --name $(filter-out $@,$(MAKECMDGOALS))
migrate: 
	docker compose exec -ti node env NODE_ENV=dev npx sequelize-cli db:migrate
reset-db:
	docker compose exec -ti node env NODE_ENV=dev npx sequelize-cli db:migrate:undo:all
	docker compose exec -ti node env NODE_ENV=dev npx sequelize-cli db:migrate
seed-file:
#	should specify file name
	docker compose exec -ti node npx sequelize-cli seed:generate --name $(filter-out $@,$(MAKECMDGOALS))
seed-undo:
	docker compose exec -ti node env NODE_ENV=dev npx sequelize-cli db:seed:undo:all
seed: seed-undo
	docker compose exec -ti node env NODE_ENV=dev npx sequelize-cli db:seed:all
# dsu => database schema update
dsu:
	docker compose exec -ti node npm run dev:sync:db


# front
front-install:
	docker compose exec react npm install
front-dev: front-install
	docker compose exec -ti react npm run dev
front-shell:
	docker compose exec -ti react /bin/sh