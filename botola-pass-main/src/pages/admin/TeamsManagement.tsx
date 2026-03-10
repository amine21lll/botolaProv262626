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
import { Plus, Edit, Trash2, Search, Trophy } from "lucide-react";
import AddTeamModal from "@/components/admin/AddTeamModal";
import { useToast } from "@/hooks/use-toast";

export default function TeamsManagement() {
  const { teams, deleteTeam } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.shortName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Voulez-vous vraiment supprimer l'équipe ${name} ?`)) {
      deleteTeam(id);
      toast({
        title: "Équipe supprimée",
        description: `${name} a été retirée de la base de données.`,
      });
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-display text-4xl text-foreground uppercase">GESTION DES ÉQUIPES</h1>
          <p className="text-muted-foreground font-heading">Gérez les clubs de la Botola Pro.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-neon flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" /> Ajouter une équipe
        </button>
      </header>

      <div className="glass-strong p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Rechercher une équipe, ville ou acronyme..." 
            className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary transition-all font-heading"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="w-[80px] font-bold text-xs uppercase tracking-widest text-center">Logo</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-widest">Nom du Club</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-widest">Ville</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-widest">Couleurs</TableHead>
                <TableHead className="text-right font-bold text-xs uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeams.map((team) => (
                <TableRow key={team.id} className="border-border/50 hover:bg-muted/20 transition-colors">
                  <TableCell>
                    <div className="w-10 h-10 mx-auto rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border/50 shadow-sm">
                      {team.logo ? (
                        <img src={team.logo} alt={team.name} className="w-full h-full object-contain p-1" />
                      ) : (
                        <div className="flex flex-col items-center">
                          <Trophy className="w-3 h-3 text-muted-foreground/30 mb-0.5" />
                          <span className="text-[10px] font-bold text-muted-foreground leading-none">{team.shortName}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-heading font-semibold text-foreground">{team.name}</span>
                      <span className="text-[10px] text-primary font-bold tracking-widest">{team.shortName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-heading">{team.city}</TableCell>
                  <TableCell>
                    <div className="flex gap-1.5">
                      <div className="w-4 h-4 rounded-full border border-border/50 shadow-inner" style={{ background: team.colors[0] }} />
                      <div className="w-4 h-4 rounded-full border border-border/50 shadow-inner" style={{ background: team.colors[1] }} />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors border border-primary/20">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(team.id, team.name)}
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

      <AddTeamModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
