export interface Stadium {
  id: number;
  name: string;
  city: string;
  capacity: number;
  description: string;
  image: string;
  mapUrl: string;
}

export const STADIUMS: Stadium[] = [
  { 
    id: 1, 
    name: "Stade Mohammed V", 
    city: "Casablanca", 
    capacity: 67000,
    description: "Le temple du football casablancais, antre légendaire du Wydad et du Raja. Inauguré en 1955, il a accueilli les plus grands événements sportifs du pays.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200",
    mapUrl: "https://www.google.com/maps?q=Stade+Mohammed+V+Casablanca&output=embed"
  },
  { 
    id: 2, 
    name: "Complexe Moulay Abdellah", 
    city: "Rabat", 
    capacity: 52000,
    description: "Le principal stade de la capitale, récemment rénové pour répondre aux standards internationaux. C'est le domicile de l'AS FAR.",
    image: "https://images.unsplash.com/photo-1540742648501-8 pre-150-a92c0199042b?auto=format&fit=crop&q=80&w=1200",
    mapUrl: "https://www.google.com/maps?q=Complexe+Moulay+Abdellah+Rabat&output=embed"
  },
  { 
    id: 3, 
    name: "Stade El Bachir", 
    city: "Mohammedia", 
    capacity: 15000,
    description: "Un stade historique de la ville des fleurs, réputé pour son ambiance chaleureuse et son rôle central dans le football de la région.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200",
    mapUrl: "https://www.google.com/maps?q=Stade+El+Bachir+Mohammedia&output=embed"
  },
  { 
    id: 4, 
    name: "Complexe Sportif de Fès", 
    city: "Fès", 
    capacity: 45000,
    description: "Une enceinte moderne accueillant les fervents supporters du MAS de Fès, réputée pour sa ferveur exceptionnelle.",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1200",
    mapUrl: "https://www.google.com/maps?q=Complexe+de+Fes&output=embed"
  },
  { 
    id: 5, 
    name: "Stade Municipal Berkane", 
    city: "Berkane", 
    capacity: 12000,
    description: "La forteresse orange de la RS Berkane, connue pour son gazon impeccable et sa proximité avec le public.",
    image: "https://images.unsplash.com/photo-1518091043644-c1d445eb9633?auto=format&fit=crop&q=80&w=1200",
    mapUrl: "https://www.google.com/maps?q=Stade+Municipal+Berkane&output=embed"
  },
  { 
    id: 6, 
    name: "Stade Adrar", 
    city: "Agadir", 
    capacity: 45480,
    description: "Un chef-d'œuvre architectural niché au pied des montagnes, offrant un panorama exceptionnel et une technologie de pointe.",
    image: "https://images.unsplash.com/photo-1431324155629-1a6eda1eedbc?auto=format&fit=crop&q=80&w=1200",
    mapUrl: "https://www.google.com/maps?q=Stade+Adrar+Agadir&output=embed"
  },
  { 
    id: 7, 
    name: "Stade Ibn Batouta", 
    city: "Tanger", 
    capacity: 45000,
    description: "Le joyau du Nord, agrandi pour la Coupe du Monde des Clubs, il est le théâtre des exploits de l'IRT Tanger.",
    image: "https://images.unsplash.com/photo-1561722748-038234676527?auto=format&fit=crop&q=80&w=1200",
    mapUrl: "https://www.google.com/maps?q=Stade+Ibn+Batouta+Tanger&output=embed"
  },
  { 
    id: 8, 
    name: "Stade El Massira", 
    city: "Safi", 
    capacity: 20000,
    description: "Une enceinte historique dominant l'Océan Atlantique, où la passion pour l'OCS Safi s'exprime à chaque match.",
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=1200",
    mapUrl: "https://www.google.com/maps?q=Stade+El+Massira+Safi&output=embed"
  },
  { 
    id: 9, 
    name: "Stade Municipal de Kénitra", 
    city: "Kénitra", 
    capacity: 15000,
    description: "Le fief du KAC Kénitra, un stade vibrant d'histoire où la ferveur des supporters 'Halala Boys' crée une atmosphère électrique.",
    image: "https://images.unsplash.com/photo-1459865264687-595d654df67e?auto=format&fit=crop&q=80&w=1200",
    mapUrl: "https://www.google.com/maps?q=Stade+Kenitra&output=embed"
  },
  { 
    id: 10, 
    name: "Stade Ahmed Choukri", 
    city: "Zemamra", 
    capacity: 8000,
    description: "Un stade moderne à taille humaine, symbole du développement du football dans les régions agricoles du pays.",
    image: "https://images.unsplash.com/photo-1556056504-517cf0121f3c?auto=format&fit=crop&q=80&w=1200",
    mapUrl: "https://www.google.com/maps?q=Stade+Ahmed+Choukri+Zemamra&output=embed"
  },
];

export const getStadiumById = (id: number) => STADIUMS.find(s => s.id === id);
