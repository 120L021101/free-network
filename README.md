# 通信自由

> 通信自由，至少应当是

基于 Cloudflare Workers 的 DNS over HTTPS (DoH) 服务，支持 ECH (Encrypted Client Hello) 配置注入。

## 功能特性

- 🔒 **ECH 支持**: 自动注入 Encrypted Client Hello 配置，保护 SNI 隐私
- ⚡ **优选 IP**: 支持自定义 Cloudflare 优选 IP，优化访问速度
- 🎯 **智能识别**: 自动识别 Cloudflare、Meta、Twitter/X 域名，针对性处理
- 🌍 **DNS-over-HTTPS**: 使用 Google DoH 作为上游，确保 DNS 查询安全

## 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

### 构建

```bash
npm run build
```

### 部署到 Cloudflare

```bash
npm run deploy
```

## API 端点

### 主页

```
GET /
```

访问主页查看服务介绍和使用说明。

### DoH 查询

```
POST /resolve?ip4=<IPv4>&ip6=<IPv6>&ech=<域名>
Content-Type: application/dns-message
```

**参数说明:**

| 参数 | 说明 | 示例 |
|------|------|------|
| `ip4` | Cloudflare 优选 IPv4 (多个用逗号分隔) | `104.16.1.1,104.16.2.2` |
| `ip6` | Cloudflare 优选 IPv6 | `2606:4700::1` |
| `ech` | ECH 配置来源域名 | `cloudflare-ech.com` |

## 处理逻辑

### Twitter/X 域名
- A 记录 → 返回配置的优选 IPv4
- AAAA 记录 → 返回空（X 不支持 IPv6）
- HTTPS 记录 → 注入 Cloudflare ECH

### Meta 域名
- A/AAAA 记录 → 返回原始 IP
- HTTPS 记录 → 注入固定 Meta ECH 配置

### Cloudflare 域名
- A/AAAA 记录 → 返回配置的优选 IP
- HTTPS 记录 → 动态获取并注入 CF ECH

## Chrome 配置

1. 打开 `chrome://settings/security`
2. 找到「使用安全 DNS」选项
3. 选择「使用自定义提供商」
4. 输入: `https://your-worker.workers.dev/resolve?ip4=YOUR_PREFERRED_IP`

## 参考资料

- [XTLS BBS Issue #13](https://github.com/XTLS/BBS/issues/13)

## License

ISC，至少应当是