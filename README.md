# Playwright MCP - Projeto NEMESYS

Este projeto combina Playwright com MCP (Model Context Protocol) para automação de testes no sistema NEMESYS da Nossa Fintech.

## 🚀 Configuração

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
# Instalar dependências
npm install

# Instalar navegadores do Playwright
npm run install:browsers

# Configurar variáveis de ambiente
cp .env.example .env
# Editar o arquivo .env com suas credenciais
```

## 🔐 Configuração de Variáveis de Ambiente

### **1. Copie o arquivo de exemplo:**
```bash
cp .env.example .env
```

### **2. Edite o arquivo `.env` com suas credenciais:**
```env
# Ambiente atual (HML ou PROD)
ENVIRONMENT=HML

# URLs dos ambientes
NEMESYS_URL_HML=https://nemesys.hml.nossafintech.com.br
NEMESYS_URL_PROD=https://nemesys.nossafintech.com.br

# Credenciais HML
NEMESYS_USER_HML=seu_usuario_hml
NEMESYS_PASSWORD_HML=sua_senha_hml

# Credenciais PROD
NEMESYS_USER_PROD=seu_usuario_prod
NEMESYS_PASSWORD_PROD=sua_senha_prod
```

### **3. ⚠️ IMPORTANTE:** 
- O arquivo `.env` está no `.gitignore` e **NÃO será commitado** para o repositório
- Isso protege suas credenciais sensíveis
- Use o arquivo `.env.example` como modelo

### **4. Para alternar entre ambientes:**
```bash
# Editar ENVIRONMENT no arquivo .env
ENVIRONMENT=HML  # ou PROD

# Ou definir via linha de comando
ENVIRONMENT=PROD npm test
```

## 🧪 Executando Testes

### Comandos Disponíveis

```bash
# Executar todos os testes
npm test

# Executar testes com interface visual
npm run test:ui

# Executar testes em modo debug
npm run test:debug

# Executar testes com navegador visível
npm run test:headed

# Ver relatório de testes
npm run test:report

# Executar servidor MCP
npm run mcp:start

# Explorar site Angular e executar testes de segurança
npm run mcp:explore

# Gerar testes baseados na exploração
npm run mcp:generate

# Processo completo: explorar + gerar + executar testes
npm run mcp:run

# Executar testes BDD baseados em instruções
npm run mcp:bdd

# Testar configurações de geolocalização
npm run test:geolocation

# Executar MCP e interface de testes simultaneamente
npm run dev
```

### Testes Específicos

```bash
# Executar apenas testes de autenticação
npx playwright test tests/nemesys-auth.spec.js

# Executar apenas testes MCP
npx playwright test tests/nemesys-mcp.spec.js

# Executar apenas testes BDD e MCP
npx playwright test tests/nemesys-bdd-mcp.spec.js

# Executar apenas testes gerados automaticamente
npx playwright test tests/auto-generated-tests.spec.js

# Executar em ambiente específico
NODE_ENV=prod npx playwright test
```

## 📁 Estrutura do Projeto

```
playwright-mcp/
├── config.js                 # Configurações do projeto
├── global-setup.js           # Setup global dos testes
├── mcp-server.js             # Servidor MCP
├── playwright.config.js      # Configuração do Playwright
├── package.json              # Dependências e scripts
├── tests/                    # Testes
│   ├── nemesys-auth.spec.js      # Testes de autenticação
│   ├── nemesys-mcp.spec.js       # Testes com MCP
│   ├── nemesys-bdd-mcp.spec.js   # Testes BDD e MCP
│   └── auto-generated-tests.spec.js # Testes gerados automaticamente
├── screenshots/              # Screenshots dos testes
├── test-results/             # Relatórios de teste
└── README.md                 # Este arquivo
```

## 🌍 Configurações de Geolocalização

O projeto inclui configurações específicas para simular usuários brasileiros e contornar as restrições geográficas do NEMESYS:

- **Coordenadas**: São Paulo (-23.5505, -46.6333)
- **Fuso horário**: America/Sao_Paulo
- **Idioma**: pt-BR
- **User Agent**: Chrome Windows brasileiro
- **Permissões**: Geolocalização habilitada

### Teste de Geolocalização
```bash
npm run test:geolocation
```

Este comando verifica se as configurações estão funcionando e se os campos de login estão habilitados.

## 🤖 Geração Automática de Testes MCP

O sistema MCP agora inclui um gerador automático de cenários de teste que:

### 🔍 **Análise Automática do Site**
- Explora automaticamente o site NEMESYS
- Identifica formulários, botões, links e campos de entrada
- Mapeia a estrutura de navegação
- Gera relatórios detalhados da análise

### 🧪 **Geração de Cenários de Teste**
- **Navegação**: Testa links e navegação entre páginas
- **Formulários**: Testa preenchimento e submissão de formulários
- **Botões**: Testa interações com botões
- **Campos de Entrada**: Testa validação de campos
- **Responsividade**: Testa diferentes resoluções de tela

### 🚀 **Execução de Testes**
- **Testes Contínuos**: Executa todos os cenários em sequência
- **Testes Individuais**: Cada teste abre e fecha o navegador isoladamente
- **Screenshots Automáticos**: Captura evidências de cada passo
- **Relatórios Detalhados**: Gera relatórios JSON com resultados

## 🎯 **Exploração Abrangente Avançada**

### 🔍 **Explorador Avançado MCP**
- **Mapeamento Completo**: Explora todas as funcionalidades do site após login
- **Análise de Menus**: Testa todos os menus e links de navegação
- **Validação de Formulários**: Testa formulários com dados aleatórios brasileiros
- **Detecção de Mensagens**: Identifica mensagens de sucesso, erro e aviso
- **Análise de Modais**: Detecta e testa modais e popups
- **Dados Aleatórios**: Usa dados brasileiros realistas (CPF, telefones, endereços)

## ⚡ **Exploração Específica para Angular com Segurança**

### 🔍 **Explorador MCP Otimizado**
- **Detecção Angular**: Identifica automaticamente sites Angular
- **Menu Lateral**: Explora especificamente menus laterais Angular
- **Navegação SPA**: Testa navegação em Single Page Applications
- **Formulários Angular**: Testa formulários reativos e template-driven
- **Rotas Angular**: Detecta e testa rotas Angular
- **Componentes**: Identifica componentes Angular
- **Aguarda Angular**: Aguarda o framework Angular carregar completamente
- **Relatórios HTML/XML**: Gera relatórios para Azure DevOps
- **Sistema BDD**: Executa testes baseados em instruções em linguagem natural
- **Pipeline Azure**: Executa testes em HML e PROD com relatórios consolidados

### 🧪 **Cenários de Teste**
- **Navegação Menu Lateral**: Testa todos os itens do menu lateral
- **Formulários Angular**: Testa formulários abertos pelos menus
- **Submenus**: Testa navegação por submenus
- **Mensagens Angular**: Testa mensagens e notificações do Angular
- **Rotas Angular**: Testa navegação por rotas Angular

### 🧪 **Cenários Abrangentes Gerados**
- **Navegação Completa**: Testa todos os menus e links
- **Validação de Formulários**: Testa com dados válidos e inválidos
- **Campos Obrigatórios**: Testa validação de campos obrigatórios
- **Mensagens do Sistema**: Testa exibição de mensagens
- **Modais e Popups**: Testa abertura e fechamento de modais
- **Responsividade**: Testa em 4 resoluções diferentes

### 📊 **Dados de Teste Realistas**
- **Nomes**: Nomes brasileiros comuns
- **Emails**: Emails válidos brasileiros
- **Telefones**: Números de telefone brasileiros
- **CPF**: CPFs válidos para teste
- **Endereços**: Endereços brasileiros
- **Empresas**: Nomes de empresas brasileiras

## 🔍 Funcionalidades MCP

O servidor MCP oferece as seguintes ferramentas:

- **navigate_to_url**: Navega para uma URL específica
- **click_element**: Clica em um elemento da página
- **fill_input**: Preenche um campo de input
- **get_page_content**: Obtém o conteúdo da página atual
- **take_screenshot**: Tira uma screenshot da página
- **wait_for_element**: Aguarda um elemento aparecer na página

## 🎯 Testes Implementados

### 1. Testes de Autenticação (`nemesys-auth.spec.js`)
- ✅ Login com credenciais válidas
- ✅ Teste de credenciais inválidas
- ✅ Navegação após login
- ✅ Verificação de elementos do dashboard

### 2. Testes MCP (`nemesys-mcp.spec.js`)
- ✅ Automação via comandos MCP
- ✅ Teste de funcionalidades específicas
- ✅ Geração de relatórios de teste
- ✅ Screenshots automáticos

### 3. Testes BDD e MCP (`nemesys-bdd-mcp.spec.js`)
- ✅ Cenários BDD organizados e flexíveis
- ✅ Comandos MCP reutilizáveis
- ✅ 10 cenários de teste pré-definidos
- ✅ Funções auxiliares para login e navegação
- ✅ Testes de formulários, botões, tabelas e responsividade
- ✅ Validação de campos obrigatórios
- ✅ Teste de mensagens e notificações
- ✅ Teste de modais e popups

### 4. Testes Gerados Automaticamente (`auto-generated-tests.spec.js`)
- ✅ Exploração específica para sites Angular
- ✅ Testes de menu lateral Angular
- ✅ Navegação SPA (Single Page Application)
- ✅ Testes de formulários Angular
- ✅ Testes de submenus Angular
- ✅ Testes de mensagens Angular
- ✅ Testes de rotas Angular
- ✅ Aguarda framework Angular carregar

## 🎭 **Sistema BDD (Behavior Driven Development)**

### 📋 **Instruções BDD**
O sistema MCP suporta execução de testes baseados em instruções em linguagem natural:

```bash
# Executar testes BDD
npm run mcp:bdd
```

### 📝 **Formato das Instruções**
As instruções são definidas no arquivo `bdd-instructions.txt`:

```
# Navegação
CLICK: .sidebar-menu-item:Usuários
CLICK: .submenu-item:Cadastrar Usuário
WAIT: 2000

# Formulários
FILL: input[name="nome"]:João Silva
FILL: input[name="email"]:joao@email.com
SELECT: select[name="cargo"]:Administrador
CLICK: button[type="submit"]

# Validações
VERIFY: .success-message:Usuário cadastrado com sucesso
VERIFY: .error-message
VERIFY: input[name="email"]:invalid


# Screenshots
SCREENSHOT: usuario-cadastrado.png
```

### 🎯 **Ações Suportadas**
- **CLICK**: Clicar em elementos
- **FILL**: Preencher campos
- **SELECT**: Selecionar opções
- **CHECK**: Marcar/desmarcar checkboxes
- **VERIFY**: Verificar estados ou textos
- **NAVIGATE**: Navegar para URLs
- **REFRESH**: Recarregar página
- **BACK/FORWARD**: Navegação do browser
- **WAIT**: Aguardar tempo específico
- **WAIT_FOR**: Aguardar elementos aparecerem/desaparecerem
- **SCREENSHOT**: Capturar screenshots

## 🚀 **Pipeline Azure DevOps**

### 📋 **Configuração da Pipeline**
A pipeline está configurada em um único arquivo:

- **`azure-pipelines.yml`**: Pipeline COMPLETA que executa TODOS os testes

#### **🎯 Pipeline Completa:**
- ✅ **Variáveis já configuradas** no arquivo
- ✅ **Não precisa configurar** variáveis na Azure DevOps
- ✅ **Executa TODOS os testes** em uma única pipeline:
  - Testes HML
  - Testes PROD (apenas na branch main)
- ✅ **Relatórios consolidados** de todos os testes
- ✅ **Funciona imediatamente** sem configuração adicional

#### **📋 Etapas da Pipeline:**
1. **Build**: Instala dependências e prepara ambiente
2. **Testes HML**: Executa testes em ambiente de homologação
3. **Testes PROD**: Executa testes em produção (apenas na branch main)
4. **Relatórios**: Consolida todos os relatórios

### 🎯 **Etapas da Pipeline**
- ✅ **Build e Preparação**: Instala Node.js, Playwright e dependências
- ✅ **Testes HML**: Explora e testa ambiente de homologação
- ✅ **Testes PROD**: Executa testes em produção (apenas main branch)
- ✅ **Relatórios Consolidados**: Gera relatórios HTML e XML
- ✅ **Artefatos**: Disponibiliza relatórios para download

### 📊 **Relatórios na Azure**
- **HTML**: Relatórios visuais interativos
- **XML**: Relatórios JUnit para Azure DevOps
- **Screenshots**: Evidências visuais dos testes
- **Métricas**: Gráficos de cenários que passaram/falharam
- **Download**: Todos os relatórios disponíveis para download

## 📊 Relatórios

Os testes geram relatórios em múltiplos formatos:
- **HTML**: Relatório visual interativo
- **JSON**: Dados estruturados para análise
- **JUnit**: Compatível com CI/CD
- **Screenshots**: Capturas de tela automáticas

## 🔧 Configurações Avançadas

### Timeouts
- **Ação**: 30 segundos
- **Navegação**: 30 segundos
- **Elementos**: 10 segundos

### Navegadores Suportados
- Chrome/Chromium
- Firefox
- Safari/WebKit
- Edge
- Mobile Chrome
- Mobile Safari

### Modos de Execução
- **Headless**: Execução em background
- **Headed**: Com interface visual
- **Debug**: Modo de depuração
- **UI**: Interface interativa

## 🚨 Troubleshooting

### Problemas Comuns

1. **Erro de conectividade**
   - Verifique se a URL do NEMESYS está acessível
   - Confirme as credenciais no `config.js`

2. **Campos de login desabilitados**
   - Execute `npm run test:geolocation` para verificar a geolocalização
   - Verifique se as configurações de geolocalização estão corretas
   - O site pode ter mudado as verificações de localização

3. **Elementos não encontrados**
   - Os testes usam múltiplos seletores para maior compatibilidade
   - Verifique se a estrutura da página mudou

4. **Timeout nos testes**
   - Aumente os timeouts no `playwright.config.js`
   - Verifique a velocidade da conexão

### Logs e Debug
```bash
# Executar com logs detalhados
DEBUG=pw:api npm test

# Executar em modo debug
npm run test:debug
```

## 📝 Contribuição

Para adicionar novos testes:

1. Crie um novo arquivo em `tests/`
2. Use o padrão `*.spec.js`
3. Importe as configurações do `config.js`
4. Siga os padrões de nomenclatura existentes

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 🆘 Suporte

Para dúvidas ou problemas:
1. Verifique os logs de erro
2. Consulte a documentação do Playwright
3. Verifique as configurações do NEMESYS
4. Entre em contato com a equipe de desenvolvimento
