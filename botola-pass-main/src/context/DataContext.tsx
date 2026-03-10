import React, { createContext, useContext, useState, useEffect } from "react";
import { TEAMS, type Team } from "@/data/teams";
import { STADIUMS, type Stadium } from "@/data/stadiums";
import { MATCHES, type Match } from "@/data/matches";

interface DataContextType {
  teams: Team[];
  stadiums: Stadium[];
  matches: Match[];
  addTeam: (team: Omit<Team, "id">) => void;
  addStadium: (stadium: Omit<Stadium, "id">) => void;
  addMatch: (match: Omit<Match, "id">) => void;
  deleteTeam: (id: number) => void;
  deleteStadium: (id: number) => void;
  deleteMatch: (id: number) => void;
  getTeamById: (id: number) => Team | undefined;
  getStadiumById: (id: number) => Stadium | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>(() => {
    const saved = localStorage.getItem("botola_teams");
    return saved ? JSON.parse(saved) : TEAMS;
  });

  const [stadiums, setStadiums] = useState<Stadium[]>(() => {
    const saved = localStorage.getItem("botola_stadiums");
    return saved ? JSON.parse(saved) : STADIUMS;
  });

  const [matches, setMatches] = useState<Match[]>(() => {
    const saved = localStorage.getItem("botola_matches");
    return saved ? JSON.parse(saved) : MATCHES;
  });

  useEffect(() => {
    localStorage.setItem("botola_teams", JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem("botola_stadiums", JSON.stringify(stadiums));
  }, [stadiums]);

  useEffect(() => {
    localStorage.setItem("botola_matches", JSON.stringify(matches));
  }, [matches]);

  const addTeam = (teamData: Omit<Team, "id">) => {
    const newTeam = {
      ...teamData,
      id: Math.max(0, ...teams.map(t => t.id)) + 1
    };
    setTeams(prev => [...prev, newTeam]);
  };

  const addStadium = (stadiumData: Omit<Stadium, "id">) => {
    const newStadium = {
      ...stadiumData,
      id: Math.max(0, ...stadiums.map(s => s.id)) + 1
    };
    setStadiums(prev => [...prev, newStadium]);
  };

  const addMatch = (matchData: Omit<Match, "id">) => {
    const newMatch = {
      ...matchData,
      id: Math.max(0, ...matches.map(m => m.id)) + 1
    };
    setMatches(prev => [...prev, newMatch]);
  };

  const deleteTeam = (id: number) => setTeams(prev => prev.filter(t => t.id !== id));
  const deleteStadium = (id: number) => setStadiums(prev => prev.filter(s => s.id !== id));
  const deleteMatch = (id: number) => setMatches(prev => prev.filter(m => m.id !== id));

  const getTeamById = (id: number) => teams.find(t => t.id === id);
  const getStadiumById = (id: number) => stadiums.find(s => s.id === id);

  return (
    <DataContext.Provider value={{ 
      teams, 
      stadiums, 
      matches, 
      addTeam, 
      addStadium, 
      addMatch,
      deleteTeam,
      deleteStadium,
      deleteMatch,
      getTeamById,
      getStadiumById
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
