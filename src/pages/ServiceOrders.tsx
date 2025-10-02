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
    id: "OS-2024-001",
    title: "Manutenção de Painel Elétrico",
    equipment: "Painel Elétrico A3",
    type: "Elétrico",
    priority: "Crítico",
    status: "Em Andamento",
    assignee: "João Silva",
    created: "15/01/2024",
    dueDate: "18/01/2024",
    description: "Manutenção de rotina e inspeção de segurança do painel elétrico principal"
  },
  {
    id: "OS-2024-002",
    title: "Reparo de Esteira Transportadora",
    equipment: "Esteira Transportadora B2", 
    type: "Mecânico",
    priority: "Médio",
    status: "Pendente",
    assignee: "Sara Santos",
    created: "16/01/2024",
    dueDate: "20/01/2024",
    description: "Substituir componentes desgastados da esteira e lubrificar rolamentos"
  },
  {
    id: "OS-2024-003",
    title: "Verificação do Sistema HVAC",
    equipment: "Unidade HVAC C1",
    type: "Mecânico", 
    priority: "Alto",
    status: "Concluído",
    assignee: "Miguel Oliveira",
    created: "14/01/2024",
    dueDate: "17/01/2024",
    description: "Diagnóstico completo do sistema e substituição de filtros"
  },
  {
    id: "OS-2024-004",
    title: "Calibração de Acionamento de Motor",
    equipment: "Unidade de Acionamento 5",
    type: "Elétrico",
    priority: "Alto",
    status: "Atribuído",
    assignee: "Lisa Chen",
    created: "17/01/2024",
    dueDate: "19/01/2024",
    description: "Recalibrar parâmetros de controle do motor e testar sistemas de segurança"
  },
  {
    id: "OS-2024-005",
    title: "Revisão Geral do Sistema de Bombeamento", 
    equipment: "Sistema de Bombeamento 3",
    type: "Mecânico",
    priority: "Crítico",
    status: "Planejamento",
    assignee: "David Costa",
    created: "17/01/2024",
    dueDate: "22/01/2024",
    description: "Desmontagem completa da bomba, inspeção e reconstrução"
  }
];

export default function ServiceOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

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
      case "atribuído": return "bg-primary text-primary-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const filteredOrders = serviceOrders.filter(order => {
    const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === "all" || 
                      (activeTab === "electrical" && order.type === "Elétrico") ||
                      (activeTab === "mechanical" && order.type === "Mecânico");
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Ordens de Serviço</h1>
          <p className="text-muted-foreground">Gerencie e acompanhe ordens de trabalho de manutenção</p>
        </div>
        <Button className="w-fit">
          <Plus className="h-4 w-4 mr-2" />
          Criar Nova Ordem
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar ordens, equipamentos ou responsáveis..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Todas as Ordens ({serviceOrders.length})</TabsTrigger>
          <TabsTrigger value="electrical">
            <Zap className="h-4 w-4 mr-1" />
            Elétrico ({serviceOrders.filter(o => o.type === "Elétrico").length})
          </TabsTrigger>
          <TabsTrigger value="mechanical">
            <Wrench className="h-4 w-4 mr-1" />
            Mecânico ({serviceOrders.filter(o => o.type === "Mecânico").length})
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
                      {order.type === "Elétrico" ? <Zap className="h-4 w-4" /> : <Wrench className="h-4 w-4" />}
                      <span className="text-muted-foreground">Equipamento:</span>
                      <span className="font-medium">{order.equipment}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="text-muted-foreground">Responsável:</span>
                      <span className="font-medium">{order.assignee}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-muted-foreground">Criado:</span>
                      <span className="font-medium">{order.created}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-muted-foreground">Prazo:</span>
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