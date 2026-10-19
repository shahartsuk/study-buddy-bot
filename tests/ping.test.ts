import { describe, expect, it } from 'vitest';
import ping, { formatPingReply } from '../src/commands/ping.js';

describe('/ping', () => {
  it('is registered under the name "ping"', () => {
    expect(ping.data.name).toBe('ping');
  });

  it('replies with pong and both latencies', () => {
    expect(formatPingReply(120, 45.6)).toBe(
      '🏓 Pong from Study Buddy! Response time: 120ms | WebSocket: 46ms',
    );
  });

  it('handles a websocket ping that was not measured yet', () => {
    expect(formatPingReply(120, -1)).toContain('WebSocket: not measured yet');
  });
});
