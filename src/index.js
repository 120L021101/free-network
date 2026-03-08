/**
 * Cloudflare Worker DoH with ECH Support
 * 
 * 功能逻辑：
 * 1. [Twitter/X 域名]: 完全本地伪造响应。A -> 优选IP; AAAA -> 空; HTTPS -> CF ECH。
 * 2. [Meta 域名]: 基于 IP 归属判定。A/AAAA -> 原始IP并去CNAME; HTTPS -> 固定 Meta ECH。
 * 3. [其他 CF 域名]: 基于 IP 归属判定。A/AAAA -> 优选IP; HTTPS -> 动态 CF ECH。
 * 
 * 使用方式:
 * POST /resolve?ip4=x.x.x.x&ip6=xxxx::xxxx&ech=cloudflare-ech.com
 * Content-Type: application/dns-message
 */

import { handleDnsQuery, HOME_PAGE_HTML } from './handler.js';

// API 路径 (不使用 /dns-query)
const API_PATH = '/resolve';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 主页路由
    if (url.pathname === '/' || url.pathname === '/home') {
      return new Response(HOME_PAGE_HTML, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }
    
    // DoH API 路由
    if (url.pathname === API_PATH) {
      const config = {
        ip4: url.searchParams.get('ip4'),
        ip6: url.searchParams.get('ip6'),
        echDomain: url.searchParams.get('ech') || 'cloudflare-ech.com'
      };

      if (request.method === 'POST') {
        const rawBuffer = await request.arrayBuffer();
        return await handleDnsQuery(rawBuffer, config);
      }
      
      // GET 请求返回 API 信息
      if (request.method === 'GET') {
        return new Response(JSON.stringify({
          service: 'DoH with ECH',
          endpoint: API_PATH,
          method: 'POST',
          contentType: 'application/dns-message',
          parameters: {
            ip4: 'Cloudflare 优选 IPv4 (可选)',
            ip6: 'Cloudflare 优选 IPv6 (可选)',
            ech: 'ECH 配置域名 (默认: cloudflare-ech.com)'
          }
        }, null, 2), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    // 其他路径返回 404 伪装
    return new Response('404 Not Found', { 
      status: 404,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};
