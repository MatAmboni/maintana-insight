import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Plus,
  Search,
  Filter,
  Zap,
  Wrench,
  Clock,
  User,
  Calendar as CalendarIcon
} from "lucide-react";

const initialServiceOrders = [
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

export const serviceOrders = initialServiceOrders;

const formSchema = z.object({
  title: z.string().min(5, "Título deve ter no mínimo 5 caracteres").max(100, "Título deve ter no máximo 100 caracteres"),
  equipment: z.string().min(3, "Equipamento deve ter no mínimo 3 caracteres"),
  type: z.enum(["Elétrico", "Mecânico"], { required_error: "Selecione um tipo" }),
  priority: z.enum(["Crítico", "Alto", "Médio", "Baixo"], { required_error: "Selecione uma prioridade" }),
  status: z.enum(["Pendente", "Atribuído", "Em Andamento", "Concluído", "Planejamento"], { required_error: "Selecione um status" }),
  assignee: z.string().min(3, "Responsável deve ter no mínimo 3 caracteres"),
  dueDate: z.date({ required_error: "Selecione uma data de prazo" }),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres").max(500, "Descrição deve ter no máximo 500 caracteres"),
});

export default function ServiceOrders() {
  const [orders, setOrders] = useState(initialServiceOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  
  // Filter states
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "Pendente",
    },
  });



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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const lastOrderNumber = orders.length > 0 
      ? parseInt(orders[0].id.split('-')[2]) 
      : 0;
    const newOrderNumber = (lastOrderNumber + 1).toString().padStart(3, '0');
    const newId = `OS-2024-${newOrderNumber}`;
    
    const today = new Date();
    const createdDate = format(today, "dd/MM/yyyy", { locale: ptBR });
    const dueDate = format(values.dueDate, "dd/MM/yyyy", { locale: ptBR });

    const newOrder = {
      id: newId,
      title: values.title,
      equipment: values.equipment,
      type: values.type,
      priority: values.priority,
      status: values.status,
      assignee: values.assignee,
      created: createdDate,
      dueDate: dueDate,
      description: values.description,
    };

    setOrders([newOrder, ...orders]);
    setDialogOpen(false);
    form.reset();
    
    toast({
      title: "Ordem criada com sucesso!",
      description: `Ordem ${newId} foi criada e atribuída a ${values.assignee}.`,
    });
  };

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.assignee.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTab = activeTab === "all" ||
        (activeTab === "electrical" && order.type === "Elétrico") ||
        (activeTab === "mechanical" && order.type === "Mecânico");

      // Filter by status
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(order.status);
      
      // Filter by priority
      const matchesPriority = selectedPriorities.length === 0 || selectedPriorities.includes(order.priority);
      
      // Filter by type
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(order.type);

      return matchesSearch && matchesTab && matchesStatus && matchesPriority && matchesType;
    })
    .sort((a, b) => {
      const priorityOrder = { "Crítico": 1, "Alto": 2, "Médio": 3 };
      return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
    });

  const activeFilterCount = selectedStatuses.length + selectedPriorities.length + selectedTypes.length;

  const clearFilters = () => {
    setSelectedStatuses([]);
    setSelectedPriorities([]);
    setSelectedTypes([]);
  };

  const toggleFilter = (value: string, currentFilters: string[], setFilters: (filters: string[]) => void) => {
    if (currentFilters.includes(value)) {
      setFilters(currentFilters.filter(f => f !== value));
    } else {
      setFilters([...currentFilters, value]);
    }
  };

  const statuses = ["Pendente", "Atribuído", "Em Andamento", "Concluído", "Planejamento"];
  const priorities = ["Crítico", "Alto", "Médio", "Baixo"];
  const types = ["Elétrico", "Mecânico"];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Ordens de Serviço</h1>
          <p className="text-muted-foreground">Gerencie e acompanhe ordens de trabalho de manutenção</p>
        </div>
        <Button className="w-fit" onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Criar Nova Ordem
        </Button>
      </div>

      {/* Create Order Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Criar Nova Ordem de Serviço</DialogTitle>
            <DialogDescription>
              Preencha os detalhes da nova ordem de serviço abaixo.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Manutenção de Painel Elétrico" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="equipment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipamento</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Painel Elétrico A3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Elétrico">Elétrico</SelectItem>
                          <SelectItem value="Mecânico">Mecânico</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prioridade</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a prioridade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Crítico">Crítico</SelectItem>
                          <SelectItem value="Alto">Alto</SelectItem>
                          <SelectItem value="Médio">Médio</SelectItem>
                          <SelectItem value="Baixo">Baixo</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                          <SelectItem value="Atribuído">Atribuído</SelectItem>
                          <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                          <SelectItem value="Planejamento">Planejamento</SelectItem>
                          <SelectItem value="Concluído">Concluído</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assignee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Responsável</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: João Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de Prazo</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva os detalhes da ordem de serviço..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Criar Ordem</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

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
        <Button variant="outline" onClick={() => setFilterDialogOpen(true)}>
          <Filter className="h-4 w-4 mr-2" />
          Filtros
          {activeFilterCount > 0 && (
            <Badge className="ml-2 bg-primary text-primary-foreground">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Filtros</DialogTitle>
            <DialogDescription>
              Selecione os filtros para refinar sua busca
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Status Filter */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Status</h3>
              <div className="space-y-2">
                {statuses.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${status}`}
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={() => toggleFilter(status, selectedStatuses, setSelectedStatuses)}
                    />
                    <label
                      htmlFor={`status-${status}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {status}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Filter */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Prioridade</h3>
              <div className="space-y-2">
                {priorities.map((priority) => (
                  <div key={priority} className="flex items-center space-x-2">
                    <Checkbox
                      id={`priority-${priority}`}
                      checked={selectedPriorities.includes(priority)}
                      onCheckedChange={() => toggleFilter(priority, selectedPriorities, setSelectedPriorities)}
                    />
                    <label
                      htmlFor={`priority-${priority}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {priority}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Tipo</h3>
              <div className="space-y-2">
                {types.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={() => toggleFilter(type, selectedTypes, setSelectedTypes)}
                    />
                    <label
                      htmlFor={`type-${type}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={clearFilters}>
              Limpar Filtros
            </Button>
            <Button onClick={() => setFilterDialogOpen(false)}>
              Aplicar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Todas as Ordens ({orders.length})</TabsTrigger>
          <TabsTrigger value="electrical">
            <Zap className="h-4 w-4 mr-1" />
            Elétrico ({orders.filter(o => o.type === "Elétrico").length})
          </TabsTrigger>
          <TabsTrigger value="mechanical">
            <Wrench className="h-4 w-4 mr-1" />
            Mecânico ({orders.filter(o => o.type === "Mecânico").length})
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
                      <CalendarIcon className="h-4 w-4" />
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