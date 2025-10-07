.DEFAULT_GOAL := help

# Available commands and their descriptions
help:
	@echo "Usage: make [command]"
	@echo ""
	@echo "Available commands:"
	@echo "  setup			Setup, configure and run the project"
	@echo ""

setup:
	@echo "Setting up the database project..."
	@sleep 1
	@rm -rf generated
	@rm -rf prisma/migrations
	@pnpm tsx scripts/generate.ts
	@npx prisma generate --no-engine
	@npx prisma migrate dev --name "initial"
	@rm -rf scripts/fake.json
	@echo "Done!"
	@npx prisma studio
