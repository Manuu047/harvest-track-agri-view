
import { MarketData } from '@/types/trading';

export class MarketDataService {
  private listeners: Map<string, Function[]> = new Map();
  private isRunning: boolean = false;
  private websockets: Map<string, WebSocket> = new Map();
  private subscribedSymbols: Set<string> = new Set();

  async start(): Promise<void> {
    if (this.isRunning) return;
    this.isRunning = true;
    console.log('Market data service started');
  }

  async stop(): Promise<void> {
    this.isRunning = false;
    
    // Close all websocket connections
    for (const [symbol, ws] of this.websockets) {
      ws.close();
    }
    this.websockets.clear();
    
    console.log('Market data service stopped');
  }

  subscribe(symbol: string): void {
    if (this.subscribedSymbols.has(symbol)) return;
    
    this.subscribedSymbols.add(symbol);
    this.connectToSymbol(symbol);
  }

  unsubscribe(symbol: string): void {
    this.subscribedSymbols.delete(symbol);
    
    const ws = this.websockets.get(symbol);
    if (ws) {
      ws.close();
      this.websockets.delete(symbol);
    }
  }

  on(event: string, callback: Function): void {
    const eventListeners = this.listeners.get(event) || [];
    eventListeners.push(callback);
    this.listeners.set(event, eventListeners);
  }

  off(event: string, callback: Function): void {
    const eventListeners = this.listeners.get(event) || [];
    const index = eventListeners.indexOf(callback);
    if (index > -1) {
      eventListeners.splice(index, 1);
    }
  }

  private connectToSymbol(symbol: string): void {
    // Mock WebSocket connection for demonstration
    // In a real implementation, this would connect to actual exchange APIs
    
    const mockData = () => {
      const basePrice = 50000; // Base price for demo
      const price = basePrice + (Math.random() - 0.5) * 1000;
      
      const marketData: MarketData = {
        symbol,
        price,
        volume: Math.random() * 1000,
        timestamp: new Date(),
        bid: price - 0.5,
        ask: price + 0.5,
        high24h: price + Math.random() * 500,
        low24h: price - Math.random() * 500
      };
      
      this.emit('marketData', marketData);
    };

    // Simulate real-time data updates
    const interval = setInterval(mockData, 1000);
    
    // Store interval reference (in real implementation, this would be WebSocket)
    this.websockets.set(symbol, { close: () => clearInterval(interval) } as any);
    
    console.log(`Subscribed to market data for ${symbol}`);
  }

  private emit(event: string, data: any): void {
    const eventListeners = this.listeners.get(event) || [];
    eventListeners.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error in market data event listener:', error);
      }
    });
  }

  // REST API methods
  async getLatestPrice(symbol: string): Promise<number> {
    // Mock implementation - would call actual exchange API
    return 50000 + (Math.random() - 0.5) * 1000;
  }

  async getHistoricalData(symbol: string, interval: string, limit: number = 100): Promise<MarketData[]> {
    // Mock historical data
    const data: MarketData[] = [];
    const basePrice = 50000;
    
    for (let i = 0; i < limit; i++) {
      data.push({
        symbol,
        price: basePrice + (Math.random() - 0.5) * 1000,
        volume: Math.random() * 1000,
        timestamp: new Date(Date.now() - i * 60000) // 1 minute intervals
      });
    }
    
    return data.reverse();
  }
}
