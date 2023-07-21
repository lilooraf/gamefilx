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

##make app-fast-[MODE]-log          Run the app with logs.
## 
app-fast-$(NODE_ENV)-log:
	@echo -e "\n\t 🎧 🤖 \n\t💻 🔧 💉\n\t🚀 🛸 🛰\n"
	@docker-compose -f docker-compose.$(NODE_ENV).yml -p $(DIR) up

##make app-fast-[MODE]              Run the app in background without logs.
## 
app-fast-$(NODE_ENV):
	@echo -e "\n\t 🎧 🤖 \n\t💻 🔧 💉\n\t🚀 🛸 🛰\n"
	@docker-compose -f docker-compose.$(NODE_ENV).yml -p $(DIR) up -d

##make app-[MODE]-log	          Build containers and run the app with logs.
## 
app-$(NODE_ENV)-log:
	@echo -e "\n\t 🎧 🤖 \n\t💻 🔧 💉\n\t🚀 🛸 🛰\n"
	@docker-compose -f docker-compose.$(NODE_ENV).yml -p $(DIR) up --build

##make app-[MODE]                   Build containers and run the app in background without logs.
## 
app-$(NODE_ENV):
	@echo -e "\n\t 🎧 🤖 \n\t💻 🔧 💉\n\t🚀 🛸 🛰\n"
	@docker-compose -f docker-compose.$(NODE_ENV).yml -p $(DIR) up --build -d

##make app-[MODE]-down              Delete containers.
## 
app-$(NODE_ENV)-down:
	@echo -e "\n\t 🚨 🚧 ⭕️ 🛑 ⛔️\n\n"
	@docker-compose -f docker-compose.$(NODE_ENV).yml -p $(DIR) down --remove-orphans

##make app-[MODE]-down-clean        Delete containers and volumes.
## 
app-$(NODE_ENV)-down-clean:
	@echo -e "\n\t 🚨 🚧 ⭕️ 🛑 ⛔️\n\n"
	@docker-compose -f docker-compose.$(NODE_ENV).yml -p $(DIR) down --remove-orphans --volumes

##make db-[MODE]-log          Run the database with logs.
## 
db-$(NODE_ENV)-log:
	@echo -e "\n\t 🎧 🤖 \n\t💻 🔧 💉\n\t🚀 🛸 🛰\n"
	@docker-compose -f docker-compose.$(NODE_ENV).yml -p $(DIR) up database --build


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