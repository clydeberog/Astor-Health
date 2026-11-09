# Astor Health — Production Web Application

Modern, high-performance web homepage for **Astor Health** (24/7 In-Home Care Services). Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and styled with **Poppins** typography. Fully optimized for senior legibility, fast loading, mobile responsiveness, and search/answer engine visibility.

---

## Ubuntu Server Deployment Guide (via GitHub)

Follow these step-by-step instructions to clone, build, and run this application on an Ubuntu 20.04, 22.04, or 24.04 LTS server.

---

### Step 1: Prepare Your Ubuntu Server

Connect to your server via SSH:
```bash
ssh username@your-server-ip
```

Update your package repositories:
```bash
sudo apt update && sudo apt upgrade -y
```

Install Git and build tools:
```bash
sudo apt install -y git curl build-essential
```

---

### Step 2: Install Node.js (v20 LTS Recommended)

Install Node.js 20.x from the official NodeSource repository:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify the installation:
```bash
node -v   # Output should be v20.x.x or higher
npm -v    # Output should be 10.x.x or higher
```

---

### Step 3: Clone Your GitHub Repository

Clone the project from your GitHub account:
```bash
cd /var/www  # or your preferred directory, e.g. /home/ubuntu
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git astor-health
cd astor-health
```

---

### Step 4: Install Dependencies & Build

Install project dependencies:
```bash
npm install
```

Build the optimized production bundles:
```bash
npm run build
```

This compiles the TypeScript code, bundles all assets, and creates the distribution output in the `./dist` directory.

---

### Step 5: Choose Your Deployment Method

You can serve this app in production using **Option A (Nginx Static Hosting - Recommended)** or **Option B (PM2 Daemon)**.

---

#### Option A: High-Performance Nginx Web Server (Recommended)

Nginx serves the pre-rendered static assets directly with high speed, low RAM usage, and built-in gzip compression.

1. **Install Nginx**:
   ```bash
   sudo apt install -y nginx
   ```

2. **Create the Nginx site configuration**:
   ```bash
   sudo nano /etc/nginx/sites-available/astor-health
   ```

3. **Paste the following configuration** (replace `yourdomain.com` and `/var/www/astor-health` with your actual domain and path):
   ```nginx
   server {
       listen 80;
       listen [::]:80;
       server_name yourdomain.com www.yourdomain.com;

       root /var/www/astor-health/dist;
       index index.html;

       # Gzip Compression
       gzip on;
       gzip_vary on;
       gzip_min_length 1024;
       gzip_proxied expired no-cache no-store private auth;
       gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript image/svg+xml;

       # SPA Routing: Fall back to index.html for client-side routing
       location / {
           try_files $uri $uri/ /index.html;
       }

       # Cache static assets
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2|woff)$ {
           expires 1y;
           add_header Cache-Control "public, no-transform";
       }

       error_page 404 /index.html;
   }
   ```

4. **Enable the site and restart Nginx**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/astor-health /etc/nginx/sites-enabled/
   sudo rm -f /etc/nginx/sites-enabled/default
   sudo nginx -t
   sudo systemctl restart nginx
   ```

---

#### Option B: Running with PM2 Process Manager

If you prefer to run the Node/Vite server daemonized in the background:

1. **Install PM2 globally**:
   ```bash
   sudo npm install -g pm2
   ```

2. **Start the production preview server on port 3000**:
   ```bash
   pm2 start npm --name "astor-health" -- run start
   ```

3. **Configure PM2 to restart automatically on server reboots**:
   ```bash
   pm2 startup
   # Copy and run the command provided in the output, then save:
   pm2 save
   ```

4. **Reverse-proxy port 3000 in Nginx**:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

### Step 6: Enable Free SSL/TLS with Let's Encrypt

Secure your website with free HTTPS using Certbot:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot will automatically obtain and install the SSL certificates and configure automatic renewal.

---

### Step 7: Configure Ubuntu Firewall (UFW)

Enable the firewall and permit HTTP, HTTPS, and SSH:
```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

### Step 8: How to Deploy Updates from GitHub

Whenever you push new updates to your GitHub repository, update your Ubuntu server with:

```bash
cd /var/www/astor-health
git pull origin main
npm install
npm run build

# If using Option A (Nginx static):
sudo systemctl reload nginx

# If using Option B (PM2):
pm2 restart astor-health
```

---

## Local Development Commands

- `npm run dev`: Starts the Vite local development server at `http://localhost:3000`.
- `npm run build`: Compiles TypeScript and creates optimized production assets in `/dist`.
- `npm run start`: Serves the production build on port 3000.
- `npm run lint`: Verifies TypeScript types without emitting files.
