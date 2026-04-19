import React from "react";
import { DestinationModel } from "@/types/models";

interface DestinationPin3DProps {
  destination: DestinationModel;
  isHovered: boolean;
  isSelected: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

export const DestinationPin3D: React.FC<DestinationPin3DProps> = ({ 
  destination, isHovered, isSelected, onHover, onLeave, onClick 
}) => {
  const typeConfig: Record<string, { color: string, icon: string, label: string }> = {
    temple: { color: '#F97316', icon: '🛕', label: 'Temple' },
    pilgrimage: { color: '#EF4444', icon: '🙏', label: 'Pilgrimage' },
    hill_station: { color: '#8B5CF6', icon: '⛰', label: 'Hill Station' },
    beach: { color: '#06B6D4', icon: '🏖', label: 'Beach' },
    wildlife: { color: '#22C55E', icon: '🐯', label: 'Wildlife' },
    heritage: { color: '#F59E0B', icon: '🏛', label: 'Heritage' },
    adventure: { color: '#3B82F6', icon: '🧗', label: 'Adventure' },
    valley: { color: '#10B981', icon: '🌿', label: 'Valley' },
    lake: { color: '#0EA5E9', icon: '💧', label: 'Lake' },
    restricted_zone: { color: '#DC2626', icon: '🔒', label: 'Restricted' },
    city: { color: '#6366F1', icon: '🏙', label: 'City' }
  };

  const config = typeConfig[destination.type] || typeConfig.heritage;
  const size = isHovered || isSelected ? 40 : 32;
  const translateY = isHovered ? -12 : isSelected ? -6 : 0;
  
  // Safe default for generated coordinates
  const posX = destination.mapPosition?.x || 50;
  const posY = destination.mapPosition?.y || 50;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${posX}%`,
        top: `${posY}%`,
        transform: `translate(-50%, -100%) translateY(${translateY}px)`,
        transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'pointer',
        zIndex: isHovered || isSelected ? 100 : 10,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Glow ring for alert packages */}
      {destination.isAlertPackage && (
        <div style={{
          position: 'absolute',
          inset: '-6px',
          borderRadius: '50%',
          border: `2px solid #F59E0B`,
          animation: 'pinGlow 2s ease-in-out infinite',
          opacity: 0.7
        }} />
      )}

      {/* Pin body */}
      <div style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50% 50% 50% 0',
        transform: 'rotate(-45deg)',
        background: `linear-gradient(135deg, ${config.color}, ${config.color}CC)`,
        boxShadow: isHovered 
          ? `0 12px 24px rgba(0,0,0,0.5), 0 0 0 4px ${config.color}40` 
          : `0 4px 12px rgba(0,0,0,0.35)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.25s ease',
        border: '2px solid rgba(255,255,255,0.3)'
      }}>
        <span style={{ 
          transform: 'rotate(45deg)', 
          fontSize: isHovered ? '16px' : '13px',
          lineHeight: 1
        }}>
          {config.icon}
        </span>
      </div>

      {/* Destination name label — always visible for larger pins */}
      {(isHovered || isSelected || size > 34) && (
        <div style={{
          position: 'absolute',
          bottom: `${size + 8}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(15, 23, 42, 0.95)',
          color: 'white',
          padding: '3px 8px',
          borderRadius: '5px',
          fontSize: '10px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)',
          border: '0.5px solid rgba(255,255,255,0.1)'
        }}>
          {destination.isAlertPackage && (
            <span style={{ color: '#F59E0B', marginRight: '3px' }}>🔥</span>
          )}
          {destination.name}
          {destination.altitude_meters && (
            <span style={{ color: '#94A3B8', marginLeft: '4px', fontSize: '9px' }}>
              {destination.altitude_meters}m
            </span>
          )}
          {/* Tooltip arrow */}
          <div style={{
            position: 'absolute',
            bottom: '-5px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '0',
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid rgba(15, 23, 42, 0.95)'
          }} />
        </div>
      )}

      {/* Pin shadow on the "ground" */}
      <div style={{
        position: 'absolute',
        bottom: '-8px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: `${isHovered ? 28 : 18}px`,
        height: '6px',
        background: 'rgba(0,0,0,0.35)',
        borderRadius: '50%',
        filter: 'blur(3px)',
        transition: 'all 0.25s ease'
      }} />
    </div>
  );
};
