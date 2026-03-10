import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Download, QrCode, CheckCircle2 } from "lucide-react";

const MOCK_RESERVATIONS = [
  { id: "BTK-2026-1024", user: "Mehdi Ben", match: "WAC vs RCA", zone: "VIP", quantity: 2, amount: "800 MAD", date: "2026-03-08", status: "VALIDATED" },
  { id: "BTK-2026-1025", user: "Yassine El", match: "FAR vs FUS", zone: "POPULAIRE", quantity: 1, amount: "50 MAD", date: "2026-03-08", status: "PENDING" },
  { id: "BTK-2026-1026", user: "Sofia AM", match: "RSB vs MAS", zone: "TRIBUNE", quantity: 3, amount: "240 MAD", date: "2026-03-07", status: "VALIDATED" },
  { id: "BTK-2026-1027", user: "Omar RK", match: "IRT vs MAT", zone: "VIP", quantity: 1, amount: "400 MAD", date: "2026-03-07", status: "CANCELLED" },
];

export default function TicketingManagement() {
  const [reservations, setReservations] = useState(MOCK_RESERVATIONS);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = reservations.filter(r => 
    r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.match.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-display text-4xl text-foreground">BILLETTERIE & RÉSERVATIONS</h1>
          <p className="text-muted-foreground font-heading">Suivi des ventes et validation des billets.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-outline-neon flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" /> Exporter rapport
          </button>
          <button className="btn-neon flex items-center gap-2 text-sm">
            <QrCode className="w-4 h-4" /> Scanner Billet
          </button>
        </div>
      </header>

      <div className="glass-strong p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Rechercher par ID, utilisateur ou match..." 
            className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead>ID Billet</TableHead>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Match / Zone</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((res) => (
              <TableRow key={res.id} className="border-border/50 text-sm">
                <TableCell className="font-mono font-bold text-primary">{res.id}</TableCell>
                <TableCell className="font-heading">{res.user}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-foreground font-medium">{res.match}</span>
                    <span className="text-[10px] text-muted-foreground uppercase">{res.zone} (x{res.quantity})</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono font-bold">{res.amount}</TableCell>
                <TableCell>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    res.status === "VALIDATED" ? "bg-primary/10 text-primary" :
                    res.status === "PENDING" ? "bg-gold/10 text-gold" :
                    "bg-destructive/10 text-destructive"
                  )}>
                    {res.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {res.status === "PENDING" && (
                      <button title="Valider" className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                    <button title="Voir Ticket" className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
