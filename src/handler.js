/**
 * DNS 查询处理模块
 */

// --- 上游 DNS 配置 ---
const UPSTREAM_DNS = 'https://dns.google/dns-query';
const UPSTREAM_JSON = 'https://dns.google/resolve';

// --- Twitter / X 域名配置 ---
const TWITTER_DOMAINS = ["twimg.com", "twitter.com", "x.com", "t.co"];

// --- Meta 固定配置 ---
const META_ECH_CONFIG = "AEj+DQBEAQAgACAdd+scUi0IYFsXnUIU7ko2Nd9+F8M26pAGZVpz/KrWPgAEAAEAAWQVZWNoLXB1YmxpYy5hdG1ldGEuY29tAAA=";
const META_CIDRS = [
  '31.13.24.0/21','31.13.64.0/18','45.64.40.0/22','57.141.0.0/24','57.141.2.0/23',
  '57.141.4.0/22','57.141.8.0/21','57.141.16.0/23','57.144.0.0/14','66.220.144.0/20',
  '69.63.176.0/20','69.171.224.0/19','74.119.76.0/22','102.132.96.0/20','102.132.112.0/24',
  '102.132.114.0/23','102.132.116.0/23','102.132.119.0/24','102.132.120.0/23','102.132.123.0/24',
  '102.132.125.0/24','102.132.126.0/23','102.221.188.0/22','103.4.96.0/22','129.134.0.0/17',
  '129.134.130.0/24','129.134.135.0/24','129.134.136.0/22','129.134.140.0/24','129.134.143.0/24',
  '129.134.144.0/24','129.134.147.0/24','129.134.148.0/23','129.134.154.0/23','129.134.156.0/22',
  '129.134.160.0/22','129.134.164.0/23','129.134.168.0/21','129.134.176.0/20','129.134.194.0/24',
  '157.240.0.0/17','157.240.128.0/23','157.240.131.0/24','157.240.132.0/24','157.240.134.0/24',
  '157.240.136.0/23','157.240.139.0/24','157.240.156.0/23','157.240.159.0/24','157.240.169.0/24',
  '157.240.175.0/24','157.240.177.0/24','157.240.179.0/24','157.240.181.0/24','157.240.182.0/23',
  '157.240.184.0/21','157.240.192.0/18','163.70.128.0/17','163.77.132.0/23','163.77.136.0/23',
  '163.114.128.0/20','173.252.64.0/18','179.60.192.0/22','185.60.216.0/22','185.89.216.0/22',
  '199.201.64.0/22','204.15.20.0/22',
  // IPv6
  '2620:0:1c00::/40','2620:10d:c090::/44','2a03:2880::/32','2a03:2887:ff00::/48',
  '2a03:2887:ff02::/48','2a03:2887:ff04::/46','2a03:2887:ff09::/48','2a03:2887:ff0a::/48',
  '2a03:2887:ff1b::/48','2a03:2887:ff1c::/48','2a03:2887:ff1e::/48','2a03:2887:ff20::/48',
  '2a03:2887:ff22::/47','2a03:2887:ff27::/48','2a03:2887:ff28::/46','2a03:2887:ff2f::/48',
  '2a03:2887:ff30::/48','2a03:2887:ff33::/48','2a03:2887:ff37::/48','2a03:2887:ff38::/46',
  '2a03:2887:ff3f::/48','2a03:2887:ff40::/46','2a03:2887:ff44::/47','2a03:2887:ff48::/46',
  '2a03:2887:ff4d::/48','2a03:2887:ff4e::/47','2a03:2887:ff50::/45','2a03:2887:ff58::/47',
  '2a03:2887:ff5a::/48','2a03:2887:ff5f::/48','2a03:2887:ff60::/48','2a03:2887:ff62::/47',
  '2a03:2887:ff64::/46','2a03:2887:ff68::/47','2a03:2887:ff6a::/48','2a03:2887:ff70::/47',
  '2c0f:ef78:3::/48','2c0f:ef78:5::/48','2c0f:ef78:9::/48','2c0f:ef78:c::/47',
  '2c0f:ef78:e::/48','2c0f:ef78:10::/47'
];

// --- Cloudflare IP 段 (精简版) ---
const CF_CIDRS = [
  '1.0.0.0/24','1.1.1.0/24','103.21.244.0/22','103.22.200.0/22','103.31.4.0/22',
  '104.16.0.0/13','104.24.0.0/14','108.162.192.0/18','131.0.72.0/22','141.101.64.0/18',
  '162.158.0.0/15','172.64.0.0/13','173.245.48.0/20','188.114.96.0/20','190.93.240.0/20',
  '197.234.240.0/22','198.41.128.0/17',
  // IPv6
  '2400:cb00::/32','2606:4700::/32','2803:f800::/32','2405:b500::/32','2405:8100::/32',
  '2a06:98c0::/29','2c0f:f248::/32'
];

// --- 主页 HTML ---
export const HOME_PAGE_HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>通信自由 - DoH with ECH</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      min-height: 100vh;
      color: #e0e0e0;
      line-height: 1.6;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    header {
      text-align: center;
      margin-bottom: 50px;
    }
    h1 {
      font-size: 2.5em;
      background: linear-gradient(90deg, #00d9ff, #00ff88);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 10px;
    }
    .subtitle {
      color: #8892b0;
      font-size: 1.1em;
    }
    .card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 30px;
      margin-bottom: 30px;
      backdrop-filter: blur(10px);
    }
    .card h2 {
      color: #00d9ff;
      margin-bottom: 20px;
      font-size: 1.4em;
      border-bottom: 1px solid rgba(0, 217, 255, 0.3);
      padding-bottom: 10px;
    }
    .card h3 {
      color: #00ff88;
      margin: 20px 0 10px;
      font-size: 1.1em;
    }
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .feature {
      background: rgba(0, 217, 255, 0.1);
      border-radius: 12px;
      padding: 20px;
      border-left: 3px solid #00d9ff;
    }
    .feature h4 {
      color: #00d9ff;
      margin-bottom: 8px;
    }
    code {
      background: rgba(0, 0, 0, 0.3);
      padding: 2px 8px;
      border-radius: 4px;
      font-family: 'Fira Code', 'Monaco', monospace;
      color: #00ff88;
      font-size: 0.9em;
    }
    pre {
      background: rgba(0, 0, 0, 0.4);
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 15px 0;
    }
    pre code {
      background: none;
      padding: 0;
      color: #e0e0e0;
    }
    .endpoint {
      background: linear-gradient(90deg, rgba(0, 217, 255, 0.2), rgba(0, 255, 136, 0.2));
      padding: 15px 20px;
      border-radius: 8px;
      margin: 15px 0;
      font-family: monospace;
      font-size: 1.1em;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }
    th, td {
      text-align: left;
      padding: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    th {
      color: #00d9ff;
      font-weight: 600;
    }
    .tag {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 0.8em;
      margin-right: 5px;
    }
    .tag-cf { background: rgba(255, 106, 0, 0.3); color: #ff9a45; }
    .tag-meta { background: rgba(0, 119, 255, 0.3); color: #4da3ff; }
    .tag-x { background: rgba(29, 161, 242, 0.3); color: #1da1f2; }
    footer {
      text-align: center;
      margin-top: 50px;
      padding: 20px;
      color: #8892b0;
      font-size: 0.9em;
    }
    a {
      color: #00d9ff;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🌐 通信自由</h1>
      <p class="subtitle">DNS over HTTPS with Encrypted Client Hello</p>
    </header>

    <div class="card">
      <h2>📡 服务介绍</h2>
      <p>这是一个基于 Cloudflare Workers 的 DoH (DNS over HTTPS) 服务，支持 ECH (Encrypted Client Hello) 配置注入，帮助实现更安全、更自由的网络通信。</p>
      
      <div class="feature-grid">
        <div class="feature">
          <h4>🔒 ECH 支持</h4>
          <p>自动注入 Encrypted Client Hello 配置，保护 SNI (Server Name Indication) 隐私</p>
        </div>
        <div class="feature">
          <h4>⚡ 优选 IP</h4>
          <p>支持自定义 Cloudflare 优选 IP，优化访问速度和连接稳定性</p>
        </div>
        <div class="feature">
          <h4>🎯 智能识别</h4>
          <p>自动识别 Cloudflare、Meta、Twitter/X 域名，针对性处理</p>
        </div>
        <div class="feature">
          <h4>🌍 DNS-over-HTTPS</h4>
          <p>使用 Google DoH 作为上游，确保 DNS 查询安全加密</p>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>🔗 API 端点</h2>
      <div class="endpoint">
        POST /resolve?ip4=&lt;IPv4&gt;&ip6=&lt;IPv6&gt;&ech=&lt;域名&gt;
      </div>
      
      <h3>请求参数</h3>
      <table>
        <tr>
          <th>参数</th>
          <th>说明</th>
          <th>示例</th>
        </tr>
        <tr>
          <td><code>ip4</code></td>
          <td>Cloudflare 优选 IPv4 地址（多个用逗号分隔）</td>
          <td><code>104.16.1.1,104.16.2.2</code></td>
        </tr>
        <tr>
          <td><code>ip6</code></td>
          <td>Cloudflare 优选 IPv6 地址</td>
          <td><code>2606:4700::1</code></td>
        </tr>
        <tr>
          <td><code>ech</code></td>
          <td>ECH 配置来源域名（默认: cloudflare-ech.com）</td>
          <td><code>cloudflare-ech.com</code></td>
        </tr>
      </table>

      <h3>请求示例</h3>
      <pre><code>curl -X POST "https://your-worker.workers.dev/resolve?ip4=104.16.1.1" \\
  -H "Content-Type: application/dns-message" \\
  --data-binary @dns-query.bin</code></pre>
    </div>

    <div class="card">
      <h2>🎛️ 处理逻辑</h2>
      
      <h3><span class="tag tag-x">Twitter/X</span> 域名处理</h3>
      <p>域名: <code>twitter.com</code>, <code>x.com</code>, <code>twimg.com</code>, <code>t.co</code></p>
      <ul style="margin: 10px 0 0 20px;">
        <li>A 记录 → 返回配置的优选 IPv4</li>
        <li>AAAA 记录 → 返回空（X 不支持 IPv6）</li>
        <li>HTTPS 记录 → 注入 Cloudflare ECH</li>
      </ul>

      <h3><span class="tag tag-meta">Meta</span> 域名处理</h3>
      <p>域名: Facebook, Instagram, WhatsApp 等 Meta 系产品</p>
      <ul style="margin: 10px 0 0 20px;">
        <li>A/AAAA 记录 → 返回原始 IP（保持原有解析）</li>
        <li>HTTPS 记录 → 注入固定 Meta ECH 配置</li>
      </ul>

      <h3><span class="tag tag-cf">Cloudflare</span> 域名处理</h3>
      <p>所有使用 Cloudflare CDN 的域名</p>
      <ul style="margin: 10px 0 0 20px;">
        <li>A/AAAA 记录 → 返回配置的优选 IP</li>
        <li>HTTPS 记录 → 动态获取并注入 CF ECH</li>
      </ul>
    </div>

    <div class="card">
      <h2>⚙️ Chrome 配置</h2>
      <p>在 Chrome 浏览器中启用安全 DNS：</p>
      <ol style="margin: 15px 0 0 20px;">
        <li>打开 <code>chrome://settings/security</code></li>
        <li>找到「使用安全 DNS」选项</li>
        <li>选择「使用自定义提供商」</li>
        <li>输入本服务的 DoH URL</li>
      </ol>
      <pre><code>https://your-worker.workers.dev/resolve?ip4=YOUR_PREFERRED_IP</code></pre>
      <p style="margin-top: 15px; color: #8892b0;">注意：Chrome 会并行查询 A、AAAA、HTTPS 记录，本服务会自动处理各类型查询。</p>
    </div>

    <footer>
      <p>通信自由 · Built with Cloudflare Workers</p>
      <p style="margin-top: 10px;">
        <a href="https://github.com/XTLS/BBS/issues/13" target="_blank">参考资料</a>
      </p>
    </footer>
  </div>
</body>
</html>`;

// --- DNS 处理主函数 ---
export async function handleDnsQuery(rawBuffer, config) {
  const query = parseDnsPacket(rawBuffer);
  if (!query || query.questions.length === 0) return forwardQuery(rawBuffer);

  const { id, questions } = query;
  const qType = questions[0].type;
  const qName = questions[0].name.toLowerCase().replace(/\.$/, "");

  // --- 1. Twitter/X 域名短路逻辑 ---
  const isTwitter = TWITTER_DOMAINS.some(d => qName === d || qName.endsWith("." + d));
  
  if (isTwitter) {
    // HTTPS (65): 直接注入 CF ECH
    if (qType === 65) {
      const echRdata = await fetchCleanEchRdata(config);
      if (echRdata) {
        return dnsResponse(createMultiAnsResponse(id, qName, 65, [echRdata]));
      }
    }
    // A (1): 强制返回优选 IP
    if (qType === 1) {
      if (config.ip4) {
        const rds = config.ip4.split(',').map(ipToBytes);
        return dnsResponse(createMultiAnsResponse(id, qName, 1, rds));
      }
    }
    // AAAA (28): 强制返回空 (防止走非优选 IPv6)
    if (qType === 28) {
      return dnsResponse(createMultiAnsResponse(id, qName, 28, [], 3600));
    }
    // 其他记录转发上游
    return forwardQuery(rawBuffer);
  }

  // --- 2. Meta 及其他域名的 IP 判定逻辑 ---
  if (qType === 65) {
    const [originalHttpsBuf, owner, echRdataCf] = await Promise.all([
      forwardQuery(rawBuffer).then(res => res.arrayBuffer()),
      resolveAndCheckOwner(qName),
      fetchCleanEchRdata(config)
    ]);

    if (owner === 'META') {
      const echRdata = packHttpsParams(1, ".", [
        { key: 'alpn', val: 'h3,h2,http/1.1' },
        { key: 'ech', val: META_ECH_CONFIG }
      ]);
      return dnsResponse(createMultiAnsResponse(id, qName, 65, [echRdata], 111));
    }
    if (owner === 'CF' && echRdataCf) {
      return dnsResponse(createMultiAnsResponse(id, qName, 65, [echRdataCf]));
    }
    return dnsResponse(originalHttpsBuf);
  }

  if (qType === 1 || qType === 28) {
    const upstreamRes = await forwardQuery(rawBuffer);
    const upstreamBuf = await upstreamRes.arrayBuffer();
    const ips = extractIpsFromPacket(upstreamBuf);
    
    let owner = null;
    for (const ip of ips) {
      if (ipInCidrs(ip, META_CIDRS)) { owner = 'META'; break; }
      if (ipInCidrs(ip, CF_CIDRS)) { owner = 'CF'; break; }
    }

    if (owner === 'META') {
      const rawIps = qType === 1 
        ? ips.filter(ip => !ip.includes(':')).map(ipToBytes) 
        : ips.filter(ip => ip.includes(':')).map(ipv6ToBytes);
      if (rawIps.length > 0) {
        return dnsResponse(createMultiAnsResponse(id, qName, qType, rawIps, 300));
      }
    }

    if (owner === 'CF') {
      let replaceIps = (qType === 1 && config.ip4) 
        ? config.ip4.split(',').map(ipToBytes) 
        : (qType === 28 && config.ip6) 
          ? config.ip6.split(',').map(ipv6ToBytes) 
          : null;
      if (replaceIps) {
        return dnsResponse(createMultiAnsResponse(id, qName, qType, replaceIps));
      }
    }

    return dnsResponse(upstreamBuf);
  }

  return forwardQuery(rawBuffer);
}

// --- 响应封装 ---
function dnsResponse(buffer) {
  return new Response(buffer, { 
    headers: { 
      'Content-Type': 'application/dns-message', 
      'Access-Control-Allow-Origin': '*' 
    } 
  });
}

// --- 并发检测函数 ---
async function resolveAndCheckOwner(name) {
  try {
    const [res4, res6] = await Promise.all([
      fetch(`${UPSTREAM_JSON}?name=${name}&type=1`).then(r => r.json()),
      fetch(`${UPSTREAM_JSON}?name=${name}&type=28`).then(r => r.json())
    ]);
    const ips = [...(res4.Answer || []), ...(res6.Answer || [])].map(a => a.data);
    for (const ip of ips) {
      if (ipInCidrs(ip, META_CIDRS)) return 'META';
      if (ipInCidrs(ip, CF_CIDRS)) return 'CF';
    }
  } catch (e) {}
  return null;
}

// --- IP CIDR 检查 ---
function ipInCidrs(ip, cidrList) {
  return cidrList.some(cidr => {
    try {
      const [range, bits] = cidr.split('/');
      const mask = parseInt(bits, 10);
      if (ip.includes(':')) {
        const iB = ipv6ToBigInt(ip), rB = ipv6ToBigInt(range);
        return (iB ^ rB) >> (128n - BigInt(mask)) === 0n;
      } else {
        const iL = ipToLong(ip), rL = ipToLong(range);
        return (iL ^ rL) >>> (32 - mask) === 0;
      }
    } catch(e) {}
    return false;
  });
}

// --- DNS 响应构建 ---
function createMultiAnsResponse(id, qn, qt, rds, ttl = 3600) {
  const encodedName = encodeDnsName(qn);
  let totalLen = 12 + encodedName.length + 4;
  rds.forEach(r => totalLen += 12 + r.length); 
  const buf = new Uint8Array(totalLen);
  const v = new DataView(buf.buffer);
  
  v.setUint16(0, id);
  v.setUint16(2, 0x8180);
  v.setUint16(4, 1);
  v.setUint16(6, rds.length);
  
  let offset = 12;
  buf.set(encodedName, offset);
  offset += encodedName.length;
  v.setUint16(offset, qt);
  offset += 2;
  v.setUint16(offset, 1);
  offset += 2;
  
  rds.forEach(r => {
    v.setUint16(offset, 0xC00C);
    offset += 2;
    v.setUint16(offset, qt);
    offset += 2;
    v.setUint16(offset, 1);
    offset += 2;
    v.setUint32(offset, ttl);
    offset += 4;
    v.setUint16(offset, r.length);
    offset += 2;
    buf.set(r, offset);
    offset += r.length;
  });
  
  return buf.buffer;
}

// --- HTTPS 记录参数打包 ---
function packHttpsParams(priority, target, params) {
  const targetBuf = target === "." ? new Uint8Array([0]) : encodeDnsName(target);
  const paramBufs = params.map(p => encodeSvcParam(p.key, p.val)).filter(b => b);
  paramBufs.sort((a, b) => new DataView(a.buffer).getUint16(0) - new DataView(b.buffer).getUint16(0));
  
  let totalLen = 2 + targetBuf.length;
  paramBufs.forEach(b => totalLen += b.length);
  
  const res = new Uint8Array(totalLen);
  const v = new DataView(res.buffer);
  v.setUint16(0, priority);
  res.set(targetBuf, 2);
  
  let offset = 2 + targetBuf.length;
  paramBufs.forEach(b => {
    res.set(b, offset);
    offset += b.length;
  });
  
  return res;
}

// --- 服务参数编码 ---
function encodeSvcParam(key, value) {
  const ids = { 'alpn': 1, 'ech': 5 };
  const id = ids[key];
  if (!id) return null;
  
  let valBuf;
  if (key === 'alpn') {
    const parts = value.split(',');
    valBuf = new Uint8Array(parts.reduce((a, b) => a + b.length + 1, 0));
    let o = 0;
    for (const p of parts) {
      valBuf[o++] = p.length;
      for (let i = 0; i < p.length; i++) valBuf[o++] = p.charCodeAt(i);
    }
  } else {
    const s = atob(value.replace(/-/g, '+').replace(/_/g, '/'));
    valBuf = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) valBuf[i] = s.charCodeAt(i);
  }
  
  const res = new Uint8Array(4 + valBuf.length);
  const v = new DataView(res.buffer);
  v.setUint16(0, id);
  v.setUint16(2, valBuf.length);
  res.set(valBuf, 4);
  return res;
}

// --- DNS 名称编码 ---
function encodeDnsName(domain) {
  const parts = domain.split('.');
  const buf = new Uint8Array(domain.length + 2);
  let offset = 0;
  for (const part of parts) {
    buf[offset++] = part.length;
    for (let i = 0; i < part.length; i++) buf[offset++] = part.charCodeAt(i);
  }
  buf[offset++] = 0;
  return buf.slice(0, offset);
}

// --- DNS 数据包解析 ---
function parseDnsPacket(buf) {
  const view = new DataView(buf);
  if (buf.byteLength < 12) return null;
  
  let offset = 12;
  const labels = [];
  
  while (offset < buf.byteLength) {
    const len = view.getUint8(offset);
    if (len === 0) { offset++; break; }
    if ((len & 0xC0) === 0xC0) { offset += 2; break; }
    offset++;
    labels.push(new TextDecoder().decode(new Uint8Array(buf, offset, len)));
    offset += len;
  }
  
  const qt = view.getUint16(offset);
  return { id: view.getUint16(0), questions: [{ name: labels.join('.'), type: qt }] };
}

// --- IP 提取 ---
function extractIpsFromPacket(buffer) {
  const ips = [];
  const view = new DataView(buffer);
  if (buffer.byteLength < 12) return [];
  
  const ancount = view.getUint16(6);
  let offset = 12;
  
  try {
    // 跳过 questions
    for (let i = 0; i < view.getUint16(4); i++) {
      while (view.getUint8(offset) !== 0) {
        if ((view.getUint8(offset) & 0xC0) === 0xC0) { offset += 1; break; }
        offset += view.getUint8(offset) + 1;
      }
      offset += 5;
    }
    
    // 解析 answers
    for (let i = 0; i < ancount; i++) {
      while (view.getUint8(offset) !== 0) {
        if ((view.getUint8(offset) & 0xC0) === 0xC0) { offset += 1; break; }
        offset += view.getUint8(offset) + 1;
      }
      offset += 1;
      const type = view.getUint16(offset);
      offset += 8;
      const rdlen = view.getUint16(offset);
      offset += 2;
      
      if (type === 1 && rdlen === 4) {
        ips.push(Array.from(new Uint8Array(buffer, offset, 4)).join('.'));
      } else if (type === 28 && rdlen === 16) {
        const v6 = new Uint8Array(buffer, offset, 16);
        let s = "";
        for (let j = 0; j < 16; j += 2) {
          s += ((v6[j] << 8) | v6[j + 1]).toString(16) + (j === 14 ? "" : ":");
        }
        ips.push(s);
      }
      offset += rdlen;
    }
  } catch (e) {}
  
  return ips;
}

// --- 获取 ECH 配置 ---
async function fetchCleanEchRdata(config) {
  try {
    const res = await fetch(`${UPSTREAM_JSON}?name=${config.echDomain}&type=65`);
    const data = await res.json();
    if (data.Status === 0 && data.Answer) {
      const ans = data.Answer.find(a => a.type === 65);
      if (!ans || ans.data.startsWith('\\#')) return null;
      const parts = ans.data.split(/\s+/);
      const params = [];
      for (let i = 2; i < parts.length; i++) {
        if (parts[i].includes('=')) {
          const [k, v] = parts[i].split('=');
          if (k === 'alpn' || k === 'ech') params.push({ key: k, val: v });
        }
      }
      return packHttpsParams(parseInt(parts[0]), parts[1], params);
    }
  } catch (e) {}
  return null;
}

// --- 上游转发 ---
function forwardQuery(body) {
  return fetch(UPSTREAM_DNS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/dns-message' },
    body
  });
}

// --- IP 工具函数 ---
function ipToLong(ip) {
  return ip.split('.').reduce((a, b) => (a << 8) + parseInt(b, 10), 0) >>> 0;
}

function ipv6ToBigInt(ip) {
  let p = ip.split(':');
  if (ip.includes('::')) {
    const [f, s] = ip.split('::');
    const fP = f ? f.split(':') : [];
    const sP = s ? s.split(':') : [];
    p = [...fP, ...Array(8 - fP.length - sP.length).fill('0'), ...sP];
  }
  return p.reduce((a, b) => (a << 16n) + BigInt(parseInt(b || '0', 16)), 0n);
}

function ipToBytes(ip) {
  return new Uint8Array(ip.split('.').map(Number));
}

function ipv6ToBytes(ip) {
  let p = ip.split(':');
  if (ip.includes('::')) {
    const [l, r] = ip.split('::');
    const lp = l ? l.split(':') : [];
    const rp = r ? r.split(':') : [];
    p = [...lp, ...Array(8 - lp.length - rp.length).fill('0'), ...rp];
  }
  const b = new Uint8Array(16);
  p.forEach((v, i) => {
    const val = parseInt(v, 16) || 0;
    b[i * 2] = val >> 8;
    b[i * 2 + 1] = val & 0xFF;
  });
  return b;
}
