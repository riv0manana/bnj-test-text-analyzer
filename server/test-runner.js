const { glob } = require('glob');
const { spawn } = require('child_process');

async function runTests() {
  const files = await glob('src/**/*.spec.ts');
  
  if (files.length === 0) {
    console.log('No test files found.');
    process.exit(0);
  }

  console.log(`Running tests: ${files.join(', ')}`);

  const child = spawn('npx', ['tsx', '--test', ...files], { 
    stdio: 'inherit',
    shell: true 
  });

  child.on('exit', (code) => {
    process.exit(code);
  });
}

runTests();
