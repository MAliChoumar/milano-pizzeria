module.exports = {
  apps: [
    {
      name: 'milano',
      cwd: 'C:\\Users\\choum\\Downloads\\milano-pizzeria-complete',
      script: 'C:\\Program Files\\nodejs\\node.exe',
      args: [
        'C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js',
        'run',
        'start',
        '--',
        '-p',
        '3001'
      ],
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};