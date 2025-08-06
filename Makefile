VERSION = $(shell cat VERSION)

clean:
	-rm -fr node_modules
	-find ./packages/*/ -name "node_modules" -type d -exec rm -rf {} \;
	-find ./packages/*/ -name "dist" -type d -exec rm -rf {} \;

install:
	@pnpm install --frozen-lockfile

lint: install
	@pnpm eslintCheck

build-pre: install
	VERSION=$(VERSION) pnpm workspaces:version

build: build-libs

test:
	echo 'No Test'

publish:
	pnpm workspaces:publish

promote:
	pnpm workspaces:publish

build-libs: install
	@pnpm --filter @komune-io/g2-utils run build
	@pnpm --filter @komune-io/g2-themes run build
	@pnpm --filter @komune-io/g2-notifications run build
	@pnpm --filter @komune-io/g2-components run build
	@pnpm --filter @komune-io/g2-forms run build
	@pnpm --filter @komune-io/g2-documentation run build
	@pnpm --filter @komune-io/g2-layout run build
	@pnpm --filter @komune-io/g2-composable run build
	@pnpm --filter @komune-io/g2-providers run build
	@pnpm --filter @komune-io/g2-s2 run build
	@pnpm --filter @komune-io/g2-im run build
	@pnpm --filter @komune-io/g2-fs run build
	@pnpm --filter @komune-io/g2 run build
	@pnpm --filter @komune-io/g2-storybook-documentation run build

.PHONY: version
version:
	@echo "$(VERSION)"
