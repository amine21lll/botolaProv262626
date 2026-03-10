import { motion } from "framer-motion";
import { 
  Users, 
  Ticket, 
  TrendingUp, 
  Activity,
  Calendar,
  AlertCircle
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const STATS = [
  { label: "Total Utilisateurs", value: "1,248", change: "+12%", icon: Users, color: "text-primary" },
  { label: "Billets Vendus", value: "8,642", change: "+5%", icon: Ticket, color: "text-secondary" },
  { label: "Revenu Total", value: "482K MAD", change: "+18%", icon: TrendingUp, color: "text-gold" },
  { label: "Matchs Actifs", value: "8", change: "En direct", icon: Activity, color: "text-red-500" },
];

const DATA = [
  { name: 'Lun', sales: 4000 },
  { name: 'Mar', sales: 3000 },
  { name: 'Mer', sales: 2000 },
  { name: 'Jeu', sales: 2780 },
  { name: 'Ven', sales: 1890 },
  { name: 'Sam', sales: 2390 },
  { name: 'Dim', sales: 3490 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-display text-4xl text-foreground">TABLEAU DE BORD</h1>
        <p className="text-muted-foreground font-heading">Bienvenue dans le centre de contrôle Botola Pass.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-strong p-6 relative overflow-hidden group"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{stat.label}</p>
                <h3 className="text-3xl font-display text-foreground mt-2">{stat.value}</h3>
              </div>
              <div className={cn("p-2 rounded-lg bg-muted", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                {stat.change}
              </span>
              <span className="text-[10px] text-muted-foreground font-heading">vs mois dernier</span>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
              <stat.icon className="w-24 h-24" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 glass-strong p-6">
          <h3 className="text-display text-xl mb-6">VENTES DE BILLETS</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--primary))' }}
                />
                <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorSales)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Notifications/Tasks */}
        <div className="glass-strong p-6">
          <h3 className="text-display text-xl mb-6">ALERTES SYSTÈME</h3>
          <div className="space-y-4">
            {[
              { type: "warning", text: "Stade Adrar : Stock billets < 10%", icon: AlertCircle },
              { type: "info", text: "8 nouveaux utilisateurs inscrits", icon: Users },
              { type: "success", text: "Match #124 : Score mis à jour", icon: Calendar },
            ].map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                <alert.icon className={cn("w-4 h-4 mt-0.5", alert.type === "warning" ? "text-red-500" : "text-primary")} />
                <p className="text-xs text-foreground font-heading">{alert.text}</p>
              </div>
            ))}
          </div>
          <button className="btn-outline-neon w-full mt-6 text-xs py-2">
            Voir toutes les activités
          </button>
        </div>
      </div>
    </div>
  );
}

// Utility class helper
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
