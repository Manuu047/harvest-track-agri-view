
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { Calendar, Database, MapPin, Bell } from "lucide-react";

const Analytics = () => {
  // Mock data for various analytics
  const monthlyTrends = [
    { month: "Jan", harvest: 3200, target: 3000, efficiency: 89 },
    { month: "Feb", harvest: 3800, target: 3500, efficiency: 92 },
    { month: "Mar", harvest: 4200, target: 4000, efficiency: 88 },
    { month: "Apr", harvest: 4800, target: 4500, efficiency: 95 },
    { month: "May", harvest: 5200, target: 5000, efficiency: 94 },
    { month: "Jun", harvest: 5800, target: 5500, efficiency: 96 },
  ];

  const cropDistribution = [
    { name: "Batian", value: 45, color: "#22c55e" },
    { name: "SL34&28", value: 35, color: "#3b82f6" },
    { name: "Ruiru11", value: 20, color: "#f59e0b" },
  ];

  const fieldPerformance = [
    { field: "North Field A", yield: 850, area: 100, efficiency: 96 },
    { field: "South Field B", yield: 720, area: 85, efficiency: 94 },
    { field: "East Field C", yield: 680, area: 90, efficiency: 89 },
    { field: "West Field D", yield: 590, area: 75, efficiency: 92 },
    { field: "Center Field E", yield: 520, area: 70, efficiency: 87 },
    { field: "North Field F", yield: 480, area: 65, efficiency: 85 },
  ];

  const weeklyComparison = [
    { week: "Week 1", thisYear: 4200, lastYear: 3800 },
    { week: "Week 2", thisYear: 4600, lastYear: 4100 },
    { week: "Week 3", thisYear: 5100, lastYear: 4500 },
    { week: "Week 4", thisYear: 5400, lastYear: 4800 },
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select defaultValue="current-month">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-week">Current Week</SelectItem>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="current-year">Current Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all-fields">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select fields" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-fields">All Fields</SelectItem>
              <SelectItem value="north-fields">North Fields</SelectItem>
              <SelectItem value="south-fields">South Fields</SelectItem>
              <SelectItem value="east-west">East & West Fields</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <Calendar className="w-3 h-3 mr-1" />
            Last Updated: 2 hours ago
          </Badge>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Yield</p>
                <p className="text-2xl font-bold text-gray-900">28.4 tons</p>
                <p className="text-xs text-green-600">↗ +12% from last month</p>
              </div>
              <Database className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Efficiency</p>
                <p className="text-2xl font-bold text-gray-900">93.2%</p>
                <p className="text-xs text-green-600">↗ +2.1% from last month</p>
              </div>
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Fields Active</p>
                <p className="text-2xl font-bold text-gray-900">12/15</p>
                <p className="text-xs text-amber-600">3 fields in preparation</p>
              </div>
              <Calendar className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Quality Grade</p>
                <p className="text-2xl font-bold text-gray-900">A-</p>
                <p className="text-xs text-green-600">85% Grade A products</p>
              </div>
              <Bell className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Harvest Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Harvest Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="target" stackId="1" stroke="#e5e7eb" fill="#e5e7eb" name="Target" />
                <Area type="monotone" dataKey="harvest" stackId="2" stroke="#22c55e" fill="#22c55e" name="Actual Harvest" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Coffee Variety Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Coffee Variety Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cropDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {cropDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {cropDistribution.map((crop, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: crop.color }}></div>
                  <span className="text-sm text-gray-600">{crop.name}: {crop.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Field Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Field Performance (Yield per Hectare)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fieldPerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="field" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="yield" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Year-over-Year Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Comparison (This Year vs Last Year)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="thisYear" stroke="#22c55e" strokeWidth={3} name="This Year" />
                <Line type="monotone" dataKey="lastYear" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" name="Last Year" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Field Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-medium text-gray-900">Field</th>
                  <th className="text-left p-3 font-medium text-gray-900">Total Yield (kg)</th>
                  <th className="text-left p-3 font-medium text-gray-900">Area (hectare)</th>
                  <th className="text-left p-3 font-medium text-gray-900">Yield/Hectare</th>
                  <th className="text-left p-3 font-medium text-gray-900">Efficiency</th>
                  <th className="text-left p-3 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {fieldPerformance.map((field, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium">{field.field}</td>
                    <td className="p-3">{field.yield.toLocaleString()}</td>
                    <td className="p-3">{field.area}</td>
                    <td className="p-3">{Math.round(field.yield / field.area)} kg/ha</td>
                    <td className="p-3">
                      <Badge 
                        variant={field.efficiency >= 95 ? "default" : field.efficiency >= 90 ? "secondary" : "destructive"}
                      >
                        {field.efficiency}%
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-green-700 bg-green-50">
                        Active
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
