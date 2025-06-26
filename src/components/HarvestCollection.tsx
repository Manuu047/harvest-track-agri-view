
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, Database, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HarvestCollection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    crop: "",
    field: "",
    quantity: "",
    quality: "",
    worker: "",
  });

  // Mock data for recent collections
  const recentCollections = [
    { id: 1, crop: "Tomatoes", field: "North Field A", quantity: "250kg", worker: "John Smith", time: "10:30 AM", quality: "Grade A" },
    { id: 2, crop: "Corn", field: "South Field B", quantity: "180kg", worker: "Maria Garcia", time: "09:45 AM", quality: "Grade B" },
    { id: 3, crop: "Potatoes", field: "East Field C", quantity: "320kg", worker: "David Chen", time: "08:15 AM", quality: "Grade A" },
    { id: 4, crop: "Carrots", field: "West Field D", quantity: "150kg", worker: "Sarah Johnson", time: "07:30 AM", quality: "Grade A" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Harvest Logged Successfully",
      description: `${formData.quantity} of ${formData.crop} recorded from ${formData.field}`,
    });
    setFormData({ crop: "", field: "", quantity: "", quality: "", worker: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Collection Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-green-600" />
              <span>Log New Harvest</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="crop">Crop Type</Label>
                  <Select value={formData.crop} onValueChange={(value) => handleInputChange("crop", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tomatoes">Tomatoes</SelectItem>
                      <SelectItem value="corn">Corn</SelectItem>
                      <SelectItem value="potatoes">Potatoes</SelectItem>
                      <SelectItem value="carrots">Carrots</SelectItem>
                      <SelectItem value="lettuce">Lettuce</SelectItem>
                      <SelectItem value="beans">Beans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="field">Field Location</Label>
                  <Select value={formData.field} onValueChange={(value) => handleInputChange("field", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="north-a">North Field A</SelectItem>
                      <SelectItem value="south-b">South Field B</SelectItem>
                      <SelectItem value="east-c">East Field C</SelectItem>
                      <SelectItem value="west-d">West Field D</SelectItem>
                      <SelectItem value="center-e">Center Field E</SelectItem>
                      <SelectItem value="north-f">North Field F</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity (kg)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Enter weight"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="quality">Quality Grade</Label>
                  <Select value={formData.quality} onValueChange={(value) => handleInputChange("quality", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grade-a">Grade A</SelectItem>
                      <SelectItem value="grade-b">Grade B</SelectItem>
                      <SelectItem value="grade-c">Grade C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="worker">Field Worker</Label>
                <Select value={formData.worker} onValueChange={(value) => handleInputChange("worker", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select worker" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-smith">John Smith</SelectItem>
                    <SelectItem value="maria-garcia">Maria Garcia</SelectItem>
                    <SelectItem value="david-chen">David Chen</SelectItem>
                    <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                <Database className="w-4 h-4 mr-2" />
                Log Harvest
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <MapPin className="w-4 h-4 mr-2" />
              GPS Tag Current Location
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Search className="w-4 h-4 mr-2" />
              Scan Barcode/QR Code
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Collection
            </Button>
            
            {/* Today's Summary */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">Today's Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Total Collections:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Total Weight:</span>
                  <span className="font-medium">1,247 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Active Workers:</span>
                  <span className="font-medium">8</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Collections Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Collections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-medium text-gray-900">Crop</th>
                  <th className="text-left p-3 font-medium text-gray-900">Field</th>
                  <th className="text-left p-3 font-medium text-gray-900">Quantity</th>
                  <th className="text-left p-3 font-medium text-gray-900">Quality</th>
                  <th className="text-left p-3 font-medium text-gray-900">Worker</th>
                  <th className="text-left p-3 font-medium text-gray-900">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentCollections.map((collection) => (
                  <tr key={collection.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">{collection.crop}</td>
                    <td className="p-3">{collection.field}</td>
                    <td className="p-3 font-medium">{collection.quantity}</td>
                    <td className="p-3">
                      <Badge variant={collection.quality === "Grade A" ? "default" : "secondary"}>
                        {collection.quality}
                      </Badge>
                    </td>
                    <td className="p-3">{collection.worker}</td>
                    <td className="p-3 text-gray-600">{collection.time}</td>
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

export default HarvestCollection;
