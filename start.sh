#!/bin/bash

echo "🚀 Starting VigilXi..."

# Start Backend
cd /workspaces/VigilXi/backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &

echo "✅ Backend started"

# Start Frontend
cd /workspaces/VigilXi/frontend
npm run dev &

echo "✅ Frontend started"
echo "🎯 VigilXi is running!"
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8000"

wait
