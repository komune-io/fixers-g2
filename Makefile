VERSION = $(shell cat VERSION)

clean:
	-rm -fr node_modules
	-find ./packages/*/ -name "node_modules" -type d -exec rm -rf {} \;
	-find ./packages/*/ -name "dist" -type d -exec rm -rf {} \;

lint:
	yarn eslintCheck

build-pre:
	@yarn install --frozen-lockfile --ignore-scripts
	VERSION=$(VERSION) yarn publishWorkspaces:version

build: build-libs

test:
	echo 'No Test'

publish:
	yarn publishWorkspaces:github

promote:
	yarn publishWorkspaces:github

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
	@yarn workspace @komune-io/g2-im run build
	@yarn workspace @komune-io/g2-fs run build
	@yarn workspace @komune-io/g2 run build
	@yarn workspace @komune-io/g2-storybook-documentation run build
	@yarn workspace @komune-io/webpack-components run build

.PHONY: version
version:
	@echo "$(VERSION)"
