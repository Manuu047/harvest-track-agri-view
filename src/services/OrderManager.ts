
import { Order } from '@/types/trading';

export class OrderManager {
  private orders: Map<string, Order> = new Map();
  private ordersByStrategy: Map<string, string[]> = new Map();

  addOrder(order: Order): void {
    this.orders.set(order.id, order);
    
    const strategyOrders = this.ordersByStrategy.get(order.strategyId) || [];
    strategyOrders.push(order.id);
    this.ordersByStrategy.set(order.strategyId, strategyOrders);
  }

  getOrder(orderId: string): Order | undefined {
    return this.orders.get(orderId);
  }

  getOrdersByStrategy(strategyId: string): Order[] {
    const orderIds = this.ordersByStrategy.get(strategyId) || [];
    return orderIds.map(id => this.orders.get(id)!).filter(Boolean);
  }

  getPendingOrders(): Order[] {
    return Array.from(this.orders.values())
      .filter(order => order.status === 'pending');
  }

  updateOrderStatus(orderId: string, status: Order['status']): void {
    const order = this.orders.get(orderId);
    if (order) {
      order.status = status;
      if (status === 'filled') {
        order.filledAt = new Date();
      }
    }
  }

  updateOrderFill(orderId: string, filledQuantity: number, filledPrice: number): void {
    const order = this.orders.get(orderId);
    if (order) {
      order.filledQuantity = filledQuantity;
      order.filledPrice = filledPrice;
      if (filledQuantity >= order.quantity) {
        order.status = 'filled';
        order.filledAt = new Date();
      }
    }
  }

  cancelOrder(orderId: string): void {
    const order = this.orders.get(orderId);
    if (order) {
      order.status = 'cancelled';
    }
  }

  getAllOrders(): Order[] {
    return Array.from(this.orders.values());
  }

  getOrderHistory(limit: number = 100): Order[] {
    return Array.from(this.orders.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}
