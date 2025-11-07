#!/bin/bash

# Default to test URL
WEBHOOK_URL="${N8N_WEBHOOK_URL:-https://n8n.srv759792.hstgr.cloud/webhook-test/ebike-catalogue}"

echo "🧪 Testing n8n Webhook..."
echo "URL: $WEBHOOK_URL"
echo ""

response=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+33612345678",
    "message": "This is an automated test from the terminal"
  }')

http_code=$(echo "$response" | grep "HTTP_CODE:" | cut -d: -f2)
body=$(echo "$response" | grep -v "HTTP_CODE:")

echo "Response Code: $http_code"
echo "Response Body: $body"
echo ""

if [ "$http_code" = "200" ]; then
  echo "✅ Test PASSED - Webhook is working!"
  echo "📊 Check your Google Sheet for the test data"
else
  echo "❌ Test FAILED - HTTP $http_code"
  echo "🔍 Check n8n workflow logs for errors"
fi

