
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const HarvestMetrics = () => {
  // Mock data for charts
  const dailyHarvestData = [
    { date: "Mon", amount: 850 },
    { date: "Tue", amount: 920 },
    { date: "Wed", amount: 1100 },
    { date: "Thu", amount: 980 },
    { date: "Fri", amount: 1247 },
    { date: "Sat", amount: 1180 },
    { date: "Sun", amount: 950 },
  ];

  const cropYields = [
    { crop: "Tomatoes", yield: 450, target: 400 },
    { crop: "Corn", yield: 320, target: 350 },
    { crop: "Potatoes", yield: 280, target: 300 },
    { crop: "Carrots", yield: 197, target: 200 },
  ];

  return (
    <div className="space-y-6">
      {/* Daily Harvest Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Daily Harvest Trend</span>
            <Badge variant="secondary">This Week</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyHarvestData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} kg`, "Harvest Amount"]} />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#22c55e" 
                strokeWidth={3}
                dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Crop Yields vs Targets */}
      <Card>
        <CardHeader>
          <CardTitle>Crop Yields vs Targets</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cropYields}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="crop" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="target" fill="#e5e7eb" name="Target" />
              <Bar dataKey="yield" fill="#22c55e" name="Actual Yield" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Field Status Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Field Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "North Field A", crop: "Tomatoes", status: "harvesting", progress: 75 },
              { name: "South Field B", crop: "Corn", status: "ready", progress: 100 },
              { name: "East Field C", crop: "Potatoes", status: "growing", progress: 45 },
              { name: "West Field D", crop: "Carrots", status: "harvesting", progress: 60 },
              { name: "Center Field E", crop: "Lettuce", status: "ready", progress: 100 },
              { name: "North Field F", crop: "Beans", status: "growing", progress: 30 },
            ].map((field, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm text-gray-900">{field.name}</h4>
                  <Badge 
                    variant={field.status === 'ready' ? 'default' : field.status === 'harvesting' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {field.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2">{field.crop}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${field.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{field.progress}% complete</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HarvestMetrics;
