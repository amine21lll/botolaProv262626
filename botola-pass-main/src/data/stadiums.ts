export interface Stadium {
  id: number;
  name: string;
  city: string;
  capacity: number;
}

export const STADIUMS: Stadium[] = [
  { id: 1, name: "Stade Mohammed V", city: "Casablanca", capacity: 67000 },
  { id: 2, name: "Stade Moulay Abdellah", city: "Rabat", capacity: 52000 },
  { id: 3, name: "Stade El Harti", city: "Marrakech", capacity: 15000 },
  { id: 4, name: "Complexe Sportif de Fès", city: "Fès", capacity: 45000 },
  { id: 5, name: "Stade Municipal Berkane", city: "Berkane", capacity: 12000 },
  { id: 6, name: "Stade Adrar", city: "Agadir", capacity: 45480 },
  { id: 7, name: "Stade Ibn Batouta", city: "Tanger", capacity: 45000 },
  { id: 8, name: "Stade El Massira", city: "Safi", capacity: 20000 },
  { id: 9, name: "Stade El Abdi", city: "El Jadida", capacity: 12000 },
  { id: 10, name: "Stade Ahmed Choukri", city: "Zemamra", capacity: 8000 },
];

export const getStadiumById = (id: number) => STADIUMS.find(s => s.id === id);
