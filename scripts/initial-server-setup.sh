#!/bin/bash

# SkillQuiz Initial Server Setup Script
# This script sets up a fresh Ubuntu server for hosting the SkillQuiz application

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="skillquiz"
APP_USER="${APP_USER:-admin}"
APP_DIR="/home/$APP_USER/apps/$APP_NAME"
NODE_VERSION="18"
PM2_VERSION="latest"

echo -e "${BLUE}Starting SkillQuiz server setup...${NC}"

# Update system
echo -e "${YELLOW}Updating system packages...${NC}"
sudo apt update
sudo apt upgrade -y

# Install essential packages
echo -e "${YELLOW}Installing essential packages...${NC}"
sudo apt install -y curl git build-essential nginx certbot python3-certbot-nginx ufw fail2ban

# Install Node.js
echo -e "${YELLOW}Installing Node.js $NODE_VERSION...${NC}"
curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js installation
node_version=$(node -v)
npm_version=$(npm -v)
echo -e "${GREEN}Node.js installed: $node_version${NC}"
echo -e "${GREEN}npm installed: $npm_version${NC}"

# Install PM2
echo -e "${YELLOW}Installing PM2...${NC}"
sudo npm install -g pm2@$PM2_VERSION

# Setup PM2 startup
pm2 startup systemd -u $APP_USER --hp /home/$APP_USER
sudo systemctl enable pm2-$APP_USER

# Create application directory
echo -e "${YELLOW}Creating application directory...${NC}"
mkdir -p $APP_DIR
cd $APP_DIR

# Clone repository (if not already cloned)
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}Cloning repository...${NC}"
    git clone https://github.com/yourusername/skillquiz.git .
fi

# Install dependencies
echo -e "${YELLOW}Installing application dependencies...${NC}"
npm ci --production=false

# Build application
echo -e "${YELLOW}Building application...${NC}"
npm run build

# Setup Nginx
echo -e "${YELLOW}Setting up Nginx...${NC}"
sudo cp deploy/nginx/skillquiz.conf /etc/nginx/sites-available/
sudo ln -sf /etc/nginx/sites-available/skillquiz.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Setup firewall
echo -e "${YELLOW}Configuring firewall...${NC}"
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Setup fail2ban
echo -e "${YELLOW}Configuring fail2ban...${NC}"
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Create .env file
echo -e "${YELLOW}Creating environment configuration...${NC}"
if [ ! -f ".env" ]; then
    cp .env.production.example .env
    echo -e "${YELLOW}Please edit .env file with your configuration${NC}"
fi

# Setup SSL certificate
echo -e "${YELLOW}Setting up SSL certificate...${NC}"
echo -e "${YELLOW}Run the following command to obtain SSL certificate:${NC}"
echo -e "${BLUE}sudo certbot --nginx -d skillquiz.ru -d www.skillquiz.ru${NC}"

# Create logs directory
mkdir -p logs

# Start application with PM2
echo -e "${YELLOW}Starting application with PM2...${NC}"
pm2 start ecosystem.config.js
pm2 save

# Setup log rotation
echo -e "${YELLOW}Setting up log rotation...${NC}"
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress false

# Create backup script
echo -e "${YELLOW}Creating backup script...${NC}"
cat > ~/backup-skillquiz.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/$USER/backups"
mkdir -p $BACKUP_DIR
DATE=$(date +%Y%m%d-%H%M%S)
tar -czf $BACKUP_DIR/skillquiz-backup-$DATE.tar.gz -C /home/$USER/apps skillquiz
find $BACKUP_DIR -name "skillquiz-backup-*.tar.gz" -mtime +7 -delete
EOF
chmod +x ~/backup-skillquiz.sh

# Add backup to crontab
(crontab -l 2>/dev/null; echo "0 2 * * * ~/backup-skillquiz.sh") | crontab -

# System monitoring
echo -e "${YELLOW}Setting up system monitoring...${NC}"
pm2 install pm2-server-monit

# Final checks
echo -e "${YELLOW}Running final checks...${NC}"
pm2 status
sudo nginx -t
sudo systemctl status nginx

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Server setup completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Edit .env file with your configuration"
echo -e "2. Setup SSL certificate with: sudo certbot --nginx -d skillquiz.ru -d www.skillquiz.ru"
echo -e "3. Configure GitHub secrets for CI/CD"
echo -e "4. Update DNS records to point to this server"
echo ""
echo -e "${BLUE}Application URL: http://skillquiz.ru:3002${NC}"
echo -e "${BLUE}PM2 monitoring: pm2 monit${NC}"
echo -e "${BLUE}PM2 logs: pm2 logs${NC}"
echo ""