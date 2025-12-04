#!/bin/bash

# Kill ALL running instances
echo "🧹 Cleaning up all running instances..."
pkill -f "npm run dev" 2>/dev/null
pkill -f "node.*run-" 2>/dev/null
pkill -f "uvicorn" 2>/dev/null
pkill -f "concurrently" 2>/dev/null
pkill -f "next dev" 2>/dev/null
sleep 2

echo "✅ All processes killed"
echo ""

# Clear port allocation
rm -f .env 2>/dev/null
rm -f apps/web/.env.local 2>/dev/null

echo "🚀 Starting fresh instance..."
echo ""

# Start with clean state
npm run dev
