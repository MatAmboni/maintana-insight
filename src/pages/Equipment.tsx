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
    name: "Painel Elétrico A3",
    type: "Elétrico",
    status: "Operacional",
    location: "Prédio A - Andar 3",
    lastMaintenance: "10/01/2024",
    nextMaintenance: "10/04/2024", 
    healthScore: 85,
    manufacturer: "Schneider Electric",
    model: "Prisma Plus P",
    yearInstalled: "2019"
  },
  {
    id: "EQ-002", 
    name: "Esteira Transportadora B2",
    type: "Mecânico",
    status: "Alerta",
    location: "Linha de Produção B",
    lastMaintenance: "05/01/2024",
    nextMaintenance: "20/01/2024",
    healthScore: 65,
    manufacturer: "Siemens",
    model: "SIMATIC Belt System",
    yearInstalled: "2020"
  },
  {
    id: "EQ-003",
    name: "Unidade HVAC C1", 
    type: "Mecânico",
    status: "Operacional",
    location: "Prédio C - Telhado",
    lastMaintenance: "14/01/2024",
    nextMaintenance: "14/03/2024",
    healthScore: 92,
    manufacturer: "Carrier",
    model: "AquaEdge 19XR",
    yearInstalled: "2018"
  },
  {
    id: "EQ-004",
    name: "Unidade de Acionamento 5",
    type: "Elétrico", 
    status: "Crítico",
    location: "Oficina Mecânica",
    lastMaintenance: "20/12/2023",
    nextMaintenance: "18/01/2024",
    healthScore: 35,
    manufacturer: "ABB",
    model: "ACS880",
    yearInstalled: "2017"
  },
  {
    id: "EQ-005",
    name: "Sistema de Bombeamento 3",
    type: "Mecânico",
    status: "Manutenção",
    location: "Sala de Utilidades",
    lastMaintenance: "12/01/2024", 
    nextMaintenance: "12/02/2024",
    healthScore: 58,
    manufacturer: "Grundfos",
    model: "CR Series",
    yearInstalled: "2021"
  },
  {
    id: "EQ-006",
    name: "Transformador T2",
    type: "Elétrico",
    status: "Operacional", 
    location: "Subestação 2",
    lastMaintenance: "15/11/2023",
    nextMaintenance: "15/02/2024",
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
      case "operacional": return "bg-status-operational text-status-operational-foreground";
      case "alerta": return "bg-status-warning text-status-warning-foreground";
      case "crítico": return "bg-status-critical text-status-critical-foreground";
      case "manutenção": return "bg-status-maintenance text-status-maintenance-foreground";
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
                      (activeTab === "electrical" && item.type === "Elétrico") ||
                      (activeTab === "mechanical" && item.type === "Mecânico");
    
    return matchesSearch && matchesTab;
  });

  const statusCounts = {
    operational: equipment.filter(e => e.status === "Operacional").length,
    warning: equipment.filter(e => e.status === "Alerta").length,
    critical: equipment.filter(e => e.status === "Crítico").length,
    maintenance: equipment.filter(e => e.status === "Manutenção").length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Equipamentos</h1>
          <p className="text-muted-foreground">Monitore e mantenha ativos de equipamentos industriais</p>
        </div>
        <Button className="w-fit">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Equipamento
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
                <div className="text-sm text-muted-foreground">Operacional</div>
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
                <div className="text-sm text-muted-foreground">Alerta</div>
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
                <div className="text-sm text-muted-foreground">Crítico</div>
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
                <div className="text-sm text-muted-foreground">Manutenção</div>
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
            placeholder="Buscar equipamento, localização ou fabricante..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtros Avançados
        </Button>
      </div>

      {/* Equipment Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Todos os Equipamentos ({equipment.length})</TabsTrigger>
          <TabsTrigger value="electrical">
            <Zap className="h-4 w-4 mr-1" />
            Elétrico ({equipment.filter(e => e.type === "Elétrico").length})
          </TabsTrigger>
          <TabsTrigger value="mechanical">
            <Wrench className="h-4 w-4 mr-1" />
            Mecânico ({equipment.filter(e => e.type === "Mecânico").length})
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
                        {item.type === "Elétrico" ? <Zap className="h-4 w-4" /> : <Wrench className="h-4 w-4" />}
                        <span className="text-muted-foreground">Tipo:</span>
                        <span className="font-medium">{item.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-muted-foreground">Localização:</span>
                        <span className="font-medium">{item.location}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-muted-foreground">Fabricante:</span>
                        <div className="font-medium">{item.manufacturer}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Modelo:</span>
                        <div className="font-medium">{item.model}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-muted-foreground">Último Serviço:</span>
                        <span className="font-medium">{item.lastMaintenance}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-muted-foreground">Próximo Serviço:</span>
                        <span className="font-medium">{item.nextMaintenance}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline">
                      Ver Detalhes
                    </Button>
                    <Button size="sm" variant="outline">
                      Agendar Manutenção
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