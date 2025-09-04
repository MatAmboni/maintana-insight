import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  Zap, 
  Wrench, 
  TrendingUp,
  Shield,
  Activity,
  Thermometer,
  Gauge
} from "lucide-react";

const riskMetrics = [
  {
    title: "Overall Risk Level",
    value: "Medium",
    score: 65,
    color: "text-status-warning",
    icon: Shield
  },
  {
    title: "Electrical Risks",
    value: "High", 
    score: 78,
    color: "text-status-critical",
    icon: Zap
  },
  {
    title: "Mechanical Risks",
    value: "Low",
    score: 32,
    color: "text-status-operational", 
    icon: Wrench
  },
  {
    title: "Predictive Accuracy",
    value: "94%",
    score: 94,
    color: "text-accent",
    icon: TrendingUp
  }
];

const electricalRisks = [
  {
    equipment: "Electrical Panel A3",
    risk: "Overheating Detection",
    severity: "Critical",
    probability: 85,
    impact: "High",
    prediction: "48 hours",
    factors: ["Temperature trending up", "Load above normal", "Age of components"]
  },
  {
    equipment: "Motor Drive Unit 5",
    risk: "Voltage Instability", 
    severity: "High",
    probability: 72,
    impact: "Medium",
    prediction: "3-5 days",
    factors: ["Power fluctuations", "Grid instability", "Component wear"]
  },
  {
    equipment: "Transformer T2",
    risk: "Insulation Degradation",
    severity: "Medium", 
    probability: 45,
    impact: "High",
    prediction: "2-3 weeks",
    factors: ["Moisture levels", "Temperature cycles", "Age"]
  }
];

const mechanicalRisks = [
  {
    equipment: "Conveyor Belt B2",
    risk: "Belt Wear",
    severity: "Medium",
    probability: 68,
    impact: "Medium", 
    prediction: "1-2 weeks",
    factors: ["Usage hours", "Load patterns", "Maintenance history"]
  },
  {
    equipment: "Pump System 3",
    risk: "Bearing Failure",
    severity: "Low",
    probability: 25,
    impact: "Low",
    prediction: "4-6 weeks", 
    factors: ["Vibration levels", "Temperature", "Lubrication schedule"]
  },
  {
    equipment: "Compressor C1",
    risk: "Pressure Drop",
    severity: "Medium",
    probability: 55,
    impact: "Medium",
    prediction: "10-14 days",
    factors: ["Filter condition", "Seal integrity", "Operating pressure"]
  }
];

export default function RiskAnalysis() {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical": return "bg-status-critical text-status-critical-foreground";
      case "high": return "bg-status-maintenance text-status-maintenance-foreground";
      case "medium": return "bg-status-warning text-status-warning-foreground";
      case "low": return "bg-status-operational text-status-operational-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-status-critical";
    if (score >= 60) return "text-status-maintenance";
    if (score >= 40) return "text-status-warning";
    return "text-status-operational";
  };

  const RiskCard = ({ risk, type }: { risk: any, type: string }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center space-x-2">
              {type === "electrical" ? <Zap className="h-5 w-5" /> : <Wrench className="h-5 w-5" />}
              <span>{risk.equipment}</span>
            </CardTitle>
            <p className="text-muted-foreground mt-1">{risk.risk}</p>
          </div>
          <Badge className={getSeverityColor(risk.severity)}>{risk.severity}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Probability</div>
            <div className="flex items-center space-x-2">
              <Progress value={risk.probability} className="flex-1" />
              <span className={`text-sm font-medium ${getRiskColor(risk.probability)}`}>
                {risk.probability}%
              </span>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Impact</div>
            <Badge variant="outline">{risk.impact}</Badge>
          </div>
        </div>
        
        <div>
          <div className="text-sm text-muted-foreground mb-1">Predicted Timeline</div>
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span className="font-medium">{risk.prediction}</span>
          </div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground mb-2">Risk Factors</div>
          <div className="flex flex-wrap gap-1">
            {risk.factors.map((factor: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {factor}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Button size="sm" variant="outline" className="w-full">
            Create Preventive Order
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Risk Analysis</h1>
        <p className="text-muted-foreground">Predictive maintenance and risk assessment</p>
      </div>

      {/* Risk Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {riskMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className={`h-5 w-5 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{metric.value}</div>
                <Progress value={metric.score} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Risk Score: {metric.score}/100
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Risk Analysis by Category */}
      <Tabs defaultValue="electrical" className="space-y-4">
        <TabsList>
          <TabsTrigger value="electrical">
            <Zap className="h-4 w-4 mr-1" />
            Electrical Risks ({electricalRisks.length})
          </TabsTrigger>
          <TabsTrigger value="mechanical">
            <Wrench className="h-4 w-4 mr-1" />
            Mechanical Risks ({mechanicalRisks.length})
          </TabsTrigger>
          <TabsTrigger value="environmental">
            <Thermometer className="h-4 w-4 mr-1" />
            Environmental
          </TabsTrigger>
        </TabsList>

        <TabsContent value="electrical" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {electricalRisks.map((risk, index) => (
              <RiskCard key={index} risk={risk} type="electrical" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mechanical" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mechanicalRisks.map((risk, index) => (
              <RiskCard key={index} risk={risk} type="mechanical" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="environmental" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground">
                <Thermometer className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Environmental Risk Analysis</h3>
                <p>Environmental monitoring and risk assessment features will be available in the next update.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
        <Button className="flex-1 md:flex-none">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Generate Risk Report
        </Button>
        <Button variant="outline" className="flex-1 md:flex-none">
          <Gauge className="h-4 w-4 mr-2" />
          Configure Thresholds
        </Button>
        <Button variant="outline" className="flex-1 md:flex-none">
          Export Analysis
        </Button>
      </div>
    </div>
  );
}