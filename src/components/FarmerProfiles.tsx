
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Bell, Calendar, Database } from "lucide-react";

const FarmerProfiles = () => {
  const farmers = [
    {
      id: 1,
      name: "John Smith",
      role: "Field Supervisor",
      fields: ["North Field A", "North Field F"],
      todayHarvest: "450kg",
      totalHarvest: "2,850kg",
      efficiency: 96,
      status: "active",
      lastActive: "2 hours ago",
      notifications: 3,
    },
    {
      id: 2,
      name: "Maria Garcia",
      role: "Harvest Coordinator",
      fields: ["South Field B", "Center Field E"],
      todayHarvest: "380kg",
      totalHarvest: "2,150kg",
      efficiency: 94,
      status: "active",
      lastActive: "1 hour ago",
      notifications: 1,
    },
    {
      id: 3,
      name: "David Chen",
      role: "Quality Inspector",
      fields: ["East Field C"],
      todayHarvest: "320kg",
      totalHarvest: "1,890kg",
      efficiency: 92,
      status: "offline",
      lastActive: "6 hours ago",
      notifications: 0,
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "Field Worker",
      fields: ["West Field D"],
      todayHarvest: "280kg",
      totalHarvest: "1,650kg",
      efficiency: 89,
      status: "active",
      lastActive: "30 minutes ago",
      notifications: 2,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 95) return "text-green-600 bg-green-100";
    if (efficiency >= 90) return "text-blue-600 bg-blue-100";
    return "text-amber-600 bg-amber-100";
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-sm text-gray-600">Active Workers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Fields Covered</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">6</p>
                <p className="text-sm text-gray-600">Pending Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Farmer Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {farmers.map((farmer) => (
          <Card key={farmer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-green-100 text-green-700 font-medium">
                        {farmer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(farmer.status)} rounded-full border-2 border-white`}></div>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{farmer.name}</CardTitle>
                    <p className="text-sm text-gray-600">{farmer.role}</p>
                  </div>
                </div>
                {farmer.notifications > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {farmer.notifications}
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-900">{farmer.todayHarvest}</p>
                  <p className="text-xs text-gray-600">Today</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-900">{farmer.totalHarvest}</p>
                  <p className="text-xs text-gray-600">Total</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className={`text-lg font-bold px-2 py-1 rounded ${getEfficiencyColor(farmer.efficiency)}`}>
                    {farmer.efficiency}%
                  </p>
                  <p className="text-xs text-gray-600">Efficiency</p>
                </div>
              </div>

              {/* Assigned Fields */}
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Assigned Fields:</p>
                <div className="flex flex-wrap gap-1">
                  {farmer.fields.map((field, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {field}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Last Active */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Last active: {farmer.lastActive}</span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Bell className="w-3 h-3 mr-1" />
                    Notify
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="w-3 h-3 mr-1" />
                    Schedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Leaderboard (This Week)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {farmers
              .sort((a, b) => b.efficiency - a.efficiency)
              .map((farmer, index) => (
                <div key={farmer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{farmer.name}</p>
                      <p className="text-sm text-gray-600">{farmer.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{farmer.totalHarvest}</p>
                    <p className="text-sm text-gray-600">{farmer.efficiency}% efficiency</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerProfiles;
