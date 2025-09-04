import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter,
  Zap,
  Wrench,
  Calendar,
  MapPin,
  Activity,
  Plus
} from "lucide-react";

const equipment = [
  {
    id: "EQ-001",
    name: "Electrical Panel A3",
    type: "Electrical",
    status: "Operational",
    location: "Building A - Floor 3",
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-04-10", 
    healthScore: 85,
    manufacturer: "Schneider Electric",
    model: "Prisma Plus P",
    yearInstalled: "2019"
  },
  {
    id: "EQ-002", 
    name: "Conveyor Belt B2",
    type: "Mechanical",
    status: "Warning",
    location: "Production Line B",
    lastMaintenance: "2024-01-05",
    nextMaintenance: "2024-01-20",
    healthScore: 65,
    manufacturer: "Siemens",
    model: "SIMATIC Belt System",
    yearInstalled: "2020"
  },
  {
    id: "EQ-003",
    name: "HVAC Unit C1", 
    type: "Mechanical",
    status: "Operational",
    location: "Building C - Roof",
    lastMaintenance: "2024-01-14",
    nextMaintenance: "2024-03-14",
    healthScore: 92,
    manufacturer: "Carrier",
    model: "AquaEdge 19XR",
    yearInstalled: "2018"
  },
  {
    id: "EQ-004",
    name: "Motor Drive Unit 5",
    type: "Electrical", 
    status: "Critical",
    location: "Machine Shop",
    lastMaintenance: "2023-12-20",
    nextMaintenance: "2024-01-18",
    healthScore: 35,
    manufacturer: "ABB",
    model: "ACS880",
    yearInstalled: "2017"
  },
  {
    id: "EQ-005",
    name: "Pump System 3",
    type: "Mechanical",
    status: "Maintenance",
    location: "Utility Room",
    lastMaintenance: "2024-01-12", 
    nextMaintenance: "2024-02-12",
    healthScore: 58,
    manufacturer: "Grundfos",
    model: "CR Series",
    yearInstalled: "2021"
  },
  {
    id: "EQ-006",
    name: "Transformer T2",
    type: "Electrical",
    status: "Operational", 
    location: "Substation 2",
    lastMaintenance: "2023-11-15",
    nextMaintenance: "2024-02-15",
    healthScore: 78,
    manufacturer: "GE",
    model: "Prolec GE",
    yearInstalled: "2016"
  }
];

export default function Equipment() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "operational": return "bg-status-operational text-status-operational-foreground";
      case "warning": return "bg-status-warning text-status-warning-foreground";
      case "critical": return "bg-status-critical text-status-critical-foreground";
      case "maintenance": return "bg-status-maintenance text-status-maintenance-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-status-operational";
    if (score >= 60) return "text-status-warning";
    if (score >= 40) return "text-status-maintenance";
    return "text-status-critical";
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === "all" || 
                      (activeTab === "electrical" && item.type === "Electrical") ||
                      (activeTab === "mechanical" && item.type === "Mechanical");
    
    return matchesSearch && matchesTab;
  });

  const statusCounts = {
    operational: equipment.filter(e => e.status === "Operational").length,
    warning: equipment.filter(e => e.status === "Warning").length,
    critical: equipment.filter(e => e.status === "Critical").length,
    maintenance: equipment.filter(e => e.status === "Maintenance").length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Equipment Management</h1>
          <p className="text-muted-foreground">Monitor and maintain industrial equipment assets</p>
        </div>
        <Button className="w-fit">
          <Plus className="h-4 w-4 mr-2" />
          Add Equipment
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-status-operational rounded-full"></div>
              <div>
                <div className="text-2xl font-bold">{statusCounts.operational}</div>
                <div className="text-sm text-muted-foreground">Operational</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-status-warning rounded-full"></div>
              <div>
                <div className="text-2xl font-bold">{statusCounts.warning}</div>
                <div className="text-sm text-muted-foreground">Warning</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-status-critical rounded-full"></div>
              <div>
                <div className="text-2xl font-bold">{statusCounts.critical}</div>
                <div className="text-sm text-muted-foreground">Critical</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-status-maintenance rounded-full"></div>
              <div>
                <div className="text-2xl font-bold">{statusCounts.maintenance}</div>
                <div className="text-sm text-muted-foreground">Maintenance</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search equipment, location, or manufacturer..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </Button>
      </div>

      {/* Equipment Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Equipment ({equipment.length})</TabsTrigger>
          <TabsTrigger value="electrical">
            <Zap className="h-4 w-4 mr-1" />
            Electrical ({equipment.filter(e => e.type === "Electrical").length})
          </TabsTrigger>
          <TabsTrigger value="mechanical">
            <Wrench className="h-4 w-4 mr-1" />
            Mechanical ({equipment.filter(e => e.type === "Mechanical").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid gap-4">
            {filteredEquipment.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        <div className="flex items-center space-x-1">
                          <Activity className="h-4 w-4" />
                          <span className={`text-sm font-medium ${getHealthColor(item.healthScore)}`}>
                            {item.healthScore}%
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.id}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        {item.type === "Electrical" ? <Zap className="h-4 w-4" /> : <Wrench className="h-4 w-4" />}
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">{item.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{item.location}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-muted-foreground">Manufacturer:</span>
                        <div className="font-medium">{item.manufacturer}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Model:</span>
                        <div className="font-medium">{item.model}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-muted-foreground">Last Service:</span>
                        <span className="font-medium">{item.lastMaintenance}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-muted-foreground">Next Service:</span>
                        <span className="font-medium">{item.nextMaintenance}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Schedule Maintenance
                    </Button>
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