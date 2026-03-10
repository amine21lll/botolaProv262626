import { useState } from "react";
import { STADIUMS, type Stadium } from "@/data/stadiums";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Search, MapPin } from "lucide-react";

export default function StadiumsManagement() {
  const [stadiums, setStadiums] = useState<Stadium[]>(STADIUMS);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStadiums = stadiums.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-display text-4xl text-foreground">GESTION DES STADES</h1>
          <p className="text-muted-foreground font-heading">Gérez les infrastructures sportives.</p>
        </div>
        <button className="btn-neon flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Ajouter un stade
        </button>
      </header>

      <div className="glass-strong p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Rechercher un stade ou une ville..." 
            className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead>Nom du Stade</TableHead>
              <TableHead>Ville</TableHead>
              <TableHead>Capacité</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStadiums.map((stadium) => (
              <TableRow key={stadium.id} className="border-border/50">
                <TableCell className="font-heading font-semibold text-foreground flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  {stadium.name}
                </TableCell>
                <TableCell className="text-muted-foreground">{stadium.city}</TableCell>
                <TableCell className="font-mono text-sm">{stadium.capacity.toLocaleString()} places</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
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
