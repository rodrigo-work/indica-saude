.DEFAULT_GOAL := help
ROOT_DIR := $(dir $(realpath $(firstword $(MAKEFILE_LIST))))
ARG := $(word 2, $(MAKECMDGOALS))

IA=“Analise o código e melhore performance e legibilidade.”
“Melhore este código”, “Explique”, “Otimize imports”, etc.
# =====================================================
# Indica Saúde MVP – Automation Makefile
# Criação de Issues no GitHub com GH CLI
# =====================================================

# Repositório alvo (ex: usuario/nome-do-repo)
REPO = rodrigo-work/indica-saude

# Arquivo com as issues (título e descrição)
ISSUES_FILE = ./issues.txt

# Target padrão
all: create-issues

# =====================================================
# Criar issues no GitHub a partir de arquivo .txt
# Formato do arquivo:
#   # Título da Issue
#   Descrição da issue...
#   ---
#   # Outro título
#   Outra descrição...
# =====================================================

create-issues:
	@echo "🔧 Criando issues no repositório $(REPO)..."
	@awk -v repo="$(REPO)" -v RS="---" '{
		split($$0, lines, "\n");
		title="";
		desc="";
		for (i in lines) {
			line=lines[i];
			if (substr(line,1,1)=="#") {
				title=substr(line,3);
			} else {
				desc=desc line "\n";
			}
		}
		if (length(title)>0) {
			cmd="gh issue create --repo " repo " --title \"" title "\" --body \"" desc "\"";
			print "🚀 Criando issue: " title;
			system(cmd);
		}
	}' $(ISSUES_FILE)
	@echo "✅ Todas as issues foram criadas com sucesso!"

# =====================================================
# Verificar se o GH CLI está instalado e autenticado
# =====================================================

check:
	@which gh > /dev/null || (echo "❌ GitHub CLI não encontrado. Instale com: brew install gh" && exit 1)
	@gh auth status || (echo "⚠️  Faça login no GitHub com: gh auth login" && exit 1)

# =====================================================
# Exemplo: make create-issues
# =====================================================

.PHONY: create-issues check



# Available commands and their descriptions
help:
	@echo "Usage: make [command] [parameters]"
	@echo ""
	@echo "Available commands:"
	@echo "  setup        Setup, configure and run the project"
	@echo "  docker       Run docker services (optionally with a service name, e.g. make docker api)"
	@echo ""
	@echo "Parameters:"
	@echo "  api | db | redis | etc."
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

init:
	@echo "Setting up the database project..."
	@sleep 1
	ls -lha
# 	@ln -s /caminho/real/Makefile ./Makefile
# 	@readlink -f Makefile

docker:
	@echo "Executando docker para serviço: $(ARG)"
	@sleep 1
	@cd $(ROOT_DIR) && docker compose -f docker/databases.yml up -d $(ARG)

# ✅ Evita erro "Sem regra para processar o alvo 'db'"
$(ARG):
	@:
