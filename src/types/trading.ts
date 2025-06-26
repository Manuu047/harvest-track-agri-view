
export interface TradingStrategy {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'paused';
  conditions: StrategyCondition[];
  actions: StrategyAction[];
  riskManagement: RiskManagement;
  createdAt: Date;
  updatedAt: Date;
}

export interface StrategyCondition {
  id: string;
  type: 'price_threshold' | 'time_based' | 'technical_indicator' | 'volume_threshold';
  operator: '>' | '<' | '>=' | '<=' | '==' | '!=';
  value: number | string;
  symbol?: string;
  timeframe?: string;
  indicator?: TechnicalIndicator;
}

export interface TechnicalIndicator {
  type: 'sma' | 'ema' | 'rsi' | 'macd' | 'bollinger_bands';
  period: number;
  parameters?: Record<string, any>;
}

export interface StrategyAction {
  id: string;
  type: 'buy_limit' | 'sell_limit' | 'buy_market' | 'sell_market' | 'cancel_order';
  symbol: string;
  quantity: number;
  price?: number;
  timeInForce?: 'GTC' | 'IOC' | 'FOK';
  conditions: string[];
}

export interface RiskManagement {
  maxPositionSize: number;
  stopLoss?: number;
  takeProfit?: number;
  maxDrawdown: number;
  dailyLossLimit: number;
}

export interface Order {
  id: string;
  strategyId: string;
  symbol: string;
  type: 'buy_limit' | 'sell_limit' | 'buy_market' | 'sell_market';
  quantity: number;
  price?: number;
  status: 'pending' | 'filled' | 'cancelled' | 'rejected' | 'expired';
  exchangeOrderId?: string;
  createdAt: Date;
  filledAt?: Date;
  filledQuantity?: number;
  filledPrice?: number;
}

export interface MarketData {
  symbol: string;
  price: number;
  volume: number;
  timestamp: Date;
  bid?: number;
  ask?: number;
  high24h?: number;
  low24h?: number;
}

export interface TradingApiConfig {
  exchange: 'binance' | 'coinbase' | 'metatrader';
  apiKey: string;
  apiSecret: string;
  sandbox?: boolean;
  baseUrl?: string;
}

export interface ExecutionLog {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error';
  strategyId?: string;
  orderId?: string;
  message: string;
  data?: Record<string, any>;
}
