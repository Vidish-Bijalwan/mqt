import React from "react";
import { DestinationModel } from "@/types/models";

interface LocationHoverCardProps {
  location: DestinationModel;
  mouseX: number;
  mouseY: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const LocationHoverCard: React.FC<LocationHoverCardProps> = ({ 
  location, mouseX, mouseY, containerRef 
}) => {
  const rect = containerRef.current?.getBoundingClientRect();
  const containerWidth = rect?.width || 600;
  const isRightSide = mouseX > containerWidth / 2;
  
  // Safe defaults
  const typeStr = location.type ? location.type.replace('_', ' ') : 'Destination';
  const heroUrl = location.heroImage?.url || location.image || '';
  const heroAlt = location.heroImage?.alt || location.name;
  const budget = location.estimatedBudget?.budget_per_day_inr || 2000;
  const rating = location.rating || 4.5;
  const activities = location.popularActivities || [];

  return (
    <div style={{
      position: 'absolute',
      left: isRightSide ? 'auto' : `${mouseX + 20}px`,
      right: isRightSide ? `${containerWidth - mouseX + 20}px` : 'auto',
      top: `${Math.min(mouseY - 10, (rect?.height || 400) - 280)}px`,
      width: '260px',
      background: 'rgba(15, 23, 42, 0.98)',
      border: '1px solid rgba(245,158,11,0.25)',
      borderRadius: '14px',
      overflow: 'hidden',
      boxShadow: '0 24px 48px rgba(0,0,0,0.6)',
      zIndex: 500,
      backdropFilter: 'blur(12px)',
      pointerEvents: 'none'
    }}>
      {/* Image */}
      <div style={{ height: '130px', overflow: 'hidden', position: 'relative', background: '#1E293B' }}>
        <img
          src={heroUrl}
          alt={heroAlt}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(15,23,42,0.8) 0%, transparent 50%)'
        }} />
        {/* Type badge */}
        <div style={{
          position: 'absolute', top: '8px', left: '8px',
          background: 'rgba(0,0,0,0.6)',
          borderRadius: '20px', padding: '3px 8px',
          fontSize: '10px', color: 'white', backdropFilter: 'blur(4px)', textTransform: 'capitalize'
        }}>
          {typeStr}
        </div>
        {/* Alert badge */}
        {location.isAlertPackage && (
          <div style={{
            position: 'absolute', top: '8px', right: '8px',
            background: 'rgba(245,158,11,0.9)',
            borderRadius: '20px', padding: '3px 8px',
            fontSize: '9px', color: 'white', fontWeight: 700
          }}>
            🔥 LIMITED
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '12px 14px' }}>
        <h4 style={{ color: 'white', fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>
          {location.name}
        </h4>
        
        {location.altitude_meters && (
          <div style={{ color: '#94A3B8', fontSize: '11px', marginBottom: '6px' }}>
            ⛰ {location.altitude_meters}m altitude
          </div>
        )}
        
        <p style={{ color: '#CBD5E1', fontSize: '12px', lineHeight: '1.5', marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {location.shortDescription}
        </p>

        {/* Best time */}
        {location.bestTimeToVisit && (
        <div style={{
          background: 'rgba(245,158,11,0.1)',
          border: '1px solid rgba(245,158,11,0.2)',
          borderRadius: '6px', padding: '4px 8px',
          marginBottom: '8px',
          display: 'flex', alignItems: 'center', gap: '4px'
        }}>
          <span style={{ fontSize: '10px', color: '#F59E0B', fontWeight: 600 }}>
            🗓 {location.bestTimeToVisit}
          </span>
        </div>
        )}

        {/* Activities — top 3 */}
        {activities.length > 0 && (
        <div style={{ marginBottom: '8px' }}>
          {activities.slice(0, 3).map((activity, i) => (
            <div key={i} style={{
              fontSize: '11px', color: '#94A3B8',
              display: 'flex', alignItems: 'center', gap: '4px',
              marginBottom: '2px'
            }}>
              <span style={{ color: '#F59E0B', fontSize: '8px' }}>◆</span>
              {activity.name}
            </div>
          ))}
        </div>
        )}

        {/* Budget */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '8px'
        }}>
          <div>
            <div style={{ fontSize: '9px', color: '#64748B' }}>Budget/day</div>
            <div style={{ fontSize: '12px', color: '#22C55E', fontWeight: 600 }}>
              ₹{budget.toLocaleString('en-IN')}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '9px', color: '#64748B' }}>Rating</div>
            <div style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 600 }}>
              ★ {rating}
            </div>
          </div>
        </div>

        {/* Permit warning */}
        {location.permits?.required && (
          <div style={{
            marginTop: '8px',
            background: location.permits.indianNationalsOnly 
              ? 'rgba(220,38,38,0.1)' : 'rgba(245,158,11,0.1)',
            border: `1px solid ${location.permits.indianNationalsOnly 
              ? 'rgba(220,38,38,0.3)' : 'rgba(245,158,11,0.3)'}`,
            borderRadius: '6px', padding: '5px 8px',
            fontSize: '10px',
            color: location.permits.indianNationalsOnly ? '#FCA5A5' : '#FDE68A'
          }}>
            {location.permits.indianNationalsOnly 
              ? '🔒 Indian Nationals Only — ILP'
              : `🎫 ${location.permits.type} Required`}
          </div>
        )}

        {/* Click hint */}
        <div style={{ 
          marginTop: '8px', fontSize: '10px', 
          color: '#64748B', textAlign: 'center' 
        }}>
          Click to view package details →
        </div>
      </div>
    </div>
  );
};
