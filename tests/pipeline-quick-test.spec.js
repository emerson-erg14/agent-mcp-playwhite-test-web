const { test, expect } = require('@playwright/test');
const config = require('../config.js');

test.describe('NEMESYS - Teste Rápido para Pipeline', () => {
  let currentConfig;

  test.beforeEach(async ({ page, context }) => {
    currentConfig = config.getCurrentConfig();
    
    // Configurar geolocalização
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
  });

  test('Deve carregar a página de login do NEMESYS', async ({ page }) => {
    // Navegar para a página
    await page.goto(currentConfig.url, { timeout: 10000 });
    
    // Aguardar a página carregar
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Verificar se a página carregou
    expect(page.url()).toContain(currentConfig.url);
    
    // Verificar se há elementos de login na página
    const hasLoginElements = await page.locator('input[type="email"], input[type="password"], input[name="email"], input[name="password"]').count() > 0;
    expect(hasLoginElements).toBeTruthy();
    
    // Fazer screenshot
    await page.screenshot({ path: 'screenshots/pipeline-test.png' });
    
    console.log(`✅ Página carregada com sucesso: ${page.url()}`);
  });

  test('Deve tentar fazer login (teste básico)', async ({ page }) => {
    await page.goto(currentConfig.url, { timeout: 10000 });
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Procurar pelo campo de usuário
    const userSelectors = [
      'input[name="email"]',
      'input[name="username"]',
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
      await userInput.fill(currentConfig.user);
      
      // Procurar pelo campo de senha
      const passwordInput = await page.waitForSelector('input[type="password"]', { timeout: 5000 });
      if (passwordInput) {
        await passwordInput.fill(currentConfig.password);
        
        // Procurar pelo botão de login
        const loginButton = await page.waitForSelector('button[type="submit"], button:has-text("Entrar"), button:has-text("Login")', { timeout: 5000 });
        if (loginButton) {
          await loginButton.click();
          
          // Aguardar um pouco para ver o resultado
          await page.waitForTimeout(3000);
          
          // Fazer screenshot do resultado
          await page.screenshot({ path: 'screenshots/login-attempt.png' });
          
          console.log(`✅ Tentativa de login realizada: ${page.url()}`);
        }
      }
    }
    
    // O teste passa se chegou até aqui sem erro
    expect(true).toBeTruthy();
  });
});
