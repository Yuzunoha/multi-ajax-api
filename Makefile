define develop-c
	docker-compose -f docker-compose-develop.yml exec --user docker app bash -c
endef

define deploy-c
	docker-compose -f docker-compose-deploy.yml exec -T app bash -c
endef

define nginxproxy-c
	docker-compose -f docker-compose-nginxproxy.yml exec -T app bash -c
endef

develop-up:
	docker-compose -f docker-compose-develop.yml up -d
develop-ps:
	docker-compose -f docker-compose-develop.yml ps
develop-down:
	docker-compose -f docker-compose-develop.yml down
develop-bash:
	docker-compose -f docker-compose-develop.yml exec --user docker app bash
develop-init:
	echo DOCKER_UID=`id -u` > .env
	docker-compose -f docker-compose-develop.yml build --no-cache
	docker-compose -f docker-compose-develop.yml up -d
	$(develop-c) 'composer install'
	$(develop-c) 'touch database/database.sqlite'
	$(develop-c) 'chmod 777 -R storage bootstrap/cache database'
	$(develop-c) 'php artisan migrate'
develop-sqlite:
	$(develop-c) 'sqlite3 database/database.sqlite'

deploy-init:
	docker-compose -f docker-compose-deploy.yml build --no-cache
	docker-compose -f docker-compose-deploy.yml up -d
	$(deploy-c) 'composer install'
	$(deploy-c) 'touch database/database.sqlite'
	$(deploy-c) 'chmod 777 -R storage bootstrap/cache database'
	$(deploy-c) 'php artisan migrate'
deploy-up:
	docker-compose -f docker-compose-deploy.yml up -d
deploy-down:
	docker-compose -f docker-compose-deploy.yml down
deploy-phpunit:
	$(deploy-c) 'vendor/bin/phpunit'

nginxproxy-init:
	docker-compose -f docker-compose-nginxproxy.yml build --no-cache
	docker-compose -f docker-compose-nginxproxy.yml up -d
	$(nginxproxy-c) 'composer install'
	$(nginxproxy-c) 'touch database/database.sqlite'
	$(nginxproxy-c) 'chmod 777 -R storage bootstrap/cache database'
	$(nginxproxy-c) 'php artisan migrate'
nginxproxy-up:
	docker-compose -f docker-compose-nginxproxy.yml up -d
nginxproxy-down:
	docker-compose -f docker-compose-nginxproxy.yml down
nginxproxy-phpunit:
	$(nginxproxy-c) 'vendor/bin/phpunit'
