#!/bin/bash
cd server
source ../.venv/bin/activate  # Adjust path if needed to activate your virtualenv
celery -A core worker --loglevel=info