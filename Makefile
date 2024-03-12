DOCKER_REPOSITORY = ghcr.io/

STORYBOOK_DOCKERFILE	:= infra/docker/storybook/Dockerfile
STORYBOOK_NAME	   	 	:= ${DOCKER_REPOSITORY}smartbcity/g2-storybook
STORYBOOK_IMG	    	:= ${STORYBOOK_NAME}:${VERSION}
STORYBOOK_LATEST		:= ${STORYBOOK_NAME}:latest

docs: docker-storybook

# Storybook
build-storybook: build-libs
	@yarn build-storybook

docker-storybook:
	@docker build --platform=linux/amd64 -f ${STORYBOOK_DOCKERFILE} -t ${STORYBOOK_IMG} .
	@docker push ${STORYBOOK_IMG}

lint-docker-storybook:
	@docker run --rm -i hadolint/hadolint hadolint --ignore DL3018 - < ${STORYBOOK_DOCKERFILE}

clean:
	-rm -fr node_modules
	-find ./packages/*/ -name "node_modules" -type d -exec rm -rf {} \;
	-find ./packages/*/ -name "dist" -type d -exec rm -rf {} \;

build-libs:
	@yarn install --frozen-lockfile --ignore-scripts
	@yarn workspace @komune-io/g2-utils run build
	@yarn workspace @komune-io/g2-themes run build
	@yarn workspace @komune-io/g2-notifications run build
	@yarn workspace @komune-io/g2-components run build
	@yarn workspace @komune-io/g2-forms run build
	@yarn workspace @komune-io/g2-documentation run build
	@yarn workspace @komune-io/g2-layout run build
	@yarn workspace @komune-io/g2-composable run build
	@yarn workspace @komune-io/g2-providers run build
	@yarn workspace @komune-io/g2-s2 run build
	@yarn workspace @komune-io/g2-i2 run build
	@yarn workspace @komune-io/g2-i2-v2 run build
	@yarn workspace @komune-io/g2-fs run build
	@yarn workspace @komune-io/g2 run build
	@yarn workspace @komune-io/g2-storybook-documentation run build
	@yarn workspace @komune-io/webpack-components run build

push-libs-npm:
	VERSION=${VERSION} yarn publishWorkspaces:npm

push-libs-gitlab:
	TAG=${VERSION} yarn publishWorkspaces:gitlab
