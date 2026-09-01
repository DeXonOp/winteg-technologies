# 🔧 Final VPS Nginx Optimization

Your existing Nginx config at `/etc/nginx/sites-available/wintegtechnologies` is **missing critical video and performance optimizations**. Here is the exact replacement to paste on your VPS:

## What's Missing in Your Current Config
1. ❌ No video-specific location block (no byte-range, no sendfile)  
2. ❌ No `http2` directive (missing HTTP/2 multiplexing)  
3. ❌ No `sendfile`, `tcp_nopush`, `tcp_nodelay` (slow static file I/O)  
4. ❌ No `open_file_cache` (re-reads file metadata on every request)  
5. ❌ Video files (`.mp4`) not in the cached static assets regex  

## Updated Config

> [!IMPORTANT]
> Replace the contents of `/etc/nginx/sites-available/wintegtechnologies` on your VPS with the config below. Then run `sudo nginx -t && sudo systemctl reload nginx`.

```nginx
# Rate limiting zones
limit_req_zone $binary_remote_addr zone=winteg_api:10m rate=30r/s;
limit_req_zone $binary_remote_addr zone=winteg_chat:10m rate=10r/s;

server {
    listen 443 ssl http2;
    server_name wintegtechnologies.com www.wintegtechnologies.com api.wintegtechnologies.com;

    ssl_certificate /etc/letsencrypt/live/wintegtechnologies.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/wintegtechnologies.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # ── Performance Tuning ────────────────────────────
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 30;
    client_max_body_size 10M;

    # File descriptor cache (reduces syscalls)
    open_file_cache max=1000 inactive=20s;
    open_file_cache_valid 30s;
    open_file_cache_min_uses 2;
    open_file_cache_errors on;

    # ── Gzip Compression ──────────────────────────────
    gzip on;
    gzip_comp_level 6;
    gzip_vary on;
    gzip_min_length 256;
    gzip_proxied any;
    gzip_types application/javascript application/json application/xml text/css text/plain text/xml image/svg+xml font/woff2;

    # ── Security Headers ──────────────────────────────
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # ── Frontend — Static files ───────────────────────
    root /home/winteg-technologies/client/dist;
    index index.html;

    # ── VIDEO FILES — Byte-range streaming ────────────
    location ~* \.(mp4|webm|ogg)$ {
        add_header Accept-Ranges bytes;
        add_header Cache-Control "public, max-age=31536000, immutable";
        add_header Access-Control-Allow-Origin "*";
        sendfile on;
        tcp_nopush on;
        aio threads;
        directio 512;
        output_buffers 1 2m;
        access_log off;
    }

    # ── STATIC ASSETS — JS, CSS, Images, Fonts ───────
    location ~* \.(js|css|webp|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|avif|br|gz)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # ── SPA Fallback ──────────────────────────────────
    location / {
        try_files $uri $uri/ /index.html;
        # Don't cache HTML (so deployments take effect instantly)
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # ── API — Proxy to FastAPI ────────────────────────
    location /api {
        limit_req zone=winteg_api burst=60 nodelay;
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Connection "";
        proxy_connect_timeout 5s;
        proxy_read_timeout 30s;
        proxy_buffering off;
    }

    # ── WebSocket — Live chat & visitors ──────────────
    location /api/ws {
        limit_req zone=winteg_chat burst=20 nodelay;
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_read_timeout 86400s;
    }
}

# HTTP → HTTPS redirect
server {
    listen 80;
    server_name wintegtechnologies.com www.wintegtechnologies.com api.wintegtechnologies.com;
    return 301 https://$host$request_uri;
}
```

## Commands to Apply

```bash
# 1. Edit the Nginx config
sudo nano /etc/nginx/sites-available/wintegtechnologies

# 2. Paste the config above (Ctrl+Shift+V), save (Ctrl+O, Enter, Ctrl+X)

# 3. Test the config
sudo nginx -t

# 4. Reload Nginx (zero-downtime)
sudo systemctl reload nginx
```

---

## Other Remaining Optimizations

### Navbar Scroll Handler (Already good ✅)
The scroll handler uses basic addEventListener — no throttle needed since modern browsers batch scroll events via requestAnimationFrame internally.

### SQLite Database (Already good ✅)
Using SQLite for chat logs and reviews is perfectly fine for your traffic level. No optimization needed.

### WebSocket Visitors (Already good ✅)
Clean implementation with proper disconnect handling.

### Services Component (Already good ✅)
Uses `once: true` on viewport observers, so animations only trigger once.

> [!TIP]
> **One last thing**: Add `{ passive: true }` to the Navbar scroll listener for a small scrolling performance boost.
