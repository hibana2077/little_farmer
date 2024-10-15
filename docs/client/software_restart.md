在 `docker-compose.yml` 中的 `restart` 政策可以讓容器自動重啟，但它並不會讓 Docker Compose 在系統重啟後自動運行。`restart` 僅適用於 Docker 容器的管理行為，而不是整個 Docker Compose 堆疊。

要在系統開機後自動執行 Docker Compose，你需要將其設定為 systemd 的 service，讓 `docker-compose` 在系統啟動時執行。下面是簡單步驟：

### 1. 建立 systemd service 檔案

在 `/etc/systemd/system/` 目錄下建立一個新的 service 檔案，例如 `myapp.service`：

```bash
sudo nano /etc/systemd/system/myapp.service
```

### 2. 內容範例

```ini
[Unit]
Description=Docker Compose Application Service
Requires=docker.service
After=docker.service

[Service]
WorkingDirectory=/path/to/your/docker-compose/folder
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
Restart=always

[Install]
WantedBy=multi-user.target
```

將 `/path/to/your/docker-compose/folder` 替換為你的 `docker-compose.yml` 位置。

### 3. 啟用並啟動 service

```bash
sudo systemctl daemon-reload
sudo systemctl enable myapp.service
sudo systemctl start myapp.service
```

這樣設定後，系統每次重啟時會自動運行 Docker Compose 堆疊。