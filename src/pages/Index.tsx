
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HarvestMetrics from "@/components/HarvestMetrics";
import TradingDashboard from "@/components/TradingDashboard";
import { TrendingUp, BarChart3, Users, Package } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Kamasian Coffee Farm & Trading Dashboard
          </h1>
          <p className="text-gray-600">
            Agricultural management and automated trading system
          </p>
        </div>

        <Tabs defaultValue="harvest" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="harvest" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Harvest Management
            </TabsTrigger>
            <TabsTrigger value="trading" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Trading System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="harvest">
            <HarvestMetrics />
          </TabsContent>

          <TabsContent value="trading">
            <TradingDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
