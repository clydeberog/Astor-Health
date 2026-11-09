# Astor Health — Standalone Production Deployment (No Nginx Needed)

This guide shows you how to run this web application directly with Node.js on an **Ubuntu server** without needing Nginx, and configure it so it **automatically starts up whenever the server restarts or reboots**.

---

## Step 1: Update Your Repository on Your Server

```bash
cd /var/www/astor-health
git pull origin main
npm install --legacy-peer-deps
npm run build
```

---

## Step 2: Set Up Automatic Startup on Server Reboot

Choose either **Method A (PM2 - Recommended)** or **Method B (Native Ubuntu Systemd)**. Both ensure the app boots automatically on server restart.

---

### Method A: Using PM2 (Easiest & Most Popular)

PM2 is a production process manager that keeps your app running 24/7 and restarts it automatically when the server reboots.

1. **Install PM2 globally**:
   ```bash
   sudo npm install -g pm2
   ```

2. **Start the server with PM2**:
   ```bash
   cd /var/www/astor-health
   sudo pm2 start server.js --name "astor-health"
   ```

3. **Configure automatic startup on system reboot**:
   ```bash
   sudo pm2 startup
   ```
   PM2 will print a command that looks like:
   ```text
   sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u root --hp /root
   ```
   Copy and run that exact line in your terminal.

4. **Save the running process list**:
   ```bash
   sudo pm2 save
   ```

Now, whenever your Ubuntu server restarts, PM2 will automatically boot `astor-health` in the background.

#### Helpful PM2 Commands:
- Check status: `pm2 status`
- View live logs: `pm2 logs astor-health`
- Restart app: `pm2 restart astor-health`
- Stop app: `pm2 stop astor-health`

---

### Method B: Using Native Ubuntu Systemd (Built-in, No Extra Tools)

If you do not want to install PM2, you can use Ubuntu's built-in `systemd` service manager.

1. **Create the service file**:
   ```bash
   sudo nano /etc/systemd/system/astor-health.service
   ```

2. **Paste the following configuration**:
   ```ini
   [Unit]
   Description=Astor Health Web Application
   After=network.target

   [Service]
   Type=simple
   User=root
   WorkingDirectory=/var/www/astor-health
   ExecStart=/usr/bin/node /var/www/astor-health/server.js
   Restart=always
   RestartSec=5
   Environment=NODE_ENV=production
   Environment=PORT=80

   [Install]
   WantedBy=multi-user.target
   ```
   *(Save and exit with `Ctrl + O`, `Enter`, then `Ctrl + X`)*

3. **Reload systemd, enable automatic startup, and start the app**:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable astor-health
   sudo systemctl start astor-health
   ```

4. **Verify it is running**:
   ```bash
   sudo systemctl status astor-health
   ```

Because you ran `systemctl enable`, Ubuntu will automatically launch the app every time the machine powers on or reboots.

---

## Step 3: Open Port 80 in Your Firewall

If your server has the Ubuntu firewall (UFW) active, allow standard web traffic on port 80:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 22/tcp
sudo ufw reload
```

Now open your web browser and visit `http://YOUR_SERVER_IP/` — your Astor Health website will be live!

---

## How to Update the App Later

When you push new updates to GitHub:

```bash
cd /var/www/astor-health
git pull origin main
npm install --legacy-peer-deps
npm run build

# If using PM2:
pm2 restart astor-health

# If using Systemd:
sudo systemctl restart astor-health
```

---

## Setting Up with Cloudflare Tunnel (`cloudflared`)

A Cloudflare Tunnel connects your server directly to Cloudflare's edge network **without opening any inbound ports on your firewall or router**, and provides automatic HTTPS/SSL and DDoS protection.

### Method 1: Using the Cloudflare Zero Trust Dashboard (Recommended & Fastest)

1. Open the [Cloudflare Zero Trust Dashboard](https://one.dash.cloudflare.com/).
2. Navigate to **Networks** > **Tunnels** > Click **Create a Tunnel**.
3. Choose **Cloudflared** as the connector type and give it a name (e.g. `astor-health`).
4. Under **Install and run a connector**, select **Debian/Ubuntu** (64-bit).
5. Cloudflare will give you a pre-configured install command containing your tunnel token. Copy and run that command on your Ubuntu server:
   ```bash
   curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb && sudo dpkg -i cloudflared.deb && sudo cloudflared service install <YOUR_TOKEN>
   ```
   *(This installs `cloudflared` and automatically enables it as an Ubuntu system service that auto-starts on reboot).*
6. In the Cloudflare dashboard, click **Next** to configure the **Public Hostname**:
   - **Subdomain / Domain**: Enter your domain (e.g. `astorhealth.com` or `care.yourdomain.com`).
   - **Type**: Select `HTTP`.
   - **URL**: Enter `localhost:80` (or `localhost:3000` if running on port 3000).
7. Click **Save tunnel**.

Your website is now securely accessible worldwide over HTTPS with no ports opened on your firewall!

---

### Method 2: Setting Up via CLI (Command Line Only)

1. **Install cloudflared on Ubuntu**:
   ```bash
   curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
   sudo dpkg -i cloudflared.deb
   ```

2. **Authenticate with your Cloudflare account**:
   ```bash
   cloudflared tunnel login
   ```
   *(Click the URL shown in terminal to authorize your domain in Cloudflare).*

3. **Create the tunnel**:
   ```bash
   cloudflared tunnel create astor-tunnel
   ```
   Note the Tunnel ID that is generated.

4. **Create the configuration file**:
   ```bash
   sudo mkdir -p /etc/cloudflared
   sudo nano /etc/cloudflared/config.yml
   ```
   Add the following:
   ```yaml
   tunnel: <YOUR-TUNNEL-ID>
   credentials-file: /root/.cloudflared/<YOUR-TUNNEL-ID>.json

   ingress:
     - hostname: yourdomain.com
       service: http://localhost:80
     - service: http_status:404
   ```

5. **Route your DNS to the tunnel**:
   ```bash
   cloudflared tunnel route dns astor-tunnel yourdomain.com
   ```

6. **Install cloudflared as an auto-starting system service**:
   ```bash
   sudo cloudflared service install
   sudo systemctl start cloudflared
   sudo systemctl enable cloudflared
   ```

