#!/bin/bash

# Court Data Fetcher Startup Script
echo "🚀 Starting Court Data Fetcher & Mini-Dashboard"
echo "=============================================="

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if pip is installed
if ! command -v pip &> /dev/null; then
    echo "❌ pip is not installed. Please install pip."
    exit 1
fi

echo "📦 Installing dependencies..."
pip install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies. Please check requirements.txt"
    exit 1
fi

echo "✅ Dependencies installed successfully!"
echo ""
echo "🗄️ Initializing database..."
echo "📊 Starting Flask application..."
echo ""
echo "🌐 Application will be available at:"
echo "   http://localhost:5000"
echo ""
echo "🔍 Features available:"
echo "   • Real-time court data scraping"
echo "   • Delhi High Court & Faridabad District Court"
echo "   • Case search with PDF downloads"
echo "   • Search history and database storage"
echo ""
echo "⏹️ Press Ctrl+C to stop the application"
echo "=============================================="
echo ""

# Start the Flask application
python app.py
