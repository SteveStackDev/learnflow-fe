#!/bin/bash

# Compile
g++ /app/source.cpp -O2 -std=c++17 -o /app/main 2>/app/compile_error.txt

if [ $? -ne 0 ]; then
    echo "CE"
    cat /app/compile_error.txt
    exit 10
fi

# Measure execution time
START=$(date +%s%N)

timeout 2s /app/main < /app/input.txt > /app/output.txt 2>/app/runtime_error.txt

EXIT_CODE=$?

END=$(date +%s%N)

ELAPSED_NS=$((END - START))
ELAPSED_MS=$((ELAPSED_NS / 1000000))

# TLE
if [ $EXIT_CODE -eq 124 ]; then
    echo "TLE|${ELAPSED_MS}"
    exit 11
fi

# Runtime Error
if [ $EXIT_CODE -ne 0 ]; then
    echo "RE|${ELAPSED_MS}"
    cat /app/runtime_error.txt
    exit 12
fi

# Compare output
if diff -Z -B /app/output.txt /app/expected.txt > /dev/null; then
    echo "AC|${ELAPSED_MS}"
    exit 0
else
    echo "WA|${ELAPSED_MS}"
    exit 1
fi