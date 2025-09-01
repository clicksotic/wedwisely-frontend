#!/usr/bin/env node

const os = require('os');

function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  
  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (interface.family === 'IPv4' && !interface.internal) {
        return interface.address;
      }
    }
  }
  
  return '127.0.0.1'; // fallback
}

const ip = getLocalIPAddress();
console.log('\n🌐 Your local IP address is:', ip);
console.log('📝 Update config/localConfig.js with this IP address');
console.log('   LOCAL_IP: \'' + ip + '\'');
console.log('\n🔗 Your backend URL will be: http://' + ip + ':3000\n'); 