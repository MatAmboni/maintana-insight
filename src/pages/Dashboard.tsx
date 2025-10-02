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
  ClipboardList,
} from "lucide-react";
import industrialHero from "@/assets/industrial-hero.jpg";
import { serviceOrders } from "./ServiceOrders";
import { useRoutes } from 'react-router-dom';

const metrics = [
  {
    title: "Equipamentos Operacionais",
    value: "156/162",
    change: "96.3%",
    icon: CheckCircle,
    color: "text-status-operational"
  },
  {
    title: "Alertas Críticos",
    value: "3",
    change: "-2",
    icon: AlertTriangle,
    color: "text-status-critical"
  },
  {
    title: "Eficiência de Manutenção",
    value: "94%",
    change: "+5%",
    icon: TrendingUp,
    color: "text-accent"
  }
];

const recentOrders = [
  {
    id: "OS-2024-001",
    equipment: "Painel Elétrico A3",
    type: "Elétrico",
    priority: "Crítico",
    status: "Em Andamento",
    assignee: "João Silva"
  },
  {
    id: "OS-2024-002",
    equipment: "Esteira Transportadora B2",
    type: "Mecânico",
    priority: "Médio",
    status: "Pendente",
    assignee: "Sara Santos"
  },
  {
    id: "OS-2024-003",
    equipment: "Unidade HVAC C1",
    type: "Mecânico",
    priority: "Alto",
    status: "Concluído",
    assignee: "Miguel Oliveira"
  }
];

const criticalAlerts = [
  {
    equipment: "Unidade de Acionamento 5",
    issue: "Limite de temperatura excedido",
    severity: "Crítico",
    time: "há 15 min"
  },
  {
    equipment: "Painel Elétrico B7",
    issue: "Irregularidade de voltagem detectada",
    severity: "Alto",
    time: "há 1 hora"
  },
  {
    equipment: "Sistema de Bombeamento 3",
    issue: "Queda de pressão detectada",
    severity: "Médio",
    time: "há 2 horas"
  }
];

export default function Dashboard() {



  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "crítico": return "bg-status-critical text-status-critical-foreground";
      case "alto": return "bg-status-maintenance text-status-maintenance-foreground";
      case "médio": return "bg-status-warning text-status-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "concluído": return "bg-status-operational text-status-operational-foreground";
      case "em andamento": return "bg-accent text-accent-foreground";
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
            <h1 className="text-3xl font-bold mb-2">Central de Comando de Manutenção</h1>
            <p className="text-lg opacity-90">Monitore e gerencie suas operações industriais</p>
          </div>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{"Ordens de serviço ativas"}</CardTitle>
            <Clock className="h-5 w-5 text-status-operational" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviceOrders.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-status-operational">{"+0%"}</span> do mês passado
            </p>
          </CardContent>
        </Card>
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
                  <span className="text-status-operational">{metric.change}</span> do mês passado
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
              <span>Ordens de Serviço Recentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {serviceOrders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">{order.id}</span>
                    <Badge className={getPriorityColor(order.priority)}>
                      {order.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.equipment}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs flex items-center space-x-1">
                      {order.type === "Elétrico" ? (
                        <Zap className="h-3 w-3" />
                      ) : (
                        <Wrench className="h-3 w-3" />
                      )}
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

            {/* Botão que leva para outra página */}
            <Button
              variant="outline"
              className="w-full"
              // onClick={}
            >
              Ver Todas as Ordens
            </Button>
          </CardContent>
        </Card>

        {/* Critical Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-status-critical" />
              <span>Alertas Críticos</span>
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
              Ver Análise de Riscos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}