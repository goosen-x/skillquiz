#!/bin/bash

# SkillQuiz Deployment Script
# Usage: ./deploy.sh

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DEPLOY_HOST="${DEPLOY_HOST:-your-server-ip}"
DEPLOY_USER="${DEPLOY_USER:-admin}"
DEPLOY_PORT="${DEPLOY_PORT:-22}"
APP_DIR="/home/admin/apps/skillquiz"

echo -e "${YELLOW}Starting SkillQuiz deployment...${NC}"

# Check if environment variables are set
if [ "$DEPLOY_HOST" == "your-server-ip" ]; then
    echo -e "${RED}Error: DEPLOY_HOST environment variable is not set${NC}"
    echo "Please export DEPLOY_HOST=your-server-ip"
    exit 1
fi

# Run pre-deployment checks
echo -e "${YELLOW}Running pre-deployment checks...${NC}"

# Type check
echo "Running type check..."
npm run typecheck
if [ $? -ne 0 ]; then
    echo -e "${RED}Type check failed! Fix errors before deploying.${NC}"
    exit 1
fi

# Lint check
echo "Running linter..."
npm run lint
if [ $? -ne 0 ]; then
    echo -e "${RED}Linting failed! Fix errors before deploying.${NC}"
    exit 1
fi

# Build the application
echo -e "${YELLOW}Building application...${NC}"
NODE_ENV=production npm run build:production
if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed!${NC}"
    exit 1
fi

# Create deployment package
echo -e "${YELLOW}Creating deployment package...${NC}"
rm -rf deployment.tar.gz

# Create archive with all necessary files
tar -czf deployment.tar.gz \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=.env.local \
  --exclude=deployment.tar.gz \
  --exclude=.next/cache \
  .

echo -e "${GREEN}Deployment package created successfully!${NC}"

# Upload to server
echo -e "${YELLOW}Uploading to server...${NC}"
scp -P $DEPLOY_PORT deployment.tar.gz $DEPLOY_USER@$DEPLOY_HOST:/tmp/

# Execute deployment on server
echo -e "${YELLOW}Executing deployment on server...${NC}"
ssh -p $DEPLOY_PORT $DEPLOY_USER@$DEPLOY_HOST << 'EOF'
set -e

# Stop current application
echo "Stopping current application..."
cd /home/admin/apps/skillquiz 2>/dev/null && pm2 stop skillquiz || true

# Backup current version
if [ -d "/home/admin/apps/skillquiz" ]; then
    echo "Creating backup..."
    mv /home/admin/apps/skillquiz /home/admin/apps/skillquiz-backup-$(date +%Y%m%d-%H%M%S)
fi

# Create app directory
mkdir -p /home/admin/apps/skillquiz

# Extract new deployment
echo "Extracting new deployment..."
cd /home/admin/apps/skillquiz
tar -xzf /tmp/deployment.tar.gz
rm -f /tmp/deployment.tar.gz

# Create logs directory
mkdir -p logs

# Install dependencies
echo "Installing dependencies..."
npm ci --production

# Environment variables should be in the project already

# Start application with PM2
echo "Starting application..."
pm2 start ecosystem.config.js --update-env
pm2 save

# Health check
echo "Performing health check..."
sleep 10
if curl -f http://localhost:3002 > /dev/null 2>&1; then
    echo "Health check passed!"
else
    echo "Health check failed!"
    pm2 logs skillquiz --lines 50
    exit 1
fi

echo "Deployment completed successfully!"
EOF

# Cleanup local files
rm -f deployment.tar.gz

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Deployment completed successfully!${NC}"
    echo -e "${GREEN}Application is running at: http://$DEPLOY_HOST:3002${NC}"
else
    echo -e "${RED}Deployment failed!${NC}"
    exit 1
fi