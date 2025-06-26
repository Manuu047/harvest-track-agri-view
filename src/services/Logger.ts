import { ExecutionLog } from '@/types/trading';

export class Logger {
  private logs: ExecutionLog[] = [];
  private maxLogs: number = 10000;

  info(message: string, data?: Record<string, any>): void {
    this.addLog('info', message, data);
  }

  warning(message: string, data?: Record<string, any>): void {
    this.addLog('warning', message, data);
  }

  error(message: string, data?: Record<string, any>): void {
    this.addLog('error', message, data);
  }

  private addLog(level: ExecutionLog['level'], message: string, data?: Record<string, any>): void {
    const log: ExecutionLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      level,
      message,
      data,
      strategyId: data?.strategyId,
      orderId: data?.orderId
    };

    this.logs.unshift(log);
    
    // Keep only the most recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    // Also log to console
    const logMethod = level === 'error' ? console.error : level === 'warning' ? console.warn : console.log;
    logMethod(`[${level.toUpperCase()}] ${message}`, data || '');
  }

  getLogs(level?: ExecutionLog['level'], limit: number = 100): ExecutionLog[] {
    let filteredLogs = this.logs;
    
    if (level) {
      filteredLogs = this.logs.filter(log => log.level === level);
    }
    
    return filteredLogs.slice(0, limit);
  }

  getLogsByStrategy(strategyId: string, limit: number = 100): ExecutionLog[] {
    return this.logs
      .filter(log => log.strategyId === strategyId)
      .slice(0, limit);
  }

  getLogsByOrder(orderId: string): ExecutionLog[] {
    return this.logs.filter(log => log.orderId === orderId);
  }

  clearLogs(): void {
    this.logs = [];
  }

  exportLogs(format: 'json' | 'csv' = 'json'): string {
    if (format === 'csv') {
      const headers = ['timestamp', 'level', 'message', 'strategyId', 'orderId'];
      const rows = this.logs.map(log => [
        log.timestamp.toISOString(),
        log.level,
        log.message,
        log.strategyId || '',
        log.orderId || ''
      ]);
      
      return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    }
    
    return JSON.stringify(this.logs, null, 2);
  }
}
