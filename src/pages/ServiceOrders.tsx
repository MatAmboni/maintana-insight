import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Filter,
  Zap,
  Wrench,
  Clock,
  User,
  Calendar
} from "lucide-react";

const serviceOrders = [
  {
    id: "SO-2024-001",
    title: "Electrical Panel Maintenance",
    equipment: "Electrical Panel A3",
    type: "Electrical",
    priority: "Critical",
    status: "In Progress",
    assignee: "John Smith",
    created: "2024-01-15",
    dueDate: "2024-01-18",
    description: "Routine maintenance and safety inspection of main electrical panel"
  },
  {
    id: "SO-2024-002",
    title: "Conveyor Belt Repair",
    equipment: "Conveyor Belt B2", 
    type: "Mechanical",
    priority: "Medium",
    status: "Pending",
    assignee: "Sarah Johnson",
    created: "2024-01-16",
    dueDate: "2024-01-20",
    description: "Replace worn belt components and lubricate bearings"
  },
  {
    id: "SO-2024-003",
    title: "HVAC System Check",
    equipment: "HVAC Unit C1",
    type: "Mechanical", 
    priority: "High",
    status: "Completed",
    assignee: "Mike Wilson",
    created: "2024-01-14",
    dueDate: "2024-01-17",
    description: "Complete system diagnostic and filter replacement"
  },
  {
    id: "SO-2024-004",
    title: "Motor Drive Calibration",
    equipment: "Motor Drive Unit 5",
    type: "Electrical",
    priority: "High",
    status: "Assigned",
    assignee: "Lisa Chen",
    created: "2024-01-17",
    dueDate: "2024-01-19",
    description: "Recalibrate motor control parameters and test safety systems"
  },
  {
    id: "SO-2024-005",
    title: "Pump System Overhaul", 
    equipment: "Pump System 3",
    type: "Mechanical",
    priority: "Critical",
    status: "Planning",
    assignee: "David Brown",
    created: "2024-01-17",
    dueDate: "2024-01-22",
    description: "Complete pump disassembly, inspection, and rebuild"
  }
];

export default function ServiceOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical": return "bg-status-critical text-status-critical-foreground";
      case "high": return "bg-status-maintenance text-status-maintenance-foreground";
      case "medium": return "bg-status-warning text-status-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-status-operational text-status-operational-foreground";
      case "in progress": return "bg-accent text-accent-foreground";
      case "assigned": return "bg-primary text-primary-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const filteredOrders = serviceOrders.filter(order => {
    const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === "all" || 
                      (activeTab === "electrical" && order.type === "Electrical") ||
                      (activeTab === "mechanical" && order.type === "Mechanical");
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Service Orders</h1>
          <p className="text-muted-foreground">Manage and track maintenance work orders</p>
        </div>
        <Button className="w-fit">
          <Plus className="h-4 w-4 mr-2" />
          Create New Order
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders, equipment, or assignees..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Orders ({serviceOrders.length})</TabsTrigger>
          <TabsTrigger value="electrical">
            <Zap className="h-4 w-4 mr-1" />
            Electrical ({serviceOrders.filter(o => o.type === "Electrical").length})
          </TabsTrigger>
          <TabsTrigger value="mechanical">
            <Wrench className="h-4 w-4 mr-1" />
            Mechanical ({serviceOrders.filter(o => o.type === "Mechanical").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid gap-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg">{order.title}</CardTitle>
                        <Badge className={getPriorityColor(order.priority)}>{order.priority}</Badge>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.id}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{order.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      {order.type === "Electrical" ? <Zap className="h-4 w-4" /> : <Wrench className="h-4 w-4" />}
                      <span className="text-muted-foreground">Equipment:</span>
                      <span className="font-medium">{order.equipment}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="text-muted-foreground">Assignee:</span>
                      <span className="font-medium">{order.assignee}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-muted-foreground">Created:</span>
                      <span className="font-medium">{order.created}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-muted-foreground">Due:</span>
                      <span className="font-medium">{order.dueDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}