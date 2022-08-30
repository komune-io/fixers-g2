STORYBOOK_DOCKERFILE	:= infra/docker/storybook/Dockerfile
STORYBOOK_NAME	   	 	:= smartbcity/g2-storybook
STORYBOOK_IMG	    	:= ${STORYBOOK_NAME}:${VERSION}
STORYBOOK_LATEST		:= ${STORYBOOK_NAME}:latest

docs: package-storybook

package-storybook:
	@docker build --no-cache=true -f ${STORYBOOK_DOCKERFILE} -t ${STORYBOOK_IMG} .
	@docker push ${STORYBOOK_IMG}

package-libs:
	@yarn install
	@yarn workspace @smartb/g2-utils run build
	@yarn workspace @smartb/g2-themes run build
	@yarn workspace @smartb/g2-notifications run build
	@yarn workspace @smartb/g2-components run build
	@yarn workspace @smartb/g2-forms run build
	@yarn workspace @smartb/g2-documentation run build
	@yarn workspace @smartb/g2-layout run build
	@yarn workspace @smartb/g2-composable run build
	@yarn workspace @smartb/g2-providers run build
	@yarn workspace @smartb/g2-s2 run build
	@yarn workspace @smartb/g2-i2 run build
	@yarn workspace @smartb/g2-fs run build
	@yarn workspace @smartb/g2 run build
	@yarn workspace @smartb/g2-storybook-documentation run build
	@yarn workspace @smartb/webpack-components run build

push-libs-npm:
	VERSION=${VERSION} yarn publishWorkspaces:npm

push-libs-gitlab:
	TAG=${VERSION} yarn publishWorkspaces:gitlab
