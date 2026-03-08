/**
 * Cloudflare Worker / ESA Edge Function - DoH with ECH Support
 * 
 * 使用标准 RFC 8484 DoH 路径: /dns-query
 * 支持 POST (wire-format) 和 GET (?dns= base64url)
 */

import { handleDnsQuery } from './handler.js';
import { HOME_PAGE_HTML } from './homepage.js';

const API_PATH = '/dns-query';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 主页
    if (url.pathname === '/' || url.pathname === '/home') {
      return new Response(HOME_PAGE_HTML, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }

    // DoH API
    if (url.pathname === API_PATH) {
      const config = {
        ip4: url.searchParams.get('ip4'),
        ip6: url.searchParams.get('ip6'),
        echDomain: url.searchParams.get('ech') || 'cloudflare-ech.com'
      };

      // POST: wire-format DNS query in body (standard DoH)
      if (request.method === 'POST') {
        const rawBuffer = await request.arrayBuffer();
        return await handleDnsQuery(rawBuffer, config);
      }

      // GET: base64url encoded DNS query via ?dns= param (RFC 8484)
      if (request.method === 'GET') {
        const dnsParam = url.searchParams.get('dns');
        if (dnsParam) {
          const rawBuffer = base64urlToBuffer(dnsParam);
          if (rawBuffer) {
            return await handleDnsQuery(rawBuffer, config);
          }
          return new Response('Bad Request: invalid dns parameter', { status: 400 });
        }
        // GET without dns= param: 400 per RFC 8484
        return new Response('Bad Request', { status: 400 });
      }

      return new Response('Method Not Allowed', { status: 405 });
    }

    // 其他路径: 404 伪装
    return new Response('404 Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};

/**
 * Decode base64url to ArrayBuffer (RFC 8484 GET support)
 */
function base64urlToBuffer(str) {
  try {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const pad = (4 - base64.length % 4) % 4;
    const padded = base64 + '='.repeat(pad);
    const binary = atob(padded);
    const buf = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      buf[i] = binary.charCodeAt(i);
    }
    return buf.buffer;
  } catch (e) {
    return null;
  }
}
