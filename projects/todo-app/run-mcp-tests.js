#!/usr/bin/env node

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const TESTS = [
    { name: 'API Tests', file: 'test-mcp-apis.js' },
    { name: 'Playwright MCP', file: 'test-playwright-mcp.js' },
    { name: 'Memory MCP', file: 'test-memory-mcp.js' }
];

async function runTest(testFile) {
    return new Promise((resolve, reject) => {
        const child = spawn('node', [testFile]);
        let output = '';
        let error = '';

        child.stdout.on('data', (data) => {
            output += data.toString();
            process.stdout.write(data);
        });

        child.stderr.on('data', (data) => {
            error += data.toString();
            process.stderr.write(data);
        });

        child.on('close', (code) => {
            if (code === 0) {
                resolve({ success: true, output });
            } else {
                reject({ success: false, error });
            }
        });
    });
}

async function runAllTests() {
    console.log('╔════════════════════════════════════════════════╗');
    console.log('║   🚀 MCP SERVERS TESTING SUITE                 ║');
    console.log('║                                                ║');
    console.log('║   Available MCP Servers:                       ║');
    console.log('║   ✓ Memory - Context persistence               ║');
    console.log('║   ✓ Playwright - Browser automation            ║');
    console.log('║   ✓ Chrome DevTools - Debugging                ║');
    console.log('║   ✓ Puppeteer - Alternative automation         ║');
    console.log('╚════════════════════════════════════════════════╝\n');

    const results = [];
    let passed = 0;
    let failed = 0;

    for (const test of TESTS) {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`Running: ${test.name}`);
        console.log('='.repeat(50) + '\n');

        try {
            await runTest(test.file);
            results.push({ name: test.name, status: '✅ PASSED' });
            passed++;
        } catch (err) {
            results.push({ name: test.name, status: '❌ FAILED' });
            failed++;
            console.error(`\n❌ ${test.name} failed!`);
        }
    }

    // Print summary
    console.log(`\n\n${'='.repeat(50)}`);
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(50));

    for (const result of results) {
        console.log(`${result.status} - ${result.name}`);
    }

    console.log(`\nTotal: ${passed} passed, ${failed} failed`);
    console.log('='.repeat(50) + '\n');

    if (failed === 0) {
        console.log('🎉 All MCP server tests passed!');
        process.exit(0);
    } else {
        console.log('❌ Some tests failed!');
        process.exit(1);
    }
}

runAllTests();
