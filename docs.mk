DOCKER_REPOSITORY = ghcr.io/

STORYBOOK_DOCKERFILE	:= infra/docker/storybook/Dockerfile
STORYBOOK_NAME	   	 	:= ${DOCKER_REPOSITORY}komune-io/g2-storybook
STORYBOOK_IMG	    	:= ${STORYBOOK_NAME}:${VERSION}
STORYBOOK_LATEST		:= ${STORYBOOK_NAME}:latest

lint: lint-docker-storybook

build: build-storybook

test:
	echo 'No Test'

package: docker-storybook

# Storybook
build-storybook:
	@make build-libs
	@yarn build-storybook

docker-storybook:
	@docker build --platform=linux/amd64 -f ${STORYBOOK_DOCKERFILE} -t ${STORYBOOK_IMG} .
	@docker push ${STORYBOOK_IMG}

lint-docker-storybook:
	@docker run --rm -i hadolint/hadolint hadolint --ignore DL3018 - < ${STORYBOOK_DOCKERFILE}
