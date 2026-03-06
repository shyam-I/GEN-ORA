const fs=require('fs');
const p='c:/Users/chandrakala/OneDrive/Desktop - Copy/water management/backend/controllers/aiController.js';
console.log('file contents:\n', fs.readFileSync(p,'utf8'));
console.log('module exports:', require(p));
