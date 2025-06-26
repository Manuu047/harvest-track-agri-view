
import { TradingStrategy, Order, MarketData, ExecutionLog } from '@/types/trading';
import { StrategyParser } from './StrategyParser';
import { OrderManager } from './OrderManager';
import { MarketDataService } from './MarketDataService';
import { TradingApiService } from './TradingApiService';
import { Logger } from './Logger';

export class TradingEngine {
  private activeStrategies: Map<string, TradingStrategy> = new Map();
  private orderManager: OrderManager;
  private marketDataService: MarketDataService;
  private apiService: TradingApiService;
  private logger: Logger;
  private isRunning: boolean = false;

  constructor() {
    this.orderManager = new OrderManager();
    this.marketDataService = new MarketDataService();
    this.apiService = new TradingApiService();
    this.logger = new Logger();
  }

  async start(): Promise<void> {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.logger.info('Trading engine started');
    
    // Start market data subscription
    await this.marketDataService.start();
    
    // Subscribe to market data updates
    this.marketDataService.on('marketData', (data: MarketData) => {
      this.processMarketData(data);
    });
    
    // Start order monitoring
    this.startOrderMonitoring();
  }

  async stop(): Promise<void> {
    this.isRunning = false;
    await this.marketDataService.stop();
    this.logger.info('Trading engine stopped');
  }

  async addStrategy(strategyData: string, format: 'json' | 'dsl' = 'json'): Promise<string> {
    try {
      const strategy = format === 'json' 
        ? StrategyParser.parseJSON(strategyData)
        : StrategyParser.parseDSL(strategyData);
      
      this.activeStrategies.set(strategy.id, strategy);
      this.logger.info(`Strategy added: ${strategy.name}`, { strategyId: strategy.id });
      
      return strategy.id;
    } catch (error) {
      this.logger.error(`Failed to add strategy: ${error.message}`);
      throw error;
    }
  }

  async activateStrategy(strategyId: string): Promise<void> {
    const strategy = this.activeStrategies.get(strategyId);
    if (!strategy) {
      throw new Error('Strategy not found');
    }
    
    strategy.status = 'active';
    strategy.updatedAt = new Date();
    this.logger.info(`Strategy activated: ${strategy.name}`, { strategyId });
  }

  async deactivateStrategy(strategyId: string): Promise<void> {
    const strategy = this.activeStrategies.get(strategyId);
    if (!strategy) {
      throw new Error('Strategy not found');
    }
    
    strategy.status = 'inactive';
    strategy.updatedAt = new Date();
    this.logger.info(`Strategy deactivated: ${strategy.name}`, { strategyId });
  }

  private async processMarketData(marketData: MarketData): Promise<void> {
    if (!this.isRunning) return;

    for (const [strategyId, strategy] of this.activeStrategies) {
      if (strategy.status !== 'active') continue;
      
      try {
        await this.evaluateStrategy(strategy, marketData);
      } catch (error) {
        this.logger.error(`Error evaluating strategy ${strategy.name}: ${error.message}`, {
          strategyId,
          error: error.stack
        });
      }
    }
  }

  private async evaluateStrategy(strategy: TradingStrategy, marketData: MarketData): Promise<void> {
    const conditionsMet = await this.evaluateConditions(strategy, marketData);
    
    if (conditionsMet) {
      await this.executeActions(strategy, marketData);
    }
  }

  private async evaluateConditions(strategy: TradingStrategy, marketData: MarketData): Promise<boolean> {
    for (const condition of strategy.conditions) {
      const result = await this.evaluateCondition(condition, marketData);
      if (!result) return false;
    }
    return true;
  }

  private async evaluateCondition(condition: any, marketData: MarketData): Promise<boolean> {
    switch (condition.type) {
      case 'price_threshold':
        return this.evaluatePriceCondition(condition, marketData);
      case 'time_based':
        return this.evaluateTimeCondition(condition);
      case 'technical_indicator':
        return await this.evaluateTechnicalIndicator(condition, marketData);
      default:
        return false;
    }
  }

  private evaluatePriceCondition(condition: any, marketData: MarketData): boolean {
    if (condition.symbol && condition.symbol !== marketData.symbol) {
      return false;
    }

    const price = marketData.price;
    const targetValue = condition.value;

    switch (condition.operator) {
      case '>': return price > targetValue;
      case '<': return price < targetValue;
      case '>=': return price >= targetValue;
      case '<=': return price <= targetValue;
      case '==': return Math.abs(price - targetValue) < 0.01;
      case '!=': return Math.abs(price - targetValue) >= 0.01;
      default: return false;
    }
  }

  private evaluateTimeCondition(condition: any): boolean {
    const now = new Date();
    const targetTime = new Date(condition.value);
    return now >= targetTime;
  }

  private async evaluateTechnicalIndicator(condition: any, marketData: MarketData): Promise<boolean> {
    // Placeholder for technical indicator evaluation
    // In a real implementation, this would calculate indicators like RSI, MACD, etc.
    return true;
  }

  private async executeActions(strategy: TradingStrategy, marketData: MarketData): Promise<void> {
    for (const action of strategy.actions) {
      try {
        await this.executeAction(strategy, action, marketData);
      } catch (error) {
        this.logger.error(`Failed to execute action: ${error.message}`, {
          strategyId: strategy.id,
          actionId: action.id
        });
      }
    }
  }

  private async executeAction(strategy: TradingStrategy, action: any, marketData: MarketData): Promise<void> {
    const order: Partial<Order> = {
      id: Math.random().toString(36).substr(2, 9),
      strategyId: strategy.id,
      symbol: action.symbol,
      type: action.type,
      quantity: action.quantity,
      price: action.price,
      status: 'pending',
      createdAt: new Date()
    };

    // Risk management checks
    if (!this.checkRiskManagement(strategy, order as Order)) {
      this.logger.warning('Order rejected by risk management', {
        strategyId: strategy.id,
        orderId: order.id
      });
      return;
    }

    // Submit order to exchange
    try {
      const exchangeOrderId = await this.apiService.placeOrder(order as Order);
      order.exchangeOrderId = exchangeOrderId;
      order.status = 'pending';
      
      this.orderManager.addOrder(order as Order);
      
      this.logger.info('Order placed successfully', {
        strategyId: strategy.id,
        orderId: order.id,
        exchangeOrderId
      });
    } catch (error) {
      order.status = 'rejected';
      this.logger.error(`Order placement failed: ${error.message}`, {
        strategyId: strategy.id,
        orderId: order.id
      });
    }
  }

  private checkRiskManagement(strategy: TradingStrategy, order: Order): boolean {
    const riskMgmt = strategy.riskManagement;
    
    // Check position size
    if (order.quantity * (order.price || 0) > riskMgmt.maxPositionSize) {
      return false;
    }
    
    // Additional risk checks would go here
    return true;
  }

  private startOrderMonitoring(): void {
    setInterval(() => {
      this.monitorOrders();
    }, 5000); // Check every 5 seconds
  }

  private async monitorOrders(): Promise<void> {
    const pendingOrders = this.orderManager.getPendingOrders();
    
    for (const order of pendingOrders) {
      try {
        const status = await this.apiService.getOrderStatus(order.exchangeOrderId!);
        if (status !== order.status) {
          this.orderManager.updateOrderStatus(order.id, status);
          this.logger.info(`Order status updated: ${order.id} -> ${status}`);
        }
      } catch (error) {
        this.logger.error(`Failed to check order status: ${error.message}`, {
          orderId: order.id
        });
      }
    }
  }

  getActiveStrategies(): TradingStrategy[] {
    return Array.from(this.activeStrategies.values());
  }

  getStrategyById(id: string): TradingStrategy | undefined {
    return this.activeStrategies.get(id);
  }
}
