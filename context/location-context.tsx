import React, { createContext, useContext, useState } from 'react';

type Location = {
  id: string;
  name: string;
  country: string;
};

type LocationContextType = {
  currentLocation: Location;
  setCurrentLocation: (location: Location) => void;
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [currentLocation, setCurrentLocation] = useState<Location>({
    id: '1',
    name: 'New York',
    country: 'USA',
  });

  return (
    <LocationContext.Provider value={{ currentLocation, setCurrentLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
} 