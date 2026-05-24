#!/bin/bash
# Build script — delegates to Python for reliable multiline handling
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
python3 "$SCRIPT_DIR/build.py"
