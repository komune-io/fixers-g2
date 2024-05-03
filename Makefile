VERSION = $(shell cat VERSION)

clean:
	-rm -fr node_modules
	-find ./packages/*/ -name "node_modules" -type d -exec rm -rf {} \;
	-find ./packages/*/ -name "dist" -type d -exec rm -rf {} \;

install:
	@yarn install --frozen-lockfile --ignore-scripts

lint: install
	@yarn eslintCheck

build-pre: install
	VERSION=$(VERSION) yarn workspaces:version

build: build-libs

test:
	echo 'No Test'

publish:
	yarn workspaces:publish

promote:
	yarn workspaces:publish

build-libs: install
	@yarn workspace @komune-io/g2-utils run build
	@yarn workspace @komune-io/g2-i18n run build
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

.PHONY: version
version:
	@echo "$(VERSION)"
