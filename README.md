<h1 align="center" style="padding-top: 60px;padding-bottom: 40px;">
    <a href="https://electerm.org">
        <img src="https://github.com/electerm/electerm-resource/raw/master/static/images/electerm.png", alt="" />
    </a>
</h1>

[English](README.md) | [中文](README_CN.md)

# Nodejs Electerm Sync Server

[![Build Status](https://github.com/electerm/electerm-sync-server-node/actions/workflows/linux.yml/badge.svg)](https://github.com/electerm/electerm-sync-server-node/actions)

A simple and solid Electerm data sync server using SQLite database.


## Features

- 🚀 Fast and reliable SQLite database storage
- 🔐 JWT-based authentication
- 📊 User-friendly logging and monitoring
- 🧪 Built-in health checks and connection tests
- 🔧 Easy configuration with environment variables

## Quick Start

### Prerequisites

- Node.js 20+ (recommend using [nvm](https://github.com/nvm-sh/nvm))
- npm

### Installation

```bash
git clone git@github.com:electerm/electerm-sync-server-node.git
cd electerm-sync-server-node
npm install
```

### Configuration

1. Copy the sample environment file:

   ```bash
   cp sample.env .env
   ```

2. Edit `.env` file with your settings:

   ```env
   # Server configuration
   PORT=7837
   HOST=127.0.0.1

   # Authentication (CHANGE THESE IN PRODUCTION!)
   JWT_SECRET=your-super-secure-jwt-secret-here-make-it-long-and-random
   JWT_USERS=user1,user2,user3

   # Optional: Custom database path (defaults to data.db)
   # DB_PATH=/path/to/your/database.db
   ```

### Running the Server

```bash
npm start
```

You should see output like:

```text
🚀 Starting Electerm Sync Server...
📍 Server will run at: http://127.0.0.1:7837
🔐 JWT Secret: ✓ Configured
👥 JWT Users: 3 users configured
💾 Storage: SQLite (data.db)

📖 Usage Instructions:
1. In Electerm, go to Settings > Sync
2. Set Custom Sync Server:
   - Server URL: http://127.0.0.1:7837/api/sync
   - JWT Secret: (copy from your .env file)
   - User Name: (one of the JWT_USERS from your .env file)

🧪 Test endpoint: http://127.0.0.1:7837/test

✅ Server is now running and ready to accept connections!
🌐 API endpoints:
   GET  /api/sync - Read sync data
   PUT  /api/sync - Write sync data
   POST /api/sync - Test connection
   GET  /test     - Health check
```

## Usage in Electerm

1. Open Electerm
2. Go to **Settings** → **Sync**
3. Select **Custom Sync Server**
4. Fill in:
   - **Server URL**: `http://your-server-ip:7837/api/sync`
   - **JWT Secret**: Copy from your `.env` file's `JWT_SECRET`
   - **User Name**: One of the users listed in `JWT_USERS` (e.g., `user1`)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sync` | Retrieve sync data for authenticated user |
| PUT | `/api/sync` | Store sync data for authenticated user |
| POST | `/api/sync` | Test connection (returns "test ok") |
| GET | `/test` | Health check (returns "ok") |

All `/api/sync` endpoints require JWT authentication.

## Testing

### Run Unit Tests

```bash
npm test
```

### Manual Testing

1. **Health Check**:

   ```bash
   curl http://127.0.0.1:7837/test
   # Should return: "ok"
   ```

2. **Connection Test** (requires JWT token):

   ```bash
   # Generate JWT token (you can use online JWT tools or write a script)
   curl -X POST http://127.0.0.1:7837/api/sync \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{}'
   # Should return: "test ok"
   ```

## Configuration Options

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `7837` | Server port |
| `HOST` | `127.0.0.1` | Server host/IP |
| `JWT_SECRET` | *required* | Secret key for JWT signing |
| `JWT_USERS` | *required* | Comma-separated list of allowed users |
| `DB_PATH` | `data.db` | Path to SQLite database file |

## Troubleshooting

### Server Won't Start

- Check if port 7837 is already in use: `lsof -i :7837`
- Verify Node.js version: `node --version` (should be 16+)
- Check `.env` file exists and has required variables

### Authentication Issues

- Verify `JWT_SECRET` matches in both server and Electerm
- Check that user name is in `JWT_USERS` list
- Ensure JWT token hasn't expired

### Database Issues

- Check write permissions for database file location
- Verify `DB_PATH` if using custom location

### Connection Problems

- Test basic connectivity: `curl http://127.0.0.1:7837/test`
- Check firewall settings
- Verify HOST setting allows external connections (use `0.0.0.0` for all interfaces)

## Custom Data Store

The server uses SQLite by default, but you can implement custom storage by creating a new module with `read` and `write` functions. See `src/file-store.js` for the interface.

Example custom store:

```javascript
async function read(req, res) {
  // Your read logic here
}

async function write(req, res) {
  // Your write logic here
}

module.exports = { read, write }
```

## Production Deployment

- Change `JWT_SECRET` to a long, random string
- Use strong, unique usernames in `JWT_USERS`
- Consider using a reverse proxy (nginx) for SSL
- Set `HOST=0.0.0.0` to accept connections from any interface
- Use environment variables instead of `.env` file for secrets
- Regularly backup the `data.db` file

## Sync Servers in Other Languages

[Custom sync server documentation](https://github.com/electerm/electerm/wiki/Custom-sync-server)

## About electerm

Open-sourced terminal/ssh/sftp/telnet/serialport/RDP/VNC/Spice/ftp client(Linux, Mac, Windows, Android, HarmonyOS).

Besides mainstream Windows/macOS/Linux/Android, electerm also supports HarmonyOS, and older systems — Ubuntu 18, Windows 7, macOS 10+, and special Chinese Linux distributions such as UOS, Kylin, and LoongArch (both old-world and new-world).

<p>
  <a href="https://electerm.org">Homepage / Downloads</a> ·
  <a href="https://theme.electerm.org">Theme</a> ·
  <a href="https://github.com/electerm/electerm-web-docker">Docker</a> ·
  <a href="https://demo.electerm.org">Online demo</a> ·
  <a href="https://github.com/electerm/electerm-android">Android</a> ·
  <a href="https://github.com/electerm/electerm-harmony">HarmonyOS</a> ·
  <a href="https://appgallery.huawei.com/app/detail?id=org.electerm.electerm">Huawei AppGallery</a> ·
  <a href="https://www.microsoft.com/store/apps/9NCN7272GTFF">Microsoft Store</a> ·
  <a href="https://snapcraft.io/electerm">Snap Store</a> ·
  <a href="https://repos.electerm.org/deb">deb repo</a> ·
  <a href="https://repos.electerm.org/rpm">rpm repo</a>
</p>

<div>🌐 <strong><a href="https://cloud.electerm.org">electerm online</a></strong> — Public free online electerm app</div>
<div>🤖 <strong><a href="https://ai.electerm.org">electerm AI</a></strong> — Free AI for electerm users</div>
<div>💻 <strong><a href="https://github.com/electerm/electerm-web">electerm-web</a></strong> — Web app version running in browser (including mobile device)</div>

## License

MIT

MIT
