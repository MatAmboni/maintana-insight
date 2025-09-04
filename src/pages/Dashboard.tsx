import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Zap,
  Wrench,
  Users,
  ClipboardList
} from "lucide-react";
import industrialHero from "@/assets/industrial-hero.jpg";

const metrics = [
  {
    title: "Active Service Orders",
    value: "24",
    change: "+12%",
    icon: Clock,
    color: "text-status-warning"
  },
  {
    title: "Equipment Operational",
    value: "156/162",
    change: "96.3%",
    icon: CheckCircle,
    color: "text-status-operational"
  },
  {
    title: "Critical Alerts",
    value: "3",
    change: "-2",
    icon: AlertTriangle,
    color: "text-status-critical"
  },
  {
    title: "Maintenance Efficiency",
    value: "94%",
    change: "+5%",
    icon: TrendingUp,
    color: "text-accent"
  }
];

const recentOrders = [
  {
    id: "SO-2024-001",
    equipment: "Electrical Panel A3",
    type: "Electrical",
    priority: "Critical",
    status: "In Progress",
    assignee: "John Smith"
  },
  {
    id: "SO-2024-002", 
    equipment: "Conveyor Belt B2",
    type: "Mechanical",
    priority: "Medium",
    status: "Pending",
    assignee: "Sarah Johnson"
  },
  {
    id: "SO-2024-003",
    equipment: "HVAC Unit C1", 
    type: "Mechanical",
    priority: "High",
    status: "Completed",
    assignee: "Mike Wilson"
  }
];

const criticalAlerts = [
  {
    equipment: "Motor Drive Unit 5",
    issue: "Temperature threshold exceeded",
    severity: "Critical",
    time: "15 min ago"
  },
  {
    equipment: "Electrical Panel B7",
    issue: "Voltage irregularity detected",
    severity: "High", 
    time: "1 hour ago"
  },
  {
    equipment: "Pump System 3",
    issue: "Pressure drop detected",
    severity: "Medium",
    time: "2 hours ago"
  }
];

export default function Dashboard() {
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
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden">
        <img 
          src={industrialHero} 
          alt="Industrial maintenance facility"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent flex items-center">
          <div className="text-primary-foreground p-6">
            <h1 className="text-3xl font-bold mb-2">Maintenance Command Center</h1>
            <p className="text-lg opacity-90">Monitor and manage your industrial operations</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className={`h-5 w-5 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-status-operational">{metric.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Service Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ClipboardList className="h-5 w-5" />
              <span>Recent Service Orders</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">{order.id}</span>
                    <Badge className={getPriorityColor(order.priority)}>{order.priority}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.equipment}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs flex items-center space-x-1">
                      {order.type === "Electrical" ? <Zap className="h-3 w-3" /> : <Wrench className="h-3 w-3" />}
                      <span>{order.type}</span>
                    </span>
                    <span className="text-xs flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{order.assignee}</span>
                    </span>
                  </div>
                </div>
                <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Orders
            </Button>
          </CardContent>
        </Card>

        {/* Critical Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-status-critical" />
              <span>Critical Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {criticalAlerts.map((alert, index) => (
              <div key={index} className="p-3 rounded-lg border border-status-critical/20 bg-status-critical/5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{alert.equipment}</div>
                    <p className="text-sm text-muted-foreground mt-1">{alert.issue}</p>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <Badge className={getPriorityColor(alert.severity)}>{alert.severity}</Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View Risk Analysis
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}