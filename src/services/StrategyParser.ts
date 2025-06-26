
import { TradingStrategy, StrategyCondition, StrategyAction } from '@/types/trading';

export class StrategyParser {
  static parseJSON(strategyJson: string): TradingStrategy {
    try {
      const parsed = JSON.parse(strategyJson);
      return this.validateAndNormalize(parsed);
    } catch (error) {
      throw new Error(`Failed to parse strategy JSON: ${error.message}`);
    }
  }

  static parseDSL(strategyDSL: string): TradingStrategy {
    // Simple DSL parser for trading strategies
    const lines = strategyDSL.split('\n').filter(line => line.trim());
    const strategy: Partial<TradingStrategy> = {
      id: this.generateId(),
      conditions: [],
      actions: [],
      riskManagement: {
        maxPositionSize: 1000,
        maxDrawdown: 0.1,
        dailyLossLimit: 500
      },
      status: 'inactive',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    for (const line of lines) {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('STRATEGY:')) {
        strategy.name = trimmed.split(':')[1].trim();
      } else if (trimmed.startsWith('IF')) {
        const condition = this.parseConditionDSL(trimmed);
        strategy.conditions?.push(condition);
      } else if (trimmed.startsWith('THEN')) {
        const action = this.parseActionDSL(trimmed);
        strategy.actions?.push(action);
      }
    }

    return this.validateAndNormalize(strategy as TradingStrategy);
  }

  private static parseConditionDSL(line: string): StrategyCondition {
    // Parse conditions like "IF BTCUSDT price > 50000"
    const parts = line.replace('IF', '').trim().split(' ');
    const symbol = parts[0];
    const field = parts[1];
    const operator = parts[2] as any;
    const value = parseFloat(parts[3]);

    return {
      id: this.generateId(),
      type: 'price_threshold',
      operator,
      value,
      symbol
    };
  }

  private static parseActionDSL(line: string): StrategyAction {
    // Parse actions like "THEN BUY_LIMIT BTCUSDT 0.1 at 49000"
    const parts = line.replace('THEN', '').trim().split(' ');
    const type = parts[0].toLowerCase() as any;
    const symbol = parts[1];
    const quantity = parseFloat(parts[2]);
    const price = parts[4] ? parseFloat(parts[4]) : undefined;

    return {
      id: this.generateId(),
      type,
      symbol,
      quantity,
      price,
      conditions: []
    };
  }

  private static validateAndNormalize(strategy: TradingStrategy): TradingStrategy {
    if (!strategy.name) {
      throw new Error('Strategy must have a name');
    }
    
    if (!strategy.conditions || strategy.conditions.length === 0) {
      throw new Error('Strategy must have at least one condition');
    }
    
    if (!strategy.actions || strategy.actions.length === 0) {
      throw new Error('Strategy must have at least one action');
    }

    return strategy;
  }

  private static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
