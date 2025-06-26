
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TradingEngine } from '@/services/TradingEngine';
import { TradingStrategy, Order, ExecutionLog } from '@/types/trading';
import { Play, Pause, Plus, Trash2, Settings } from 'lucide-react';

const TradingDashboard = () => {
  const [engine] = useState(() => new TradingEngine());
  const [strategies, setStrategies] = useState<TradingStrategy[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [logs, setLogs] = useState<ExecutionLog[]>([]);
  const [newStrategy, setNewStrategy] = useState('');
  const [strategyFormat, setStrategyFormat] = useState<'json' | 'dsl'>('json');
  const [isEngineRunning, setIsEngineRunning] = useState(false);

  useEffect(() => {
    // Initialize with sample data
    const sampleStrategyJSON = `{
  "name": "Simple BTC Buy Strategy",
  "description": "Buy BTC when price drops below 49000",
  "conditions": [
    {
      "id": "1",
      "type": "price_threshold",
      "operator": "<",
      "value": 49000,
      "symbol": "BTCUSDT"
    }
  ],
  "actions": [
    {
      "id": "1",
      "type": "buy_limit",
      "symbol": "BTCUSDT",
      "quantity": 0.1,
      "price": 48900,
      "conditions": ["1"]
    }
  ],
  "riskManagement": {
    "maxPositionSize": 5000,
    "stopLoss": 0.05,
    "takeProfit": 0.1,
    "maxDrawdown": 0.2,
    "dailyLossLimit": 1000
  }
}`;

    setNewStrategy(sampleStrategyJSON);
  }, []);

  const handleStartEngine = async () => {
    try {
      await engine.start();
      setIsEngineRunning(true);
    } catch (error) {
      console.error('Failed to start engine:', error);
    }
  };

  const handleStopEngine = async () => {
    try {
      await engine.stop();
      setIsEngineRunning(false);
    } catch (error) {
      console.error('Failed to stop engine:', error);
    }
  };

  const handleAddStrategy = async () => {
    try {
      const strategyId = await engine.addStrategy(newStrategy, strategyFormat);
      setStrategies(engine.getActiveStrategies());
      setNewStrategy('');
      console.log('Strategy added:', strategyId);
    } catch (error) {
      console.error('Failed to add strategy:', error);
    }
  };

  const handleActivateStrategy = async (strategyId: string) => {
    try {
      await engine.activateStrategy(strategyId);
      setStrategies(engine.getActiveStrategies());
    } catch (error) {
      console.error('Failed to activate strategy:', error);
    }
  };

  const handleDeactivateStrategy = async (strategyId: string) => {
    try {
      await engine.deactivateStrategy(strategyId);
      setStrategies(engine.getActiveStrategies());
    } catch (error) {
      console.error('Failed to deactivate strategy:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'paused': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'filled': return 'bg-green-500';
      case 'pending': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      case 'rejected': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Engine Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Trading Engine</span>
            <div className="flex gap-2">
              <Button 
                onClick={isEngineRunning ? handleStopEngine : handleStartEngine}
                variant={isEngineRunning ? "destructive" : "default"}
                size="sm"
              >
                {isEngineRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isEngineRunning ? 'Stop' : 'Start'}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge className={isEngineRunning ? 'bg-green-500' : 'bg-red-500'}>
              {isEngineRunning ? 'Running' : 'Stopped'}
            </Badge>
            <span className="text-sm text-gray-600">
              Strategies: {strategies.length} | Active: {strategies.filter(s => s.status === 'active').length}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Add Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Trading Strategy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Select value={strategyFormat} onValueChange={(value: 'json' | 'dsl') => setStrategyFormat(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="dsl">DSL</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddStrategy} className="ml-auto">
              Add Strategy
            </Button>
          </div>
          <Textarea
            value={newStrategy}
            onChange={(e) => setNewStrategy(e.target.value)}
            placeholder={strategyFormat === 'json' ? 'Enter strategy JSON...' : 'Enter strategy DSL...'}
            className="min-h-[200px] font-mono text-sm"
          />
        </CardContent>
      </Card>

      {/* Active Strategies */}
      <Card>
        <CardHeader>
          <CardTitle>Active Strategies</CardTitle>
        </CardHeader>
        <CardContent>
          {strategies.length === 0 ? (
            <p className="text-gray-500">No strategies added yet.</p>
          ) : (
            <div className="space-y-4">
              {strategies.map((strategy) => (
                <div key={strategy.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{strategy.name}</h3>
                      <Badge className={getStatusColor(strategy.status)}>
                        {strategy.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => strategy.status === 'active' 
                          ? handleDeactivateStrategy(strategy.id)
                          : handleActivateStrategy(strategy.id)}
                      >
                        {strategy.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{strategy.description}</p>
                  <div className="text-xs text-gray-500">
                    Conditions: {strategy.conditions?.length || 0} | 
                    Actions: {strategy.actions?.length || 0} |
                    Created: {strategy.createdAt?.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders executed yet.</p>
          ) : (
            <div className="space-y-2">
              {orders.slice(0, 10).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <Badge className={getOrderStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <span className="font-medium">{order.symbol}</span>
                    <span className="text-sm">{order.type}</span>
                  </div>
                  <div className="text-right text-sm">
                    <div>Qty: {order.quantity}</div>
                    <div>Price: ${order.price?.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* System Logs */}
      <Card>
        <CardHeader>
          <CardTitle>System Logs</CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs available.</p>
          ) : (
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {logs.slice(0, 20).map((log) => (
                <div key={log.id} className="text-sm font-mono">
                  <span className="text-gray-500">{log.timestamp.toLocaleTimeString()}</span>
                  <span className={`ml-2 px-1 rounded text-xs ${
                    log.level === 'error' ? 'bg-red-100 text-red-800' :
                    log.level === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {log.level.toUpperCase()}
                  </span>
                  <span className="ml-2">{log.message}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TradingDashboard;
