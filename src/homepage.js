/**
 * 丰富的双语主页 HTML
 */
export const HOME_PAGE_HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>通信自由 | Freedom of Communication</title>
  <meta name="description" content="DNS over HTTPS with Encrypted Client Hello - 安全、自由、智能的DNS解析服务">
  <style>
    :root {
      --bg-primary: #0a0e1a;
      --bg-secondary: #111827;
      --bg-card: rgba(255,255,255,0.04);
      --bg-card-hover: rgba(255,255,255,0.08);
      --border: rgba(255,255,255,0.08);
      --border-hover: rgba(255,255,255,0.15);
      --text: #e2e8f0;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      --primary: #00d4ff;
      --primary-glow: rgba(0,212,255,0.15);
      --secondary: #a855f7;
      --secondary-glow: rgba(168,85,247,0.15);
      --accent: #00ff88;
      --accent-glow: rgba(0,255,136,0.1);
      --twitter: #1d9bf0;
      --meta: #0066ff;
      --cf-orange: #f6821f;
      --danger: #ef4444;
      --radius: 16px;
      --radius-sm: 10px;
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior: smooth; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans SC', sans-serif;
      background: var(--bg-primary);
      color: var(--text);
      line-height: 1.7;
      min-height: 100vh;
      overflow-x: hidden;
    }
    .lang-zh .en, .lang-en .zh { display: none !important; }

    /* ===== NAV ===== */
    nav {
      position: fixed; top:0; left:0; right:0; z-index: 100;
      background: rgba(10,14,26,0.85);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      padding: 0 24px;
      height: 60px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .nav-brand {
      font-size: 1.15em; font-weight: 700;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .nav-links { display: flex; gap: 24px; align-items: center; }
    .nav-links a {
      color: var(--text-muted); text-decoration: none; font-size: 0.9em;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--primary); }
    #langBtn {
      background: rgba(0,212,255,0.12); border: 1px solid rgba(0,212,255,0.3);
      color: var(--primary); padding: 6px 16px; border-radius: 20px;
      font-size: 0.85em; cursor: pointer; transition: all 0.2s; font-weight: 500;
    }
    #langBtn:hover { background: rgba(0,212,255,0.25); }

    /* ===== COMMON ===== */
    .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
    section { padding: 100px 0; }
    .section-tag {
      display: inline-block; font-size: 0.75em; font-weight: 600;
      text-transform: uppercase; letter-spacing: 2px; color: var(--primary);
      background: var(--primary-glow); padding: 6px 14px; border-radius: 20px;
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 2.2em; font-weight: 800; margin-bottom: 16px;
      color: #fff; line-height: 1.3;
    }
    .section-desc { color: var(--text-muted); font-size: 1.05em; max-width: 650px; margin-bottom: 50px; }

    /* ===== HERO ===== */
    .hero {
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
      text-align: center; position: relative;
      background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,255,0.08) 0%, transparent 60%),
                  radial-gradient(ellipse 60% 50% at 30% 70%, rgba(168,85,247,0.06) 0%, transparent 50%),
                  var(--bg-primary);
    }
    .hero-content { position: relative; z-index: 2; }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(0,255,136,0.08); border: 1px solid rgba(0,255,136,0.2);
      color: var(--accent); font-size: 0.8em; font-weight: 500;
      padding: 8px 18px; border-radius: 24px; margin-bottom: 28px;
    }
    .hero-badge .dot { width:6px; height:6px; border-radius:50%; background:var(--accent); animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    .hero h1 {
      font-size: clamp(2.8em, 6vw, 4.2em); font-weight: 900;
      background: linear-gradient(135deg, #fff 0%, var(--primary) 50%, var(--accent) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text; margin-bottom: 20px; line-height: 1.2;
    }
    .hero-sub {
      font-size: clamp(1em, 2vw, 1.25em); color: var(--text-muted);
      max-width: 640px; margin: 0 auto 40px;
    }
    .hero-cta { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    .btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 28px; border-radius: 12px; font-size: 0.95em;
      font-weight: 600; text-decoration: none; transition: all 0.3s;
      cursor: pointer; border: none;
    }
    .btn-primary {
      background: linear-gradient(135deg, var(--primary), #0099cc);
      color: #fff; box-shadow: 0 4px 24px rgba(0,212,255,0.3);
    }
    .btn-primary:hover { box-shadow: 0 8px 32px rgba(0,212,255,0.45); transform: translateY(-2px); }
    .btn-ghost {
      background: var(--bg-card); color: var(--text); border: 1px solid var(--border);
    }
    .btn-ghost:hover { border-color: var(--primary); color: var(--primary); }
    .hero-stats {
      display: flex; justify-content: center; gap: 48px; margin-top: 60px;
      padding-top: 40px; border-top: 1px solid var(--border);
    }
    .hero-stat h3 { font-size: 1.8em; font-weight: 800; color: #fff; }
    .hero-stat p { font-size: 0.85em; color: var(--text-muted); }

    /* ===== FEATURES ===== */
    #features { background: var(--bg-secondary); }
    .features-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;
    }
    .feature-card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 32px;
      transition: all 0.3s; position: relative; overflow: hidden;
    }
    .feature-card:hover {
      border-color: var(--border-hover);
      background: var(--bg-card-hover);
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }
    .feature-icon {
      width: 48px; height: 48px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.4em; margin-bottom: 20px;
    }
    .feature-card h3 { font-size: 1.15em; font-weight: 700; margin-bottom: 10px; color: #fff; }
    .feature-card p { font-size: 0.9em; color: var(--text-muted); line-height: 1.6; }
    .fi-ech { background: var(--primary-glow); }
    .fi-ip { background: var(--accent-glow); }
    .fi-smart { background: var(--secondary-glow); }
    .fi-doh { background: rgba(255,193,7,0.12); }
    .fi-camo { background: rgba(239,68,68,0.12); }
    .fi-std { background: rgba(246,130,31,0.12); }

    /* ===== ARCHITECTURE ===== */
    #architecture {
      background: var(--bg-primary);
      position: relative;
    }
    .arch-flow {
      display: flex; flex-direction: column; align-items: center; gap: 0;
      max-width: 800px; margin: 0 auto;
    }
    .arch-node {
      background: var(--bg-card); border: 1.5px solid var(--border);
      border-radius: var(--radius); padding: 24px 40px;
      text-align: center; width: 100%; max-width: 400px;
      position: relative; z-index: 2;
    }
    .arch-node h4 { font-size: 1.1em; font-weight: 700; margin-bottom: 4px; }
    .arch-node p { font-size: 0.85em; color: var(--text-muted); }
    .arch-node.node-browser { border-color: rgba(0,212,255,0.4); background: rgba(0,212,255,0.06); }
    .arch-node.node-worker { border-color: rgba(168,85,247,0.4); background: rgba(168,85,247,0.06); }
    .arch-node.node-dns { border-color: rgba(0,255,136,0.4); background: rgba(0,255,136,0.06); }
    .arch-connector {
      width: 2px; height: 40px;
      background: linear-gradient(to bottom, var(--primary), var(--secondary));
      position: relative;
    }
    .arch-connector::after {
      content: ''; position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%);
      border-left: 5px solid transparent; border-right: 5px solid transparent;
      border-top: 7px solid var(--secondary);
    }
    .arch-label {
      font-size: 0.8em; color: var(--text-dim);
      padding: 4px 12px; background: rgba(0,0,0,0.3); border-radius: 12px;
      margin: 8px 0;
    }
    .arch-branches {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 16px; width: 100%; margin: 0;
      position: relative;
    }
    .arch-branches::before {
      content: ''; position: absolute; top: 0;
      left: calc(100%/6); right: calc(100%/6);
      height: 2px; background: var(--border);
    }
    .arch-branch {
      border-radius: var(--radius-sm); padding: 24px 16px;
      text-align: center; border: 1.5px solid; position: relative;
    }
    .arch-branch::before {
      content: ''; position: absolute; top: -20px; left: 50%;
      width: 2px; height: 20px; background: var(--border);
    }
    .arch-branch h5 {
      font-size: 0.95em; font-weight: 700; margin-bottom: 12px;
      padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .arch-branch ul { list-style: none; text-align: left; font-size: 0.82em; }
    .arch-branch ul li { padding: 3px 0; color: var(--text-muted); }
    .arch-branch ul li .record-type {
      display: inline-block; width: 52px; font-weight: 600; font-family: monospace;
    }
    .branch-twitter {
      border-color: rgba(29,155,240,0.4); background: rgba(29,155,240,0.06);
    }
    .branch-twitter h5 { color: var(--twitter); }
    .branch-meta {
      border-color: rgba(0,102,255,0.4); background: rgba(0,102,255,0.06);
    }
    .branch-meta h5 { color: var(--meta); }
    .branch-cf {
      border-color: rgba(246,130,31,0.4); background: rgba(246,130,31,0.06);
    }
    .branch-cf h5 { color: var(--cf-orange); }
    .arch-merge {
      width: 100%; display: flex; flex-direction: column; align-items: center;
      position: relative; margin-top: 0;
    }
    .arch-merge::before {
      content: ''; position: absolute; top: 0;
      left: calc(100%/6); right: calc(100%/6);
      height: 2px; background: var(--border);
    }
    .arch-merge .arch-connector { margin-top: 0; }

    /* ===== ECH DIAGRAM ===== */
    .ech-compare {
      display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
      margin-top: 40px; max-width: 700px; margin-left: auto; margin-right: auto;
    }
    .ech-box {
      border-radius: var(--radius); padding: 28px; text-align: center;
    }
    .ech-box h4 { font-size: 1.05em; margin-bottom: 16px; font-weight: 700; }
    .ech-box.ech-without {
      background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.3);
    }
    .ech-box.ech-without h4 { color: var(--danger); }
    .ech-box.ech-with {
      background: rgba(0,255,136,0.06); border: 1px solid rgba(0,255,136,0.3);
    }
    .ech-box.ech-with h4 { color: var(--accent); }
    .ech-flow-item {
      display: flex; align-items: center; gap: 10px; justify-content: center;
      padding: 8px 0; font-size: 0.88em; color: var(--text-muted);
    }
    .ech-flow-item .ech-arrow { color: var(--text-dim); }

    /* ===== API SECTION ===== */
    #api { background: var(--bg-secondary); }
    .api-endpoint {
      background: rgba(0,212,255,0.06); border: 1px solid rgba(0,212,255,0.2);
      border-radius: var(--radius); padding: 24px 32px; margin-bottom: 32px;
      font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
      display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
    }
    .method-badge {
      background: var(--primary); color: #000; font-weight: 700;
      padding: 4px 12px; border-radius: 6px; font-size: 0.85em;
    }
    .endpoint-path { color: var(--text); font-size: 1.05em; }
    .params-table {
      width: 100%; border-collapse: collapse; margin: 24px 0;
      background: var(--bg-card); border-radius: var(--radius); overflow: hidden;
      border: 1px solid var(--border);
    }
    .params-table th {
      text-align: left; padding: 14px 20px; font-size: 0.8em;
      text-transform: uppercase; letter-spacing: 1px; color: var(--text-dim);
      background: rgba(0,0,0,0.2); font-weight: 600;
    }
    .params-table td {
      padding: 14px 20px; border-top: 1px solid var(--border); font-size: 0.9em;
    }
    .params-table code {
      background: rgba(0,0,0,0.3); padding: 2px 8px; border-radius: 4px;
      font-family: 'JetBrains Mono', 'Fira Code', monospace; color: var(--primary);
      font-size: 0.9em;
    }
    .code-block {
      background: #0d1117; border: 1px solid var(--border);
      border-radius: var(--radius-sm); padding: 24px; overflow-x: auto;
      font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 0.85em;
      line-height: 1.8; color: #c9d1d9; margin-top: 16px;
    }
    .code-block .cm { color: #8b949e; }
    .code-block .str { color: #a5d6ff; }
    .code-block .kw { color: #ff7b72; }
    .code-block .flag { color: #d2a8ff; }

    /* ===== SETUP ===== */
    #setup { background: var(--bg-primary); }
    .setup-steps {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;
      margin-top: 40px;
    }
    .setup-step {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 32px; position: relative;
    }
    .step-num {
      position: absolute; top: -14px; left: 24px;
      width: 28px; height: 28px; border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      display: flex; align-items: center; justify-content: center;
      font-size: 0.8em; font-weight: 800; color: #fff;
    }
    .setup-step h4 { font-size: 1.05em; font-weight: 700; margin-bottom: 10px; color: #fff; }
    .setup-step p { font-size: 0.88em; color: var(--text-muted); }
    .setup-step code {
      background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px;
      font-family: 'JetBrains Mono','Fira Code',monospace; color: var(--accent);
      font-size: 0.85em;
    }
    .doh-url-box {
      background: #0d1117; border: 1px solid var(--border);
      border-radius: var(--radius-sm); padding: 16px 20px; margin-top: 24px;
      font-family: monospace; font-size: 0.9em; color: var(--accent);
      word-break: break-all;
    }

    /* ===== FOOTER ===== */
    footer {
      padding: 40px 0; text-align: center;
      border-top: 1px solid var(--border);
    }
    footer p { color: var(--text-dim); font-size: 0.85em; }
    footer a { color: var(--primary); text-decoration: none; }
    footer a:hover { text-decoration: underline; }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 768px) {
      nav { padding: 0 16px; }
      .nav-links { gap: 12px; }
      .nav-links a { display: none; }
      section { padding: 60px 0; }
      .section-title { font-size: 1.6em; }
      .hero h1 { font-size: 2em; }
      .hero-stats { gap: 24px; flex-wrap: wrap; }
      .arch-branches { grid-template-columns: 1fr; gap: 12px; }
      .arch-branches::before { display: none; }
      .arch-branch::before { display: none; }
      .ech-compare { grid-template-columns: 1fr; }
      .features-grid { grid-template-columns: 1fr; }
    }

    /* ===== ANIMATIONS ===== */
    .fade-in {
      opacity: 0; transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-in.visible { opacity: 1; transform: translateY(0); }
  </style>
</head>
<body class="lang-zh">
  <!-- NAV -->
  <nav>
    <div class="nav-brand">
      <span class="zh">🌐 通信自由</span>
      <span class="en">🌐 FreeDNS</span>
    </div>
    <div class="nav-links">
      <a href="#features"><span class="zh">功能</span><span class="en">Features</span></a>
      <a href="#architecture"><span class="zh">架构</span><span class="en">Architecture</span></a>
      <a href="#api"><span class="zh">接口</span><span class="en">API</span></a>
      <a href="#setup"><span class="zh">配置</span><span class="en">Setup</span></a>
      <button id="langBtn" onclick="toggleLang()">English</button>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-content container">
      <div class="hero-badge">
        <span class="dot"></span>
        <span class="zh">服务运行中</span>
        <span class="en">Service Running</span>
      </div>
      <h1>
        <span class="zh">通信自由</span>
        <span class="en">Freedom of Communication</span>
      </h1>
      <p class="hero-sub">
        <span class="zh">基于 Cloudflare Workers 的 DNS-over-HTTPS 服务，集成 ECH (Encrypted Client Hello) 配置注入 —— 让你的 DNS 查询安全、智能、无审查。</span>
        <span class="en">A Cloudflare Workers-based DNS-over-HTTPS service with ECH (Encrypted Client Hello) injection — making your DNS queries secure, smart, and censorship-resistant.</span>
      </p>
      <div class="hero-cta">
        <a href="#api" class="btn btn-primary">
          <span class="zh">📖 查看 API</span>
          <span class="en">📖 View API</span>
        </a>
        <a href="#setup" class="btn btn-ghost">
          <span class="zh">⚡ 快速配置</span>
          <span class="en">⚡ Quick Setup</span>
        </a>
      </div>
      <div class="hero-stats">
        <div class="hero-stat">
          <h3>3</h3>
          <p><span class="zh">域名分类策略</span><span class="en">Domain Strategies</span></p>
        </div>
        <div class="hero-stat">
          <h3>ECH</h3>
          <p><span class="zh">加密 SNI 支持</span><span class="en">Encrypted SNI</span></p>
        </div>
        <div class="hero-stat">
          <h3>DoH</h3>
          <p><span class="zh">RFC 8484 标准</span><span class="en">RFC 8484 Standard</span></p>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURES -->
  <section id="features">
    <div class="container">
      <div class="section-tag">
        <span class="zh">核心功能</span>
        <span class="en">CORE FEATURES</span>
      </div>
      <h2 class="section-title">
        <span class="zh">为什么选择我们？</span>
        <span class="en">Why Choose Us?</span>
      </h2>
      <p class="section-desc">
        <span class="zh">不只是简单的 DNS 转发 —— 我们在边缘节点对 DNS 响应进行智能改写，注入 ECH 配置，替换优选 IP，实现真正的安全通信。</span>
        <span class="en">More than simple DNS forwarding — we intelligently rewrite DNS responses at the edge, inject ECH configs, and replace with preferred IPs for truly secure communication.</span>
      </p>
      <div class="features-grid">
        <div class="feature-card fade-in">
          <div class="feature-icon fi-ech">🔐</div>
          <h3>
            <span class="zh">ECH 加密</span>
            <span class="en">ECH Encryption</span>
          </h3>
          <p>
            <span class="zh">自动注入 Encrypted Client Hello 配置到 HTTPS DNS 记录中，加密 TLS 握手中的 SNI（Server Name Indication），防止中间人窥探你访问的真实域名。</span>
            <span class="en">Automatically injects Encrypted Client Hello config into HTTPS DNS records, encrypting the SNI in TLS handshakes, preventing middlemen from snooping on your actual destination.</span>
          </p>
        </div>
        <div class="feature-card fade-in">
          <div class="feature-icon fi-ip">⚡</div>
          <h3>
            <span class="zh">优选 IP 替换</span>
            <span class="en">Preferred IP Routing</span>
          </h3>
          <p>
            <span class="zh">将 Cloudflare CDN 站点的 DNS 解析结果替换为你指定的优选 IP，绕过网络干扰，显著提升访问速度和连接成功率。</span>
            <span class="en">Replaces Cloudflare CDN DNS results with your specified preferred IPs, bypassing network interference and significantly improving speed and connection success rate.</span>
          </p>
        </div>
        <div class="feature-card fade-in">
          <div class="feature-icon fi-smart">🎯</div>
          <h3>
            <span class="zh">智能域名分类</span>
            <span class="en">Smart Domain Classification</span>
          </h3>
          <p>
            <span class="zh">自动识别 Twitter/X、Meta、Cloudflare 三大类域名，根据 IP 归属实时判断，针对每种类型采用最优处理策略。</span>
            <span class="en">Automatically identifies Twitter/X, Meta, and Cloudflare domains by IP ownership, applying the optimal processing strategy for each category in real-time.</span>
          </p>
        </div>
        <div class="feature-card fade-in">
          <div class="feature-icon fi-doh">🌍</div>
          <h3>
            <span class="zh">标准 DoH 协议</span>
            <span class="en">Standard DoH Protocol</span>
          </h3>
          <p>
            <span class="zh">完全兼容 RFC 8484 标准，使用 /dns-query 端点，支持 POST 二进制和 GET Base64URL 两种查询方式，与 Google、Cloudflare DoH 行为一致。</span>
            <span class="en">Fully compatible with RFC 8484 standard, using /dns-query endpoint, supporting both POST binary and GET Base64URL queries, matching Google & Cloudflare DoH behavior.</span>
          </p>
        </div>
        <div class="feature-card fade-in">
          <div class="feature-icon fi-camo">🎭</div>
          <h3>
            <span class="zh">404 伪装</span>
            <span class="en">404 Camouflage</span>
          </h3>
          <p>
            <span class="zh">非 API 路径一律返回标准 404 响应，使服务在外部探测中表现为普通的静态站点，降低被识别和封锁的风险。</span>
            <span class="en">Non-API paths return standard 404 responses, making the service appear as an ordinary static site to external probes, reducing detection and blocking risk.</span>
          </p>
        </div>
        <div class="feature-card fade-in">
          <div class="feature-icon fi-std">☁️</div>
          <h3>
            <span class="zh">边缘计算</span>
            <span class="en">Edge Computing</span>
          </h3>
          <p>
            <span class="zh">部署在全球边缘节点上，DNS 查询在离用户最近的节点处理，延迟极低。上游使用 Google DoH 确保解析准确可靠。</span>
            <span class="en">Deployed on global edge nodes, DNS queries are processed at the nearest node with ultra-low latency. Uses Google DoH upstream for accurate and reliable resolution.</span>
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- ARCHITECTURE -->
  <section id="architecture">
    <div class="container">
      <div class="section-tag">
        <span class="zh">架构设计</span>
        <span class="en">ARCHITECTURE</span>
      </div>
      <h2 class="section-title">
        <span class="zh">请求处理流程</span>
        <span class="en">Request Processing Flow</span>
      </h2>
      <p class="section-desc">
        <span class="zh">从浏览器发出 DNS 查询到获得修改后的响应，整个过程在边缘节点完成。</span>
        <span class="en">From browser DNS query to receiving modified responses, the entire process is completed at the edge node.</span>
      </p>

      <!-- Main Architecture Flow -->
      <div class="arch-flow fade-in">
        <div class="arch-node node-browser">
          <h4>🌐 <span class="zh">客户端浏览器</span><span class="en">Client Browser</span></h4>
          <p><span class="zh">Chrome / Edge / Firefox（启用安全 DNS）</span><span class="en">Chrome / Edge / Firefox (Secure DNS enabled)</span></p>
        </div>
        <div class="arch-connector"></div>
        <div class="arch-label">
          POST /dns-query &nbsp;·&nbsp; application/dns-message
        </div>
        <div class="arch-connector"></div>
        <div class="arch-node node-worker">
          <h4>⚡ <span class="zh">边缘 Worker 节点</span><span class="en">Edge Worker Node</span></h4>
          <p><span class="zh">解析 DNS 报文 → 域名分类 → 智能处理</span><span class="en">Parse DNS packet → Classify domain → Smart processing</span></p>
        </div>
        <div class="arch-connector"></div>
        <div class="arch-label">
          <span class="zh">根据域名类型分流处理</span>
          <span class="en">Route by domain type</span>
        </div>
        <div style="height:20px"></div>

        <!-- Branches -->
        <div class="arch-branches">
          <div class="arch-branch branch-twitter">
            <h5>𝕏 Twitter / X</h5>
            <ul>
              <li><span class="record-type">A</span> → <span class="zh">优选 IP</span><span class="en">Preferred IP</span></li>
              <li><span class="record-type">AAAA</span> → <span class="zh">空（不支持）</span><span class="en">Empty (N/A)</span></li>
              <li><span class="record-type">HTTPS</span> → CF ECH</li>
            </ul>
          </div>
          <div class="arch-branch branch-meta">
            <h5>Ⓜ Meta</h5>
            <ul>
              <li><span class="record-type">A</span> → <span class="zh">原始 IP</span><span class="en">Original IP</span></li>
              <li><span class="record-type">AAAA</span> → <span class="zh">原始 IP</span><span class="en">Original IP</span></li>
              <li><span class="record-type">HTTPS</span> → Meta ECH</li>
            </ul>
          </div>
          <div class="arch-branch branch-cf">
            <h5>☁ Cloudflare</h5>
            <ul>
              <li><span class="record-type">A</span> → <span class="zh">优选 IPv4</span><span class="en">Preferred IPv4</span></li>
              <li><span class="record-type">AAAA</span> → <span class="zh">优选 IPv6</span><span class="en">Preferred IPv6</span></li>
              <li><span class="record-type">HTTPS</span> → CF ECH</li>
            </ul>
          </div>
        </div>

        <div style="height:20px"></div>
        <div class="arch-merge">
          <div class="arch-connector"></div>
        </div>
        <div class="arch-label">
          <span class="zh">上游 DNS 查询（仅需要时）</span>
          <span class="en">Upstream DNS query (when needed)</span>
        </div>
        <div class="arch-connector"></div>
        <div class="arch-node node-dns">
          <h4>🔍 Google DNS</h4>
          <p>dns.google &nbsp;·&nbsp; <span class="zh">作为上游 DoH 服务</span><span class="en">As upstream DoH service</span></p>
        </div>
      </div>

      <!-- ECH Comparison -->
      <div style="margin-top:80px">
        <h3 class="section-title" style="font-size:1.5em; text-align:center;">
          <span class="zh">ECH 如何保护你的隐私？</span>
          <span class="en">How ECH Protects Your Privacy</span>
        </h3>
        <p class="section-desc" style="text-align:center; margin-left:auto; margin-right:auto;">
          <span class="zh">ECH 加密了 TLS 握手中的 SNI，使网络中间件无法知道你访问的具体网站。</span>
          <span class="en">ECH encrypts the SNI in TLS handshake, preventing network middleboxes from knowing which site you visit.</span>
        </p>
        <div class="ech-compare fade-in">
          <div class="ech-box ech-without">
            <h4>
              ❌ <span class="zh">无 ECH</span><span class="en">Without ECH</span>
            </h4>
            <div class="ech-flow-item">
              <span class="zh">浏览器</span><span class="en">Browser</span>
              <span class="ech-arrow">→</span>
              <span>TLS ClientHello</span>
            </div>
            <div class="ech-flow-item" style="color:var(--danger);">
              SNI: <strong>example.com</strong> 🔓
            </div>
            <div class="ech-flow-item" style="font-size:0.8em;">
              <span class="zh">⚠️ ISP / 防火墙可见真实域名</span>
              <span class="en">⚠️ ISP / Firewall sees real domain</span>
            </div>
          </div>
          <div class="ech-box ech-with">
            <h4>
              ✅ <span class="zh">启用 ECH</span><span class="en">With ECH</span>
            </h4>
            <div class="ech-flow-item">
              <span class="zh">浏览器</span><span class="en">Browser</span>
              <span class="ech-arrow">→</span>
              <span>TLS ClientHello</span>
            </div>
            <div class="ech-flow-item" style="color:var(--accent);">
              SNI: <strong>encrypted</strong> 🔒
            </div>
            <div class="ech-flow-item" style="font-size:0.8em;">
              <span class="zh">✅ 中间件只看到 CDN 公共名</span>
              <span class="en">✅ Middlebox only sees public CDN name</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- API -->
  <section id="api">
    <div class="container">
      <div class="section-tag">
        <span class="zh">接口文档</span>
        <span class="en">API REFERENCE</span>
      </div>
      <h2 class="section-title">
        <span class="zh">API 使用指南</span>
        <span class="en">API Usage Guide</span>
      </h2>
      <p class="section-desc">
        <span class="zh">完全兼容 RFC 8484 DoH 标准协议，可直接在浏览器安全 DNS 设置中使用。</span>
        <span class="en">Fully compatible with RFC 8484 DoH standard protocol, directly usable in browser secure DNS settings.</span>
      </p>

      <h3 style="color:#fff; margin-bottom:16px; font-size:1.15em;">
        <span class="zh">标准 DoH 查询</span>
        <span class="en">Standard DoH Query</span>
      </h3>
      <div class="api-endpoint">
        <span class="method-badge">POST</span>
        <span class="endpoint-path">/dns-query?ip4=&lt;IPv4&gt;&amp;ip6=&lt;IPv6&gt;&amp;ech=&lt;domain&gt;</span>
      </div>
      <div class="api-endpoint" style="margin-top:-16px;">
        <span class="method-badge" style="background:var(--accent);">GET</span>
        <span class="endpoint-path">/dns-query?dns=&lt;base64url&gt;&amp;ip4=&lt;IPv4&gt;</span>
      </div>

      <h3 style="color:#fff; margin: 32px 0 16px; font-size:1.05em;">
        <span class="zh">请求参数</span>
        <span class="en">Parameters</span>
      </h3>
      <table class="params-table">
        <thead>
          <tr>
            <th><span class="zh">参数</span><span class="en">Param</span></th>
            <th><span class="zh">必填</span><span class="en">Required</span></th>
            <th><span class="zh">说明</span><span class="en">Description</span></th>
            <th><span class="zh">示例</span><span class="en">Example</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>ip4</code></td>
            <td><span class="zh">否</span><span class="en">No</span></td>
            <td>
              <span class="zh">CF 优选 IPv4，多个逗号分隔</span>
              <span class="en">CF preferred IPv4, comma-separated</span>
            </td>
            <td><code>104.17.24.14</code></td>
          </tr>
          <tr>
            <td><code>ip6</code></td>
            <td><span class="zh">否</span><span class="en">No</span></td>
            <td>
              <span class="zh">CF 优选 IPv6</span>
              <span class="en">CF preferred IPv6</span>
            </td>
            <td><code>2606:4700::1</code></td>
          </tr>
          <tr>
            <td><code>ech</code></td>
            <td><span class="zh">否</span><span class="en">No</span></td>
            <td>
              <span class="zh">ECH 来源域名（默认 cloudflare-ech.com）</span>
              <span class="en">ECH source domain (default: cloudflare-ech.com)</span>
            </td>
            <td><code>cloudflare-ech.com</code></td>
          </tr>
          <tr>
            <td><code>dns</code></td>
            <td>GET</td>
            <td>
              <span class="zh">Base64URL 编码的 DNS 查询（GET 请求）</span>
              <span class="en">Base64URL encoded DNS query (GET request)</span>
            </td>
            <td><code>AAABAAAB...</code></td>
          </tr>
        </tbody>
      </table>

      <h3 style="color:#fff; margin: 32px 0 12px; font-size:1.05em;">
        <span class="zh">请求示例</span>
        <span class="en">Examples</span>
      </h3>
      <div class="code-block">
        <span class="cm"># POST (wire-format, standard DoH)</span><br>
        <span class="kw">curl</span> <span class="flag">-X POST</span> <span class="str">"https://your-worker.dev/dns-query?ip4=104.17.24.14"</span> \\<br>
        &nbsp;&nbsp;<span class="flag">-H</span> <span class="str">"Content-Type: application/dns-message"</span> \\<br>
        &nbsp;&nbsp;<span class="flag">--data-binary</span> @dns-query.bin<br><br>
        <span class="cm"># GET (base64url, RFC 8484)</span><br>
        <span class="kw">curl</span> <span class="str">"https://your-worker.dev/dns-query?dns=AAABAAABAAAAAAAAB2V4YW1wbGUDY29tAAABAAE&amp;ip4=104.17.24.14"</span> \\<br>
        &nbsp;&nbsp;<span class="flag">-H</span> <span class="str">"Accept: application/dns-message"</span>
      </div>

      <h3 style="color:#fff; margin: 32px 0 12px; font-size:1.05em;">
        <span class="zh">Chrome DoH 配置 URL 模板</span>
        <span class="en">Chrome DoH Config URL Template</span>
      </h3>
      <div class="code-block">
        https://your-worker.dev/dns-query?ip4=YOUR_PREFERRED_IP
      </div>
    </div>
  </section>

  <!-- SETUP -->
  <section id="setup">
    <div class="container">
      <div class="section-tag">
        <span class="zh">快速配置</span>
        <span class="en">QUICK SETUP</span>
      </div>
      <h2 class="section-title">
        <span class="zh">三步开启安全 DNS</span>
        <span class="en">Three Steps to Secure DNS</span>
      </h2>
      <p class="section-desc">
        <span class="zh">在支持 DoH 的浏览器中配置，即可享受安全、智能的 DNS 解析。</span>
        <span class="en">Configure in any DoH-compatible browser to enjoy secure, smart DNS resolution.</span>
      </p>
      <div class="setup-steps">
        <div class="setup-step fade-in">
          <div class="step-num">1</div>
          <h4>
            <span class="zh">获取优选 IP</span>
            <span class="en">Get Preferred IP</span>
          </h4>
          <p>
            <span class="zh">使用 CloudflareSpeedTest 等工具测试延迟最低的 Cloudflare IP，作为 <code>ip4</code> 参数值。</span>
            <span class="en">Use CloudflareSpeedTest or similar tools to find the lowest-latency Cloudflare IP as your <code>ip4</code> parameter.</span>
          </p>
        </div>
        <div class="setup-step fade-in">
          <div class="step-num">2</div>
          <h4>
            <span class="zh">打开浏览器设置</span>
            <span class="en">Open Browser Settings</span>
          </h4>
          <p>
            <span class="zh">Chrome: <code>chrome://settings/security</code><br>Edge: <code>edge://settings/privacy</code><br>找到「使用安全 DNS」选项并启用。</span>
            <span class="en">Chrome: <code>chrome://settings/security</code><br>Edge: <code>edge://settings/privacy</code><br>Find "Use secure DNS" and enable it.</span>
          </p>
        </div>
        <div class="setup-step fade-in">
          <div class="step-num">3</div>
          <h4>
            <span class="zh">输入 DoH 地址</span>
            <span class="en">Enter DoH URL</span>
          </h4>
          <p>
            <span class="zh">选择「自定义」提供商，输入下方 URL：</span>
            <span class="en">Select "Custom" provider, enter the URL below:</span>
          </p>
        </div>
      </div>
      <div class="doh-url-box" style="margin-top:32px;">
        https://your-worker.dev/dns-query?ip4=YOUR_PREFERRED_IP
      </div>
      <p style="margin-top:16px; color:var(--text-dim); font-size:0.85em; text-align:center;">
        <span class="zh">💡 Chrome 启用 DoH 后会并行查询 A、AAAA、HTTPS 三种记录类型。本服务会自动处理各类型查询并注入 ECH 配置。</span>
        <span class="en">💡 When Chrome enables DoH, it queries A, AAAA, and HTTPS records in parallel. This service automatically handles all query types and injects ECH configs.</span>
      </p>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="container">
      <p>
        <span class="zh">通信自由 · 至少应当是</span>
        <span class="en">Freedom of Communication</span>
      </p>
      <p style="margin-top:8px;">
        Built with Edge Functions &nbsp;·&nbsp;
        <a href="https://github.com/XTLS/BBS/issues/13" target="_blank" rel="noopener noreferrer">
          <span class="zh">参考资料</span>
          <span class="en">Reference</span>
        </a>
      </p>
    </div>
  </footer>

  <script>
    function toggleLang() {
      var body = document.body;
      var btn = document.getElementById("langBtn");
      if (body.classList.contains("lang-zh")) {
        body.classList.remove("lang-zh");
        body.classList.add("lang-en");
        btn.textContent = "中文";
        document.documentElement.lang = "en";
      } else {
        body.classList.remove("lang-en");
        body.classList.add("lang-zh");
        btn.textContent = "English";
        document.documentElement.lang = "zh-CN";
      }
    }
    // Scroll fade-in
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll(".fade-in").forEach(function(el) { observer.observe(el); });
  </script>
</body>
</html>`;
