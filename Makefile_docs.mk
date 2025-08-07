DOCKER_REPOSITORY = ghcr.io/

STORYBOOK_DOCKERFILE	:= infra/docker/storybook/Dockerfile
STORYBOOK_NAME	   	 	:= ${DOCKER_REPOSITORY}komune-io/g2-storybook
STORYBOOK_IMG	    	:= ${STORYBOOK_NAME}:${VERSION}
STORYBOOK_LATEST		:= ${STORYBOOK_NAME}:latest

lint: lint-docker-storybook

build: build-storybook package-storybook

test:
	echo 'No Test'

stage: docker-storybook-stage

promote: docker-storybook-promote


# Storybook
build-storybook:
	@make build-libs
	@yarn build-storybook

lint-docker-storybook:
	@docker run --rm -i hadolint/hadolint hadolint --ignore DL3018 - < ${STORYBOOK_DOCKERFILE}

package-storybook:
	@docker build --platform=linux/amd64 -f ${STORYBOOK_DOCKERFILE} -t ${STORYBOOK_IMG} .

docker-storybook-stage:
	@docker tag ${STORYBOOK_IMG} ghcr.io/komune-io/${STORYBOOK_IMG}
	@docker push ghcr.io/komune-io/${STORYBOOK_IMG}

docker-storybook-promote:
	@docker tag ${STORYBOOK_IMG} docker.io/komune/${STORYBOOK_IMG}
	@docker push docker.io/komune/${STORYBOOK_IMG}