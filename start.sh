#!/bin/bash

# Ensure script stops on first error
set -e

# Function to handle errors
handle_error() {
    echo "❌ Error occurred in script at line $1"
    exit 1
}

# Set up error handling
trap 'handle_error $LINENO' ERR

echo "📦 Installing dependencies..."
npm install

echo "🗑️  Cleaning old build..."
rm -rf dist

echo "📁 Creating dist directory..."
mkdir -p dist

echo "🔨 Building TypeScript..."
npm run build

echo "🚀 Starting the application..."
npm start

echo "✅ Done!" 