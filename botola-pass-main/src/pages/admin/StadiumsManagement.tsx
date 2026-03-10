import { useState } from "react";
import { useData } from "@/context/DataContext";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Search, MapPin } from "lucide-react";
import AddStadiumModal from "@/components/admin/AddStadiumModal";
import { useToast } from "@/hooks/use-toast";

export default function StadiumsManagement() {
  const { stadiums, deleteStadium } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredStadiums = stadiums.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer ce stade ? Cela pourrait affecter les matchs et équipes liés.")) {
      deleteStadium(id);
      toast({
        title: "Stade supprimé",
        description: "L'infrastructure a été retirée de la base de données.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-display text-4xl text-foreground uppercase">GESTION DES STADES</h1>
          <p className="text-muted-foreground font-heading">Gérez les infrastructures sportives.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-neon flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" /> Ajouter un stade
        </button>
      </header>

      <div className="glass-strong p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Rechercher un stade ou une ville..." 
            className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary transition-all font-heading"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="font-bold text-xs uppercase tracking-widest">Nom du Stade</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-widest">Ville</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-widest">Capacité</TableHead>
                <TableHead className="text-right font-bold text-xs uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStadiums.map((stadium) => (
                <TableRow key={stadium.id} className="border-border/50 hover:bg-muted/20 transition-colors">
                  <TableCell className="font-heading font-semibold text-foreground flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    {stadium.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground font-heading">{stadium.city}</TableCell>
                  <TableCell className="font-mono text-xs">{stadium.capacity.toLocaleString()} places</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors border border-primary/20">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(stadium.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors border border-destructive/20"
                      >
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

      <AddStadiumModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
