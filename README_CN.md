# Nodejs Electerm 同步服务器

[![Build Status](https://github.com/electerm/electerm-sync-server-node/actions/workflows/linux.yml/badge.svg)](https://github.com/electerm/electerm-sync-server-node/actions)

一个使用 SQLite 数据库的简单可靠的 Electerm 数据同步服务器。

[English](README.md) | [中文](README_CN.md)

## 功能特性

- 🚀 快速可靠的 SQLite 数据库存储
- 🔐 基于 JWT 的身份验证
- 📊 用户友好的日志记录和监控
- 🧪 内置健康检查和连接测试
- 🔧 使用环境变量轻松配置

## 快速开始

### 前置条件

- Node.js 20+（推荐使用 [nvm](https://github.com/nvm-sh/nvm)）
- npm

### 安装

```bash
git clone git@github.com:electerm/electerm-sync-server-node.git
cd electerm-sync-server-node
npm install
```

### 配置

1. 复制示例环境文件：

   ```bash
   cp sample.env .env
   ```

2. 编辑 `.env` 文件并设置您的配置：

   ```env
   # 服务器配置
   PORT=7837
   HOST=127.0.0.1

   # 身份验证（在生产环境中请更改这些值！）
   JWT_SECRET=your-super-secure-jwt-secret-here-make-it-long-and-random
   JWT_USERS=user1,user2,user3

   # 可选：自定义数据库路径（默认为 data.db）
   # DB_PATH=/path/to/your/database.db
   ```

### 运行服务器

```bash
npm start
```

您应该看到类似以下的输出：

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

## 在 Electerm 中使用

1. 打开 Electerm
2. 转到 **设置** → **同步**
3. 选择 **自定义同步服务器**
4. 填写：
   - **服务器 URL**：`http://your-server-ip:7837/api/sync`
   - **JWT Secret**：从您的 `.env` 文件的 `JWT_SECRET` 复制
   - **用户名**：`JWT_USERS` 中列出的用户之一（例如，`user1`）

## API 端点

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/api/sync` | 为已认证用户检索同步数据 |
| PUT | `/api/sync` | 为已认证用户存储同步数据 |
| POST | `/api/sync` | 测试连接（返回 "test ok"） |
| GET | `/test` | 健康检查（返回 "ok"） |

所有 `/api/sync` 端点都需要 JWT 身份验证。

## 测试

### 运行单元测试

```bash
npm test
```

### 手动测试

1. **健康检查**：

   ```bash
   curl http://127.0.0.1:7837/test
   # 应该返回："ok"
   ```

2. **连接测试**（需要 JWT 令牌）：

   ```bash
   # 生成 JWT 令牌（您可以使用在线 JWT 工具或编写脚本）
   curl -X POST http://127.0.0.1:7837/api/sync \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{}'
   # 应该返回："test ok"
   ```

## 配置选项

| 变量 | 默认值 | 描述 |
|------|--------|------|
| `PORT` | `7837` | 服务器端口 |
| `HOST` | `127.0.0.1` | 服务器主机/IP |
| `JWT_SECRET` | *必需* | JWT 签名的密钥 |
| `JWT_USERS` | *必需* | 允许用户的逗号分隔列表 |
| `DB_PATH` | `data.db` | SQLite 数据库文件路径 |

## 故障排除

### 服务器无法启动

- 检查端口 7837 是否已被使用：`lsof -i :7837`
- 验证 Node.js 版本：`node --version`（应该是 16+）
- 检查 `.env` 文件是否存在并包含必需变量

### 身份验证问题

- 验证 `JWT_SECRET` 在服务器和 Electerm 中匹配
- 检查用户名是否在 `JWT_USERS` 列表中
- 确保 JWT 令牌未过期

### 数据库问题

- 检查数据库文件位置的写入权限
- 如果使用自定义位置，请验证 `DB_PATH`

### 连接问题

- 测试基本连接：`curl http://127.0.0.1:7837/test`
- 检查防火墙设置
- 验证 HOST 设置是否允许外部连接（使用 `0.0.0.0` 接受所有接口的连接）

## 自定义数据存储

服务器默认使用 SQLite，但您可以通过创建具有 `read` 和 `write` 函数的新模块来实现自定义存储。请参阅 `src/file-store.js` 以了解接口。

自定义存储示例：

```javascript
async function read(req, res) {
  // 在此处编写您的读取逻辑
}

async function write(req, res) {
  // 在此处编写您的写入逻辑
}

module.exports = { read, write }
```

## 生产部署

- 将 `JWT_SECRET` 更改为长随机字符串
- 在 `JWT_USERS` 中使用强唯一用户名
- 考虑使用反向代理（nginx）进行 SSL
- 设置 `HOST=0.0.0.0` 以接受来自任何接口的连接
- 使用环境变量而不是 `.env` 文件存储密钥
- 定期备份 `data.db` 文件

## 其他语言的同步服务器

[自定义同步服务器文档](https://github.com/electerm/electerm/wiki/Custom-sync-server)

## 许可证

MIT
