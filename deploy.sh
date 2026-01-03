#!/bin/bash
# ZeroMaintenance Deployment Script
# This script deploys to multiple providers for maximum uptime

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
GITHUB_REPO="xcgar0/ZeroMaintenance"
GITLAB_REPO="xcgar0/ZeroMaintenance"  # Update this when you create GitLab repo
DOMAIN="zeromaintenance.com"

echo -e "${BLUE}🚀 ZeroMaintenance Multi-Provider Deployment${NC}"
echo -e "${BLUE}================================================${NC}"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "${YELLOW}📋 Checking prerequisites...${NC}"
if ! command_exists git; then
    echo -e "${RED}❌ Git is not installed. Please install git first.${NC}"
    exit 1
fi

if ! command_exists curl; then
    echo -e "${RED}❌ curl is not installed. Please install curl first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites OK${NC}"

# Build optimization (add your build steps here)
echo -e "${YELLOW}🔨 Building optimized version...${NC}"
# Example build commands (uncomment and modify as needed):
# npm run build
# gulp build
# Add your optimization commands here

echo -e "${GREEN}✅ Build complete${NC}"

# Deploy to GitHub Pages
echo -e "${YELLOW}📤 Deploying to GitHub Pages...${NC}"
if git remote get-url origin 2>/dev/null | grep -q github.com; then
    git add .
    git commit -m "Deploy $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
    git push origin main
    echo -e "${GREEN}✅ GitHub Pages deployment complete${NC}"
else
    echo -e "${RED}❌ GitHub remote not configured${NC}"
fi

# Deploy to GitLab Pages (if configured)
echo -e "${YELLOW}📤 Deploying to GitLab Pages...${NC}"
if git remote get-url gitlab 2>/dev/null | grep -q gitlab.com; then
    git push gitlab main
    echo -e "${GREEN}✅ GitLab Pages deployment complete${NC}"
else
    echo -e "${YELLOW}⚠️  GitLab remote not configured (skipping)${NC}"
fi

# Test deployments
echo -e "${YELLOW}🧪 Testing deployments...${NC}"

# Test GitHub Pages
if curl -s --max-time 10 "https://$GITHUB_REPO.github.io" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ GitHub Pages: UP${NC}"
else
    echo -e "${RED}❌ GitHub Pages: DOWN${NC}"
fi

# Test GitLab Pages
if curl -s --max-time 10 "https://$GITLAB_REPO.gitlab.io" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ GitLab Pages: UP${NC}"
else
    echo -e "${RED}❌ GitLab Pages: DOWN or not configured${NC}"
fi

# DNS propagation check
echo -e "${YELLOW}🌐 Checking DNS propagation...${NC}"
DNS_CHECK=$(dig +short $DOMAIN | head -1)
if [ -n "$DNS_CHECK" ]; then
    echo -e "${GREEN}✅ DNS: $DOMAIN resolves to $DNS_CHECK${NC}"
else
    echo -e "${RED}❌ DNS: $DOMAIN not resolving${NC}"
fi

echo -e "${BLUE}================================================${NC}"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo -e "${BLUE}================================================${NC}"
echo -e "📊 Status Summary:"
echo -e "   🌐 Domain: https://$DOMAIN"
echo -e "   📱 GitHub: https://$GITHUB_REPO.github.io"
echo -e "   🐧 GitLab: https://$GITLAB_REPO.gitlab.io"
echo -e ""
echo -e "${YELLOW}⏱️  DNS propagation may take 5-30 minutes${NC}"
echo -e "${YELLOW}🔍 Monitor uptime at: https://$DOMAIN${NC}"</content>
<parameter name="filePath">c:\Projects\zeromaintenence\deploy.sh