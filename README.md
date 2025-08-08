Vulnerable Demo App

This is a deliberately vulnerable Node.js app for DevSecOps training.

## Run locally
```bash
docker build -t vuln-demo .
docker run -p 3000:3000 vuln-demo
