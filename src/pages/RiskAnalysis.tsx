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
    title: "Nível Geral de Risco",
    value: "Médio",
    score: 65,
    color: "text-status-warning",
    icon: Shield
  },
  {
    title: "Riscos Elétricos",
    value: "Alto", 
    score: 78,
    color: "text-status-critical",
    icon: Zap
  },
  {
    title: "Riscos Mecânicos",
    value: "Baixo",
    score: 32,
    color: "text-status-operational", 
    icon: Wrench
  },
  {
    title: "Precisão Preditiva",
    value: "94%",
    score: 94,
    color: "text-accent",
    icon: TrendingUp
  }
];

const electricalRisks = [
  {
    equipment: "Painel Elétrico A3",
    risk: "Detecção de Superaquecimento",
    severity: "Crítico",
    probability: 85,
    impact: "Alto",
    prediction: "48 horas",
    factors: ["Temperatura em tendência de alta", "Carga acima do normal", "Idade dos componentes"]
  },
  {
    equipment: "Unidade de Acionamento 5",
    risk: "Instabilidade de Voltagem", 
    severity: "Alto",
    probability: 72,
    impact: "Médio",
    prediction: "3-5 dias",
    factors: ["Flutuações de energia", "Instabilidade da rede", "Desgaste de componentes"]
  },
  {
    equipment: "Transformador T2",
    risk: "Degradação do Isolamento",
    severity: "Médio", 
    probability: 45,
    impact: "Alto",
    prediction: "2-3 semanas",
    factors: ["Níveis de umidade", "Ciclos de temperatura", "Idade"]
  }
];

const mechanicalRisks = [
  {
    equipment: "Esteira Transportadora B2",
    risk: "Desgaste da Correia",
    severity: "Médio",
    probability: 68,
    impact: "Médio", 
    prediction: "1-2 semanas",
    factors: ["Horas de uso", "Padrões de carga", "Histórico de manutenção"]
  },
  {
    equipment: "Sistema de Bombeamento 3",
    risk: "Falha no Rolamento",
    severity: "Baixo",
    probability: 25,
    impact: "Baixo",
    prediction: "4-6 semanas", 
    factors: ["Níveis de vibração", "Temperatura", "Programação de lubrificação"]
  },
  {
    equipment: "Compressor C1",
    risk: "Queda de Pressão",
    severity: "Médio",
    probability: 55,
    impact: "Médio",
    prediction: "10-14 dias",
    factors: ["Condição do filtro", "Integridade do selo", "Pressão de operação"]
  }
];

export default function RiskAnalysis() {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "crítico": return "bg-status-critical text-status-critical-foreground";
      case "alto": return "bg-status-maintenance text-status-maintenance-foreground";
      case "médio": return "bg-status-warning text-status-warning-foreground";
      case "baixo": return "bg-status-operational text-status-operational-foreground";
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
              {type === "elétrico" ? <Zap className="h-5 w-5" /> : <Wrench className="h-5 w-5" />}
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
            <div className="text-sm text-muted-foreground mb-1">Probabilidade</div>
            <div className="flex items-center space-x-2">
              <Progress value={risk.probability} className="flex-1" />
              <span className={`text-sm font-medium ${getRiskColor(risk.probability)}`}>
                {risk.probability}%
              </span>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Impacto</div>
            <Badge variant="outline">{risk.impact}</Badge>
          </div>
        </div>
        
        <div>
          <div className="text-sm text-muted-foreground mb-1">Linha do Tempo Prevista</div>
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span className="font-medium">{risk.prediction}</span>
          </div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground mb-2">Fatores de Risco</div>
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
            Criar Ordem Preventiva
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Análise de Riscos</h1>
        <p className="text-muted-foreground">Manutenção preditiva e avaliação de riscos</p>
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
                  Pontuação de Risco: {metric.score}/100
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
            Riscos Elétricos ({electricalRisks.length})
          </TabsTrigger>
          <TabsTrigger value="mechanical">
            <Wrench className="h-4 w-4 mr-1" />
            Riscos Mecânicos ({mechanicalRisks.length})
          </TabsTrigger>
          <TabsTrigger value="environmental">
            <Thermometer className="h-4 w-4 mr-1" />
            Ambiental
          </TabsTrigger>
        </TabsList>

        <TabsContent value="electrical" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {electricalRisks.map((risk, index) => (
              <RiskCard key={index} risk={risk} type="elétrico" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mechanical" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mechanicalRisks.map((risk, index) => (
              <RiskCard key={index} risk={risk} type="mecânico" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="environmental" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground">
                <Thermometer className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Análise de Risco Ambiental</h3>
                <p>Recursos de monitoramento ambiental e avaliação de riscos estarão disponíveis na próxima atualização.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
        <Button className="flex-1 md:flex-none">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Gerar Relatório de Riscos
        </Button>
        <Button variant="outline" className="flex-1 md:flex-none">
          <Gauge className="h-4 w-4 mr-2" />
          Configurar Limites
        </Button>
        <Button variant="outline" className="flex-1 md:flex-none">
          Exportar Análise
        </Button>
      </div>
    </div>
  );
}