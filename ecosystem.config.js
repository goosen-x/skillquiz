module.exports = {
  apps: [
    {
      name: 'skillquiz',
      script: 'npm',
      args: 'start',
      cwd: '/home/admin/apps/skillquiz',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      max_memory_restart: '1G',
      listen_timeout: 3000,
      kill_timeout: 5000,
      autorestart: true,
      restart_delay: 1000,
      min_uptime: '10s',
      max_restarts: 10,
    },
  ],
};
