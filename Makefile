.PHONY: install build test dev up down logs clean

install:
	npm install

build:
	npm run build

test:
	npm test

dev:
	npm run dev

up:
	docker compose up --build -d

down:
	docker compose down

logs:
	docker compose logs -f app

clean:
	rm -rf dist node_modules
