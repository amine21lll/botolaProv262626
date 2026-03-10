import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Trophy, 
  MapPin, 
  Calendar, 
  Ticket, 
  Settings,
  LogOut,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Utilisateurs", href: "/admin/users" },
  { icon: Trophy, label: "Équipes", href: "/admin/teams" },
  { icon: MapPin, label: "Stades", href: "/admin/stadiums" },
  { icon: Calendar, label: "Matchs", href: "/admin/matches" },
  { icon: Ticket, label: "Billetterie", href: "/admin/ticketing" },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass-strong border-r border-border z-50 flex flex-col">
      <div className="p-8">
        <Link to="/" className="flex items-center gap-2">
          <Zap className="w-8 h-8 text-primary animate-pulse" />
          <span className="text-display text-2xl tracking-tighter text-foreground">
            BOTOLA<span className="text-primary italic">PASS</span>
          </span>
        </Link>
        <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
          Admin Control Center
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg font-heading text-sm transition-all duration-300",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-primary-foreground" : "text-primary")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-heading text-sm">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
