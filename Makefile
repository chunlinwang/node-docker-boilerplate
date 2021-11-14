CORE_SERVICES := app rabbitmq
ALL_SERVICES := ${CORE_SERVICES} 

DOCKER_COMPOSE_FILE := -f docker-compose.yml

# --------------------------

help: ## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

build: down ## up docker container
	@docker-compose ${COMPOSE_ALL_FILES} up -d --build ${ALL_SERVICES}

down: ## down docker container
	@docker-compose ${COMPOSE_ALL_FILES} down

stop: ## stop docker container
	@docker-compose ${COMPOSE_ALL_FILES} stop ${ALL_SERVICES}

restart: ## restart docker container
	@docker-compose ${COMPOSE_ALL_FILES} restart ${ALL_SERVICES}

rm: ## rm docker container
	@docker-compose $(COMPOSE_ALL_FILES) rm -f ${ALL_SERVICES}

logs: ## show docker container logs
	@docker-compose $(COMPOSE_ALL_FILES) logs --follow --tail=1000 ${ALL_SERVICES}

images: ## show docker images
	@docker-compose $(COMPOSE_ALL_FILES) images ${ALL_SERVICES}

clean: ## Remove all Containers and Delete Volume Data
	@docker-compose ${COMPOSE_ALL_FILES} down -v

cli: ## show docker
	@docker-compose ${COMPOSE_ALL_FILES} exec ${SERVICE} sh

eslint: ## Launch linter
	@docker-compose ${COMPOSE_ALL_FILES} exec app sh -c "yarn eslint"

test: ## Launch linter
	@docker-compose ${COMPOSE_ALL_FILES} exec app sh -c "yarn test"	