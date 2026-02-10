const http = require('http');

function postRequest(path, data) {
      const dataString = JSON.stringify(data);
      const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json',
                  'Content-Length': dataString.length
            }
      };

      const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                  console.log(`Response from ${path}: ${res.statusCode}`);
                  console.log(body);
            });
      });

      req.on('error', (e) => {
            console.error(`Problem with request to ${path}: ${e.message}`);
      });

      req.write(dataString);
      req.end();
}

// Test Register
postRequest('/api/auth/register', {
      name: "Admin Tester",
      email: "admin_test@simjs.com",
      password: "securepassword123",
      role: "admin"
});

// Test Login (Wait a bit to ensure register finishes first - simplified here, just firing both)
setTimeout(() => {
      postRequest('/api/auth/login', {
            email: "admin_test@simjs.com",
            password: "securepassword123"
      });
}, 1000);
