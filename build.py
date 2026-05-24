#!/usr/bin/env python3
"""
Build script: assembles src/ modules into a single index.html
"""
import os, sys

BASE = os.path.dirname(os.path.abspath(__file__))
SRC  = os.path.join(BASE, 'src')
OUT  = os.path.join(BASE, 'index.html')

def read(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

template = read(os.path.join(SRC, 'index.template.html'))
css      = read(os.path.join(SRC, 'styles.css'))

js_files = [
    'audio.js',
    'sprites.js',
    'engine.js',
    'act1-brooklyn.js',
    'act2-airplane.js',
    'act3-paris.js',
    'act4-castles.js',
    'act5-bretagne.js',
    'main.js',
]

js_parts = []
for fname in js_files:
    path = os.path.join(SRC, fname)
    if os.path.exists(path):
        js_parts.append(f'\n/* ═══ {fname} ═══ */\n' + read(path))
    else:
        print(f'⚠️  Warning: {fname} not found', file=sys.stderr)

js = '\n'.join(js_parts)

output = template.replace('/* STYLES_PLACEHOLDER */', css, 1)
output = output.replace('/* SCRIPTS_PLACEHOLDER */', js, 1)

with open(OUT, 'w', encoding='utf-8') as f:
    f.write(output)

size  = os.path.getsize(OUT)
lines = output.count('\n')
print(f'✅ Built: {OUT}')
print(f'   Size:  {size // 1024} KB  ({size:,} bytes)')
print(f'   Lines: {lines:,}')
print(f'\n   Open:  file://{OUT}')
