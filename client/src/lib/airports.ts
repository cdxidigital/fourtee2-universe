export type Airport = { code: string; city: string; airport: string; country: string };

export const airports: Airport[] = [
  { code: "PER", city: "Perth", airport: "Perth Airport", country: "Australia" },
  { code: "SYD", city: "Sydney", airport: "Kingsford Smith", country: "Australia" },
  { code: "MEL", city: "Melbourne", airport: "Tullamarine", country: "Australia" },
  { code: "BNE", city: "Brisbane", airport: "Brisbane Airport", country: "Australia" },
  { code: "ADL", city: "Adelaide", airport: "Adelaide Airport", country: "Australia" },
  { code: "AKL", city: "Auckland", airport: "Auckland Airport", country: "New Zealand" },
  { code: "DPS", city: "Bali", airport: "Ngurah Rai", country: "Indonesia" },
  { code: "SIN", city: "Singapore", airport: "Changi", country: "Singapore" },
  { code: "NRT", city: "Tokyo", airport: "Narita", country: "Japan" },
  { code: "HND", city: "Tokyo", airport: "Haneda", country: "Japan" },
  { code: "DXB", city: "Dubai", airport: "Dubai International", country: "United Arab Emirates" },
  { code: "DOH", city: "Doha", airport: "Hamad International", country: "Qatar" },
  { code: "LHR", city: "London", airport: "Heathrow", country: "United Kingdom" },
  { code: "CDG", city: "Paris", airport: "Charles de Gaulle", country: "France" },
  { code: "FCO", city: "Rome", airport: "Fiumicino", country: "Italy" },
  { code: "LAX", city: "Los Angeles", airport: "Los Angeles International", country: "United States" },
  { code: "JFK", city: "New York", airport: "John F. Kennedy International", country: "United States" },
  { code: "SFO", city: "San Francisco", airport: "San Francisco International", country: "United States" },
];

export function airportValue(airport: Airport) {
  return `${airport.city} (${airport.code})`;
}

export function searchAirports(query: string, limit = 6) {
  const normalized = query.trim().toLowerCase();
  const results = normalized
    ? airports.filter((airport) => `${airport.code} ${airport.city} ${airport.airport} ${airport.country}`.toLowerCase().includes(normalized))
    : airports;
  return results.slice(0, limit);
}
