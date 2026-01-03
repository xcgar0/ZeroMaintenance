#!/bin/bash
# ZeroMaintenance Uptime Monitor
# Monitors multiple endpoints and logs status

# Configuration
DOMAIN="zeromaintenance.com"
GITHUB_REPO="xcgar0/ZeroMaintenance"
GITLAB_REPO="xcgar0/ZeroMaintenance"  # Update this when you create GitLab repo
LOG_FILE="uptime.log"
ALERT_EMAIL="contact.zeromaintenance@gmail.com"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Create log file if it doesn't exist
touch "$LOG_FILE"

echo -e "${YELLOW}🔍 ZeroMaintenance Uptime Check$(date)${NC}"
echo "==========================================" >> "$LOG_FILE"
echo "$(date): Starting uptime check" >> "$LOG_FILE"

# Function to check site
check_site() {
    local url=$1
    local name=$2

    if curl -s --max-time 10 --head "$url" | grep -q "200 OK\|301\|302"; then
        echo -e "${GREEN}✅ $name: UP${NC}"
        echo "$(date): $name - UP - $url" >> "$LOG_FILE"
        return 0
    else
        echo -e "${RED}❌ $name: DOWN${NC}"
        echo "$(date): $name - DOWN - $url" >> "$LOG_FILE"
        return 1
    fi
}

# Check all endpoints
FAILED_CHECKS=0

check_site "https://$DOMAIN" "Primary Domain" || ((FAILED_CHECKS++))
check_site "https://www.$DOMAIN" "WWW Domain" || ((FAILED_CHECKS++))
check_site "https://$GITHUB_REPO.github.io" "GitHub Pages" || ((FAILED_CHECKS++))
check_site "https://$GITLAB_REPO.gitlab.io" "GitLab Pages" || ((FAILED_CHECKS++))

# DNS check
DNS_IP=$(dig +short $DOMAIN | head -1)
if [ -n "$DNS_IP" ]; then
    echo -e "${GREEN}✅ DNS: $DOMAIN → $DNS_IP${NC}"
    echo "$(date): DNS - OK - $DOMAIN → $DNS_IP" >> "$LOG_FILE"
else
    echo -e "${RED}❌ DNS: $DOMAIN not resolving${NC}"
    echo "$(date): DNS - FAIL - $DOMAIN not resolving" >> "$LOG_FILE"
    ((FAILED_CHECKS++))
fi

# Summary
echo "==========================================" >> "$LOG_FILE"

if [ $FAILED_CHECKS -eq 0 ]; then
    echo -e "${GREEN}🎉 All systems operational!${NC}"
    echo "$(date): SUMMARY - All systems UP" >> "$LOG_FILE"
else
    echo -e "${RED}⚠️  $FAILED_CHECKS system(s) experiencing issues${NC}"
    echo "$(date): SUMMARY - $FAILED_CHECKS systems DOWN" >> "$LOG_FILE"

    # Optional: Send alert (uncomment and configure)
    # if [ -n "$ALERT_EMAIL" ]; then
    #     echo "ZeroMaintenance Alert: $FAILED_CHECKS systems down" | mail -s "Uptime Alert" "$ALERT_EMAIL"
    # fi
fi

echo -e "${BLUE}📊 Logs saved to: $LOG_FILE${NC}"
echo ""

# Show recent log entries
echo -e "${YELLOW}📋 Recent Log Entries:${NC}"
tail -10 "$LOG_FILE"</content>
<parameter name="filePath">c:\Projects\zeromaintenence\monitor.sh