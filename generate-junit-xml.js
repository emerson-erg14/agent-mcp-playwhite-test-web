const fs = require('fs');
const path = require('path');

// Função para gerar XML JUnit a partir dos resultados JSON do Playwright
function generateJUnitXML(testResults) {
  const timestamp = new Date().toISOString();
  const totalTests = testResults.stats.expected + testResults.stats.unexpected;
  const failures = testResults.stats.unexpected;
  const skipped = testResults.stats.skipped;
  const time = (testResults.stats.duration / 1000).toFixed(3);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="NEMESYS Tests" tests="${totalTests}" failures="${failures}" skipped="${skipped}" time="${time}" timestamp="${timestamp}">`;

  // Processar cada suite de testes
  testResults.suites.forEach(suite => {
    if (suite.suites && suite.suites.length > 0) {
      suite.suites.forEach(testSuite => {
        const suiteName = testSuite.title.replace(/[^a-zA-Z0-9]/g, '_');
        const suiteTime = testSuite.specs.reduce((total, spec) => {
          return total + (spec.tests[0]?.results[0]?.duration || 0);
        }, 0) / 1000;

        xml += `
  <testsuite name="${suiteName}" tests="${testSuite.specs.length}" failures="0" skipped="0" time="${suiteTime.toFixed(3)}" timestamp="${timestamp}">`;

        testSuite.specs.forEach(spec => {
          const testName = spec.title.replace(/[^a-zA-Z0-9]/g, '_');
          const testResult = spec.tests[0]?.results[0];
          const testTime = (testResult?.duration || 0) / 1000;
          const status = testResult?.status || 'unknown';

          xml += `
    <testcase name="${testName}" classname="${suiteName}" time="${testTime.toFixed(3)}">`;

          if (status === 'failed') {
            xml += `
      <failure message="Test failed">
        ${testResult.errors.map(error => error.message).join('\n')}
      </failure>`;
          } else if (status === 'skipped') {
            xml += `
      <skipped/>`;
          }

          xml += `
    </testcase>`;
        });

        xml += `
  </testsuite>`;
      });
    }
  });

  xml += `
</testsuites>`;

  return xml;
}

// Função principal
function main() {
  try {
    // Procurar por arquivos JSON de resultados
    const testResultsDir = 'test-results';
    const jsonFiles = fs.readdirSync(testResultsDir).filter(file => file.endsWith('.json') && file !== '.last-run.json');

    if (jsonFiles.length === 0) {
      console.log('❌ Nenhum arquivo JSON de resultados encontrado');
      return;
    }

    // Processar cada arquivo JSON
    jsonFiles.forEach(jsonFile => {
      const jsonPath = path.join(testResultsDir, jsonFile);
      let jsonContent;
      
      try {
        jsonContent = fs.readFileSync(jsonPath, 'utf8');
      } catch (error) {
        console.log(`⚠️  Erro ao ler arquivo ${jsonFile}, tentando com codificação diferente...`);
        jsonContent = fs.readFileSync(jsonPath, 'utf16le');
      }
      
      // Limpar caracteres de controle que podem estar no início do arquivo
      jsonContent = jsonContent.replace(/^[\uFEFF\u200B-\u200D\uFEFF]/, '');
      
      // Tentar encontrar o início do JSON válido
      const jsonStart = jsonContent.indexOf('{');
      if (jsonStart > 0) {
        jsonContent = jsonContent.substring(jsonStart);
      }
      
      const testResults = JSON.parse(jsonContent);

      // Gerar XML JUnit
      const xmlContent = generateJUnitXML(testResults);
      
      // Salvar arquivo XML
      const xmlFileName = jsonFile.replace('.json', '.xml');
      const xmlPath = path.join(testResultsDir, xmlFileName);
      fs.writeFileSync(xmlPath, xmlContent, 'utf8');
      
      console.log(`✅ Arquivo XML gerado: ${xmlPath}`);
    });

    console.log('🎉 Conversão para JUnit XML concluída!');
  } catch (error) {
    console.error('❌ Erro ao gerar XML JUnit:', error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { generateJUnitXML };
