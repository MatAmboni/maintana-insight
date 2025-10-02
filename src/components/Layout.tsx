import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  AlertTriangle,
  Wrench,
  Menu,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigation = [
  { name: "Painel", href: "/", icon: LayoutDashboard },
  { name: "Ordens de Serviço", href: "/orders", icon: ClipboardList },
  { name: "Análise de Riscos", href: "/risks", icon: AlertTriangle },
  { name: "Equipamentos", href: "/equipment", icon: Wrench },
];

export function Layout() {
  const location = useLocation();

  const isActive = (href: string) => {
    return href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);
  };

  const NavLinks = () => (
    <>
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${isActive(item.href)
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
          >
            <Icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-4">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col space-y-2 mt-4">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex items-center space-x-4 ml-4 md:ml-0">
            <div className="flex items-center space-x-2">
              <img
                src="/src/assets/logo-amboni-alimentos.png"
                alt="Logo Amboni Alimentos"
                className="h-7"
              />
              <h1 className="text-xl font-semibold">Manutenção Amboni</h1>
            </div>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-2 ml-8">
            <NavLinks />
          </nav>

          <div className="ml-auto">
            <Button variant="outline" size="sm">
              Perfil do Usuário
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}