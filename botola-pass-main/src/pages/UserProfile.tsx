import { motion } from "framer-motion";
import { 
  User, 
  Ticket, 
  History, 
  Settings, 
  LogOut, 
  Download, 
  QrCode,
  MapPin,
  Calendar
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const MOCK_TICKETS = [
  { 
    id: "BT-26-4412", 
    match: "Wydad Casablanca vs Raja CA", 
    date: "23 Mars 2026", 
    stadium: "Stade Mohammed V",
    zone: "Tribune Honneur",
    price: "150 MAD",
    status: "VALID"
  },
  { 
    id: "BT-26-8891", 
    match: "AS FAR vs FUS Rabat", 
    date: "15 Avril 2026", 
    stadium: "Complexe Moulay Abdellah",
    zone: "Populaire E",
    price: "30 MAD",
    status: "USED"
  }
];

export default function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass p-6 text-center"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                <User className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-xl font-display text-foreground uppercase tracking-tight">{user.name}</h2>
              <p className="text-xs text-muted-foreground font-heading mb-6">{user.email}</p>
              
              <nav className="space-y-2 text-left">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-primary/10 text-primary text-sm font-heading font-semibold transition-all">
                  <Ticket className="w-4 h-4" /> Mes Billets
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted text-muted-foreground text-sm font-heading transition-all">
                  <History className="w-4 h-4" /> Historique
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted text-muted-foreground text-sm font-heading transition-all">
                  <Settings className="w-4 h-4" /> Paramètres
                </button>
                <div className="pt-4 mt-4 border-t border-border/50">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-destructive/10 text-destructive text-sm font-heading transition-all"
                  >
                    <LogOut className="w-4 h-4" /> Se déconnecter
                  </button>
                </div>
              </nav>
            </motion.div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-display text-4xl text-foreground uppercase italic tracking-wider">MES <span className="text-primary italic">BILLETS</span></h1>
                <p className="text-muted-foreground font-heading text-sm">Gérez vos réservations et accédez à vos accès de match.</p>
              </div>
              <div className="flex gap-3">
                <div className="glass px-4 py-2 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Total:</span>
                  <span className="text-sm font-bold text-primary">{MOCK_TICKETS.length}</span>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_TICKETS.map((ticket, i) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass group relative overflow-hidden"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[10px] text-primary font-bold uppercase tracking-widest leading-none block mb-1">BOTOLA PRO INWI</span>
                        <h3 className="font-display text-lg text-foreground uppercase">{ticket.match}</h3>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        ticket.status === 'VALID' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-muted text-muted-foreground'
                      }`}>
                        {ticket.status === 'VALID' ? 'VALIDE' : 'UTILISÉ'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" /> {ticket.date}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" /> {ticket.stadium}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-border/50">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Zone / Prix</p>
                        <p className="text-sm font-heading text-foreground">{ticket.zone} • <span className="text-primary font-bold">{ticket.price}</span></p>
                      </div>
                      <div className="flex gap-2">
                        <button title="QR Code" className="p-2.5 rounded-lg bg-muted hover:bg-primary/20 hover:text-primary transition-all">
                          <QrCode className="w-4 h-4" />
                        </button>
                        <button title="Télécharger PDF" className="p-2.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ticket Serial */}
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-mono select-none">{ticket.id}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <section className="glass p-8">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-5 h-5 text-secondary" />
                <h3 className="text-display text-xl uppercase italic">MES <span className="text-secondary italic">INFORMATIONS</span></h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Nom Complet</p>
                  <p className="text-foreground font-heading">{user.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Adresse Email</p>
                  <p className="text-foreground font-heading">{user.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Numéro de Téléphone</p>
                  <p className="text-foreground font-heading">{user.phone || 'Non renseigné'}</p>
                </div>
                <div className="pt-2">
                  <button className="btn-outline-neon px-6 py-2 text-xs">Modifier mon profil</button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
