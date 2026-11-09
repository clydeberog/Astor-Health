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
