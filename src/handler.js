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
