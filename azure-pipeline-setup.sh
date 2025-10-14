#!/bin/bash

# Script de configuração específico para Azure DevOps Pipeline
# Garante que todos os diretórios e arquivos necessários existam

echo "🔧 Configurando ambiente para Azure DevOps Pipeline..."

# Verificar se estamos no diretório correto
echo "📁 Diretório atual: $(pwd)"
echo "📋 Conteúdo do diretório:"
ls -la

# Verificar se package.json existe
if [ ! -f "package.json" ]; then
    echo "❌ ERRO: package.json não encontrado!"
    echo "🔍 Procurando por package.json em subdiretórios..."
    find . -name "package.json" -type f 2>/dev/null
    echo "🔍 Procurando por arquivos .json..."
    find . -name "*.json" -type f 2>/dev/null
    exit 1
fi

echo "✅ package.json encontrado"

# Criar diretórios necessários
echo "📁 Criando diretórios necessários..."
mkdir -p test-results
mkdir -p screenshots
mkdir -p reports

echo "✅ Diretórios criados com sucesso"

# Verificar se as dependências estão instaladas
echo "🔍 Verificando dependências..."

if [ ! -d "node_modules" ]; then
    echo "❌ node_modules não encontrado. Instalando dependências..."
    
    # Verificar se package-lock.json existe
    if [ -f "package-lock.json" ]; then
        echo "📦 package-lock.json encontrado. Usando npm ci..."
        npm ci
    else
        echo "📦 package-lock.json não encontrado. Usando npm install..."
        npm install
    fi
    
    if [ $? -ne 0 ]; then
        echo "❌ ERRO: Falha ao instalar dependências npm"
        exit 1
    fi
fi

echo "✅ Dependências npm instaladas"

# Instalar Playwright
echo "🎭 Instalando Playwright..."
npx playwright install --with-deps
if [ $? -ne 0 ]; then
    echo "❌ ERRO: Falha ao instalar Playwright"
    exit 1
fi

echo "✅ Playwright instalado com sucesso"

# Verificar se dotenv está disponível
if ! node -e "require('dotenv')" 2>/dev/null; then
    echo "❌ ERRO: dotenv não encontrado"
    exit 1
fi

echo "✅ dotenv disponível"

# Verificar se playwright está disponível
if ! node -e "require('playwright')" 2>/dev/null; then
    echo "❌ ERRO: playwright não encontrado"
    exit 1
fi

echo "✅ playwright disponível"

# Criar arquivo .env se não existir
if [ ! -f ".env" ]; then
    echo "📄 Criando arquivo .env..."
    cat > .env << EOF
# Configurações do ambiente
ENVIRONMENT=HML
NEMESYS_URL_HML=https://nemesys.hml.nossafintech.com.br
NEMESYS_USER_HML=emerson.teste
NEMESYS_PASSWORD_HML=Fintech@2025
NEMESYS_URL_PROD=https://nemesys.nossafintech.com.br
NEMESYS_USER_PROD=emerson.teste
NEMESYS_PASSWORD_PROD=Carbh@280100
PLAYWRIGHT_HEADLESS=true
PLAYWRIGHT_SLOW_MO=500
GEOLOCATION_LATITUDE=-23.5505
GEOLOCATION_LONGITUDE=-46.6333
GEOLOCATION_ACCURACY=100
TIMEZONE_ID=America/Sao_Paulo
LOCALE=pt-BR
EOF
    echo "✅ Arquivo .env criado"
else
    echo "📄 Arquivo .env já existe"
fi

# Criar arquivo bdd-instructions.txt se não existir
if [ ! -f "bdd-instructions.txt" ]; then
    echo "📄 Criando arquivo bdd-instructions.txt..."
    cat > bdd-instructions.txt << EOF
# Instruções BDD para MCP Runner
# Formato: AÇÃO: ELEMENTO: VALOR (opcional)

# Testes de segurança
SECURITY_CHECK: password_fields
SECURITY_CHECK: csrf_tokens
SECURITY_CHECK: sensitive_data

# Performance
PERFORMANCE_CHECK: page_load_time
PERFORMANCE_CHECK: api_response_time

# Screenshots
SCREENSHOT: pipeline-test.png
EOF
    echo "✅ Arquivo bdd-instructions.txt criado"
else
    echo "📄 Arquivo bdd-instructions.txt já existe"
fi

echo "🎉 Configuração da pipeline concluída com sucesso!"
echo "📋 Resumo:"
echo "   - package.json: ✅"
echo "   - node_modules: ✅"
echo "   - playwright: ✅"
echo "   - dotenv: ✅"
echo "   - test-results/: ✅"
echo "   - screenshots/: ✅"
echo "   - reports/: ✅"
echo "   - .env: ✅"
echo "   - bdd-instructions.txt: ✅"
