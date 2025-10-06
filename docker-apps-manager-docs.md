# Docker Apps Manager - User Guide

## Description

`docker-apps-manager.sh` - script for managing Docker containers of web applications on the server.

## Managed Applications

- **pixeltool** - PixelTool (pixel-tool.ru) - port 3000
- **nabor-slova** - Nabor Slova (naborslova.ru) - port 3001
- **skillquiz** - SkillQuiz (skillquiz.ru) - port 3002

## Usage

```bash
~/docker-apps-manager.sh <command> [container-name]
```

## Available Commands

### 1. status

Show status of all containers

```bash
~/docker-apps-manager.sh status
```

Displays a table with container names, their status and ports.

### 2. logs

View container logs

```bash
# View logs of specific container
~/docker-apps-manager.sh logs pixeltool
~/docker-apps-manager.sh logs nabor-slova
~/docker-apps-manager.sh logs skillquiz
```

Shows last 50 lines of logs and follows new entries (Ctrl+C to exit).

### 3. restart

Restart containers

```bash
# Restart all containers
~/docker-apps-manager.sh restart

# Restart specific container
~/docker-apps-manager.sh restart pixeltool
```

### 4. stop

Stop containers

```bash
# Stop all containers
~/docker-apps-manager.sh stop

# Stop specific container
~/docker-apps-manager.sh stop skillquiz
```

### 5. start

Start containers

```bash
# Start all containers
~/docker-apps-manager.sh start

# Start specific container
~/docker-apps-manager.sh start nabor-slova
```

## Usage Examples

### Daily Check

```bash
# Check status of all applications
~/docker-apps-manager.sh status
```

### When Application Has Issues

```bash
# 1. Check logs of problematic application
~/docker-apps-manager.sh logs skillquiz

# 2. Restart application
~/docker-apps-manager.sh restart skillquiz

# 3. Check status after restart
~/docker-apps-manager.sh status
```

### Planned Maintenance

```bash
# 1. Stop all applications
~/docker-apps-manager.sh stop

# 2. Perform necessary maintenance
# ...

# 3. Start all applications
~/docker-apps-manager.sh start

# 4. Check status
~/docker-apps-manager.sh status
```

### Application Update

```bash
# Example of updating PixelTool

# 1. Stop container
~/docker-apps-manager.sh stop pixeltool

# 2. Remove old container
sudo docker rm pixeltool

# 3. Pull new image
sudo docker pull ghcr.io/goosen-x/pixeltool:latest

# 4. Run new container
sudo docker run -d \
  --name pixeltool \
  --restart=unless-stopped \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_SITE_URL=https://pixel-tool.ru \
  ghcr.io/goosen-x/pixeltool:latest

# 5. Check status
~/docker-apps-manager.sh status
```

## Additional Docker Commands

### View Resource Usage

```bash
# CPU and memory usage statistics
sudo docker stats

# Statistics for specific container
sudo docker stats skillquiz
```

### Enter Container

```bash
# Enter container for debugging
sudo docker exec -it pixeltool sh
```

### View Container Configuration

```bash
# Detailed container information
sudo docker inspect nabor-slova
```

## Troubleshooting

### Container Won't Start

1. Check logs: `~/docker-apps-manager.sh logs <container-name>`
2. Check if port is occupied: `sudo lsof -i :3000` (replace with needed port)
3. Check image: `sudo docker images`

### Application Unavailable

1. Check container status: `~/docker-apps-manager.sh status`
2. Check Nginx: `sudo nginx -t && sudo systemctl status nginx`
3. Check firewall: `sudo ufw status`

### Low Disk Space

```bash
# Clean unused images and containers
sudo docker system prune -a

# Check disk usage
sudo docker system df
```

## Port Mapping

- PixelTool: http://localhost:3000
- Nabor Slova: http://localhost:3001
- SkillQuiz: http://localhost:3002

## Automatic Startup

All containers are configured with `--restart=unless-stopped` parameter, which means:

- Automatic restart on crash
- Automatic start on server reboot
- NO start if manually stopped

---

_Last updated: September 30, 2025_
