require('dotenv').config();

const config = {
  // Configurações do NEMESYS
  nemesys: {
    hml: {
      url: process.env.NEMESYS_URL_HML || 'https://nemesys.hml.nossafintech.com.br',
      user: process.env.NEMESYS_USER_HML || 'emerson.teste',
      password: process.env.NEMESYS_PASSWORD_HML || 'Fintech@2025'
    },
    prod: {
      url: process.env.NEMESYS_URL_PROD || 'https://nemesys.nossafintech.com.br',
      user: process.env.NEMESYS_USER_PROD || 'emerson.teste',
      password: process.env.NEMESYS_PASSWORD_PROD || 'Carbh@280100'
    }
  },
  
  // Configurações do Playwright
  playwright: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'https://nemesys.hml.nossafintech.com.br',
    headless: process.env.PLAYWRIGHT_HEADLESS === 'true' || false,
    slowMo: parseInt(process.env.PLAYWRIGHT_SLOW_MO) || 1000,
    timeout: 30000,
    
    // Configurações de geolocalização para simular Brasil
    geolocation: {
      latitude: parseFloat(process.env.GEOLOCATION_LATITUDE) || -23.5505,  // São Paulo
      longitude: parseFloat(process.env.GEOLOCATION_LONGITUDE) || -46.6333,
      accuracy: parseInt(process.env.GEOLOCATION_ACCURACY) || 100
    },
    
    // Configurações de contexto para simular usuário brasileiro
    context: {
      locale: process.env.LOCALE || 'pt-BR',
      timezoneId: process.env.TIMEZONE_ID || 'America/Sao_Paulo',
      userAgent: process.env.USER_AGENT || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { 
        width: parseInt(process.env.VIEWPORT_WIDTH) || 1920, 
        height: parseInt(process.env.VIEWPORT_HEIGHT) || 1080 
      },
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false
    }
  },
  
  // Ambiente atual (hml ou prod)
  environment: process.env.ENVIRONMENT || 'HML',
  
  // Função para obter configurações do ambiente atual
  getCurrentConfig() {
    const env = this.environment.toLowerCase();
    return {
      ...this.nemesys[env],
      playwright: this.playwright
    };
  }
};

module.exports = config;
