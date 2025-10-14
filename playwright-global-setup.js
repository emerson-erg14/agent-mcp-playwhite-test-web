// Global setup para testes NEMESYS
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function globalSetup(config) {
  console.log('🚀 Iniciando configuração global do Playwright...');
  
  // Criar diretórios necessários
  const dirs = ['screenshots', 'test-results', 'playwright-report'];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Diretório criado: ${dir}`);
    }
  }
  
  // Configurar variáveis de ambiente se necessário
  if (!process.env.CI) {
    console.log('🔧 Configurando ambiente local...');
    // Aqui você pode adicionar configurações específicas para ambiente local
  }
  
  console.log('✅ Configuração global concluída');
}

module.exports = globalSetup;
