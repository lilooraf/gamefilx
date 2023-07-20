include .env
export $(shell sed 's/=.*//' .env)

NAME = "default"
MODE = "development"
DEPENDENCIES = ""

#TAKE THE DIRECTORY'S NAME
DIR=$(notdir $(shell pwd))
export DIR

##------------------------------DEVELOPEMENT---------------------------------------------------------------
## 

##make app-[MODE]-log               This commande will run the app with logs.
## 
app-$(NODE_ENV)-log:
	@echo -e "\n\t 🎧 🤖 \n\t💻 🔧 💉\n\t🚀 🛸 🛰\n"
	@docker-compose -f docker-compose.$(NODE_ENV).yml -p $(DIR) up

##make app-[MODE]                   This commande will run the app in background without logs.
## 
app-$(NODE_ENV):
	@echo -e "\n\t 🎧 🤖 \n\t💻 🔧 💉\n\t🚀 🛸 🛰\n"
	@docker-compose -f docker-compose.$(NODE_ENV).yml -p $(DIR) up -d

##make app-[MODE]-log-rebuild	  This commande will rebuild containers and run the app with logs.
## 
app-$(NODE_ENV)-log-rebuild:
	@echo -e "\n\t 🎧 🤖 \n\t💻 🔧 💉\n\t🚀 🛸 🛰\n"
	@docker-compose -f docker-compose.$(NODE_ENV).yml -p $(DIR) up --build

##make app-[MODE]-rebuild           This commande will rebuild containers and run the app in background without logs.
## 
app-$(NODE_ENV)-rebuild:
	@echo -e "\n\t 🎧 🤖 \n\t💻 🔧 💉\n\t🚀 🛸 🛰\n"
	@docker-compose -f docker-compose.$(NODE_ENV).yml -p $(DIR) up --build -d

##make app-[MODE]-down              This commande will delete containers.
## 
app-$(NODE_ENV)-down:
	@echo -e "\n\t 🚨 🚧 ⭕️ 🛑 ⛔️\n\n"
	@docker-compose -f docker-compose.$(NODE_ENV).yml -p $(DIR) down --remove-orphans

##make app-[MODE]-down-clean        This commande will delete containers and volumes.
## 
app-$(NODE_ENV)-down-clean:
	@echo -e "\n\t 🚨 🚧 ⭕️ 🛑 ⛔️\n\n"
	@docker-compose -f docker-compose.$(NODE_ENV).yml -p $(DIR) down --remove-orphans --volumes

##------------------------------TOOLS----------------------------------------------------------------------
##

migrate:## Update your database using the migrations files during development.
	npx prisma migrate dev

migrate-reset:## Reset your database and apply migrations, all data will be lost.
	npx prisma migrate reset
##			       All data will be lost.

seed:## Seed your database.
	npx prisma db seed

app-test:## Run your tests.
	npm run test

help:
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(firstword $(MAKEFILE_LIST)) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
##------------------------------TOOLS----------------------------------------------------------------------

.PHONY: help app-$(NODE_ENV) app-$(NODE_ENV)-log app-$(NODE_ENV)-down app-$(NODE_ENV)-down-clean app-test seed migrate-reset migrate

.DEFAULT_GOAL = help