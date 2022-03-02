define deploy-c
	docker-compose -f docker-compose-deploy.yml exec -T app bash -c
endef

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
