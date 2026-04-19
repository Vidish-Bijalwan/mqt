import React, { useEffect, useRef } from "react";
import { DestinationModel, StateModel } from "@/types/models";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon issue
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom 3D Marker Icon HTML
const createCustomIcon = (dest: DestinationModel) => {
  const isAlert = dest.isAlertPackage;
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        width: 32px; height: 32px;
        background: linear-gradient(135deg, ${dest.isAlertPackage ? '#F59E0B' : '#3B82F6'}, ${dest.isAlertPackage ? '#D97706' : '#2563EB'});
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex; align-items: center; justify-content: center;
      ">
        <span style="transform: rotate(45deg); font-size: 14px;">
           ${isAlert ? '🔥' : '📍'}
        </span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

interface StateDestinationMapProps {
  stateId: string;
  destinations: DestinationModel[];
  stateModel: StateModel;
}

export const StateDestinationMap: React.FC<StateDestinationMapProps> = ({ destinations, stateModel }) => {
  const navigate = useNavigate();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // If no container or already initialized, do nothing
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize map
    const defaultCenter: [number, number] = destinations.length > 0 
      ? [destinations[0].coordinates.lat, destinations[0].coordinates.lng]
      : [20.5937, 78.9629];

    const map = L.map(mapContainerRef.current).setView(defaultCenter, 6);
    mapInstanceRef.current = map;

    L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&gl=IN', {
      attribution: '&copy; Google Maps',
    }).addTo(map);

    // Add Markers
    if (destinations.length > 0) {
      const bounds = L.latLngBounds([]);
      
      destinations.forEach(dest => {
        const marker = L.marker([dest.coordinates.lat, dest.coordinates.lng], {
          icon: createCustomIcon(dest)
        }).addTo(map);
        
        bounds.extend([dest.coordinates.lat, dest.coordinates.lng]);

        // Simple popup
        const popupContent = document.createElement('div');
        popupContent.innerHTML = `
          <div style="min-width: 180px; padding: 4px;">
            <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">${dest.name}</h3>
            <p style="font-size: 11px; color: #666; margin-bottom: 8px;">${dest.shortDescription || ''}</p>
            <button id="btn-${dest.id}" style="width: 100%; background: #0E7490; color: white; border: none; padding: 6px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;">
              VIEW DETAILS
            </button>
          </div>
        `;

        marker.bindPopup(popupContent);
        
        // Add click listener to button inside popup
        marker.on('popupopen', () => {
          const btn = document.getElementById(`btn-${dest.id}`);
          if (btn) {
            btn.addEventListener('click', () => {
              navigate(dest.mqtPackageSlug || `/destinations/${dest.stateSlug}/${dest.slug}`);
            });
          }
        });
      });

      // Fit bounds
      if (destinations.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
      }
    }

    // Cleanup when component unmounts
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [destinations, navigate]);

  // If no destinations, fallback
  if (!destinations || destinations.length === 0) {
    return (
      <div className="w-full py-12 text-center text-muted-foreground border border-border/50 rounded-xl bg-card/50">
        <p>Interactive map preparing for {stateModel?.name || 'this region'}</p>
      </div>
    );
  }

  return (
    <div className="state-destination-map w-full max-w-5xl mx-auto my-12 pt-8">
      {/* Header */}
      <div className="map-header mb-8 text-center px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          {stateModel?.name || "Explore"} 
          <span className="text-primary italic font-medium ml-2">Tourist Map</span>
        </h2>
        <p className="text-muted-foreground mt-3 text-lg max-w-2xl mx-auto">
          Explore interactive locations. Click pins for more details and packages.
        </p>
      </div>

      {/* Map area */}
      <div 
        className="w-full aspect-[4/3] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-xl border-2 border-primary/20 relative z-0"
      >
        <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
};
