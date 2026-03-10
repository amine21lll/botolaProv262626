import { useState } from "react";
import { TEAMS, type Team } from "@/data/teams";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Search } from "lucide-react";

export default function TeamsManagement() {
  const [teams, setTeams] = useState<Team[]>(TEAMS);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-display text-4xl text-foreground">GESTION DES ÉQUIPES</h1>
          <p className="text-muted-foreground font-heading">Gérez les 16 clubs de la Botola Pro.</p>
        </div>
        <button className="btn-neon flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Ajouter une équipe
        </button>
      </header>

      <div className="glass-strong p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Rechercher une équipe ou une ville..." 
            className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="w-[80px]">Logo</TableHead>
              <TableHead>Nom du Club</TableHead>
              <TableHead>Ville</TableHead>
              <TableHead>Couleurs</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeams.map((team) => (
              <TableRow key={team.id} className="border-border/50">
                <TableCell>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border/50">
                    {team.logo ? (
                      <img src={team.logo} alt={team.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-xs font-bold text-muted-foreground">{team.shortName}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-heading font-semibold text-foreground">{team.name}</TableCell>
                <TableCell className="text-muted-foreground">{team.city}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 rounded-full border border-border" style={{ background: team.colors[0] }} />
                    <div className="w-4 h-4 rounded-full border border-border" style={{ background: team.colors[1] }} />
                  </div>
                </TableCell>
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
