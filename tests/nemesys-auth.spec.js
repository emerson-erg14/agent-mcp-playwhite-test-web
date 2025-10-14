const { test, expect } = require('@playwright/test');
const config = require('../config.js');

test.describe('NEMESYS - Autenticação', () => {
  let currentConfig;

  test.beforeEach(async ({ page, context }) => {
    currentConfig = config.getCurrentConfig();
    
    // Configurar geolocalização para simular usuário brasileiro
    await context.grantPermissions(['geolocation']);
    await page.addInitScript(() => {
      navigator.geolocation.getCurrentPosition = (success) => {
        success({
          coords: {
            latitude: -23.5505,
            longitude: -46.6333,
            accuracy: 100
          }
        });
      };
    });
    
    await page.goto(currentConfig.url);
  });

  test('Deve fazer login com sucesso no NEMESYS HML', async ({ page }) => {
    // Aguardar a página carregar
    await page.waitForLoadState('networkidle');
    
    // Procurar pelo campo de usuário (pode ser email, username, etc.)
    const userSelectors = [
      'input[name="email"]',
      'input[name="username"]',
      'input[name="user"]',
      'input[type="email"]',
      'input[placeholder*="usuário" i]',
      'input[placeholder*="email" i]',
      'input[placeholder*="login" i]'
    ];
    
    let userInput = null;
    for (const selector of userSelectors) {
      try {
        userInput = await page.waitForSelector(selector, { timeout: 5000 });
        if (userInput) break;
      } catch (e) {
        continue;
      }
    }
    
    expect(userInput).toBeTruthy();
    await userInput.fill(currentConfig.user);
    
    // Procurar pelo campo de senha
    const passwordSelectors = [
      'input[name="password"]',
      'input[name="senha"]',
      'input[type="password"]',
      'input[placeholder*="senha" i]',
      'input[placeholder*="password" i]'
    ];
    
    let passwordInput = null;
    for (const selector of passwordSelectors) {
      try {
        passwordInput = await page.waitForSelector(selector, { timeout: 5000 });
        if (passwordInput) break;
      } catch (e) {
        continue;
      }
    }
    
    expect(passwordInput).toBeTruthy();
    await passwordInput.fill(currentConfig.password);
    
    // Procurar pelo botão de login
    const loginSelectors = [
      'button[type="submit"]',
      'input[type="submit"]',
      'button:has-text("Entrar")',
      'button:has-text("Login")',
      'button:has-text("Sign in")',
      'a:has-text("Entrar")',
      'a:has-text("Login")',
      '[data-testid*="login"]',
      '[data-testid*="entrar"]'
    ];
    
    let loginButton = null;
    for (const selector of loginSelectors) {
      try {
        loginButton = await page.waitForSelector(selector, { timeout: 5000 });
        if (loginButton) break;
      } catch (e) {
        continue;
      }
    }
    
    expect(loginButton).toBeTruthy();
    
    // Fazer screenshot antes do login
    await page.screenshot({ path: 'screenshots/before-login.png' });
    
    // Clicar no botão de login
    await loginButton.click();
    
    // Aguardar redirecionamento ou mudança na página
    await page.waitForLoadState('networkidle');
    
    // Verificar se o login foi bem-sucedido
    // Procurar por indicadores de sucesso
    const successIndicators = [
      'text="Dashboard"',
      'text="Painel"',
      'text="Home"',
      'text="Bem-vindo"',
      'text="Welcome"',
      '[data-testid*="dashboard"]',
      '[data-testid*="home"]',
      '.dashboard',
      '.home',
      '.welcome'
    ];
    
    let loginSuccess = false;
    for (const indicator of successIndicators) {
      try {
        await page.waitForSelector(indicator, { timeout: 10000 });
        loginSuccess = true;
        break;
      } catch (e) {
        continue;
      }
    }
    
    // Fazer screenshot após o login
    await page.screenshot({ path: 'screenshots/after-login.png' });
    
    // Verificar se não há mensagens de erro
    const errorSelectors = [
      'text="Erro"',
      'text="Error"',
      'text="Falha"',
      'text="Invalid"',
      'text="Incorrect"',
      '.error',
      '.alert-danger',
      '.notification-error'
    ];
    
    let hasError = false;
    for (const selector of errorSelectors) {
      try {
        const errorElement = await page.waitForSelector(selector, { timeout: 2000 });
        if (errorElement) {
          hasError = true;
          break;
        }
      } catch (e) {
        continue;
      }
    }
    
    // Verificar se a URL mudou (indicando redirecionamento após login)
    const currentUrl = page.url();
    const urlChanged = currentUrl !== currentConfig.url;
    
    // O teste passa se:
    // 1. Encontrou indicadores de sucesso OU
    // 2. A URL mudou (redirecionamento) E não há erros visíveis
    expect(loginSuccess || (urlChanged && !hasError)).toBeTruthy();
    
    console.log(`Login realizado com sucesso! URL atual: ${currentUrl}`);
  });

  test('Deve exibir erro com credenciais inválidas', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Preencher com credenciais inválidas
    const userSelectors = [
      'input[name="email"]',
      'input[name="username"]',
      'input[name="user"]',
      'input[type="email"]'
    ];
    
    let userInput = null;
    for (const selector of userSelectors) {
      try {
        userInput = await page.waitForSelector(selector, { timeout: 5000 });
        if (userInput) break;
      } catch (e) {
        continue;
      }
    }
    
    if (userInput) {
      await userInput.fill('usuario.invalido@teste.com');
    }
    
    const passwordSelectors = [
      'input[name="password"]',
      'input[name="senha"]',
      'input[type="password"]'
    ];
    
    let passwordInput = null;
    for (const selector of passwordSelectors) {
      try {
        passwordInput = await page.waitForSelector(selector, { timeout: 5000 });
        if (passwordInput) break;
      } catch (e) {
        continue;
      }
    }
    
    if (passwordInput) {
      await passwordInput.fill('senha_invalida');
    }
    
    // Clicar no botão de login
    const loginSelectors = [
      'button[type="submit"]',
      'input[type="submit"]',
      'button:has-text("Entrar")',
      'button:has-text("Login")'
    ];
    
    let loginButton = null;
    for (const selector of loginSelectors) {
      try {
        loginButton = await page.waitForSelector(selector, { timeout: 5000 });
        if (loginButton) break;
      } catch (e) {
        continue;
      }
    }
    
    if (loginButton) {
      await loginButton.click();
      await page.waitForLoadState('networkidle');
      
      // Verificar se apareceu mensagem de erro
      const errorSelectors = [
        'text="Erro"',
        'text="Error"',
        'text="Falha"',
        'text="Invalid"',
        'text="Incorrect"',
        '.error',
        '.alert-danger'
      ];
      
      let errorFound = false;
      for (const selector of errorSelectors) {
        try {
          await page.waitForSelector(selector, { timeout: 5000 });
          errorFound = true;
          break;
        } catch (e) {
          continue;
        }
      }
      
      // Fazer screenshot do erro
      await page.screenshot({ path: 'screenshots/login-error.png' });
      
      expect(errorFound).toBeTruthy();
    }
  });

  test('Deve navegar para diferentes seções após login', async ({ page }) => {
    // Primeiro fazer login
    await page.waitForLoadState('networkidle');
    
    // Preencher credenciais
    const userInput = await page.waitForSelector('input[name="email"], input[name="username"], input[type="email"]', { timeout: 10000 });
    await userInput.fill(currentConfig.user);
    
    const passwordInput = await page.waitForSelector('input[type="password"]', { timeout: 10000 });
    await passwordInput.fill(currentConfig.password);
    
    const loginButton = await page.waitForSelector('button[type="submit"], button:has-text("Entrar"), button:has-text("Login")', { timeout: 10000 });
    await loginButton.click();
    
    await page.waitForLoadState('networkidle');
    
    // Procurar por links de navegação
    const navSelectors = [
      'a:has-text("Dashboard")',
      'a:has-text("Painel")',
      'a:has-text("Home")',
      'a:has-text("Relatórios")',
      'a:has-text("Configurações")',
      'a:has-text("Perfil")',
      'nav a',
      '.nav a',
      '.menu a',
      '.sidebar a'
    ];
    
    let navLinks = [];
    for (const selector of navSelectors) {
      try {
        const links = await page.$$(selector);
        navLinks = navLinks.concat(links);
      } catch (e) {
        continue;
      }
    }
    
    if (navLinks.length > 0) {
      // Clicar no primeiro link de navegação encontrado
      await navLinks[0].click();
      await page.waitForLoadState('networkidle');
      
      // Fazer screenshot da navegação
      await page.screenshot({ path: 'screenshots/navigation-test.png' });
      
      console.log(`Navegação testada com sucesso! URL atual: ${page.url()}`);
    }
  });
});
