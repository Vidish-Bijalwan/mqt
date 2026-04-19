import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DestinationModel } from "@/types/models";
import { SmartImage } from "../SmartImage";

interface DestinationCardProps {
  destination: DestinationModel;
  showAlertBadge?: boolean;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, showAlertBadge = true }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Destructure for safety since some schema might be generated/legacy
  const heroUrl = destination.heroImage?.url || destination.image || '';
  const heroAlt = destination.heroImage?.alt || destination.name;
  
  const estimatedBudget = destination.estimatedBudget?.budget_per_day_inr || 2000;
  const rating = destination.rating || 4.5;
  const altitude = destination.altitude_meters;

  return (
    <div
      className="destination-card"
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        aspectRatio: '4/3',
        cursor: 'pointer',
        transform: isHovered ? 'scale(1.03) translateY(-4px)' : 'scale(1)',
        transition: 'transform 0.25s cubic-bezier(0.34, 1.2, 0.64, 1), box-shadow 0.25s ease',
        boxShadow: isHovered 
          ? '0 24px 48px rgba(0,0,0,0.5)' 
          : '0 8px 24px rgba(0,0,0,0.3)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(destination.mqtPackageSlug || `/destinations/${destination.stateSlug}/${destination.slug}`)}
    >
      {/* Image */}
      <SmartImage
        src={heroUrl}
        alt={heroAlt}
        fallbackType={destination.type as any}
        location={destination.name}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.4s ease'
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
        transition: 'opacity 0.25s ease'
      }} />

      {/* Alert badge */}
      {showAlertBadge && destination.isAlertPackage && (
        <div style={{
          position: 'absolute', top: '12px', right: '12px',
          background: 'linear-gradient(135deg, #F59E0B, #D97706)',
          borderRadius: '6px', padding: '4px 10px',
          fontSize: '10px', color: 'white', fontWeight: 'bold',
          animation: 'badgePulse 2s ease-in-out infinite',
          boxShadow: '0 4px 12px rgba(245,158,11,0.4)'
        }}>
          🔥 LIMITED SEATS
        </div>
      )}

      {/* Restricted zone badge */}
      {destination.isRestrictedZone && (
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          background: 'rgba(220,38,38,0.9)',
          borderRadius: '6px', padding: '4px 10px',
          fontSize: '10px', color: 'white', fontWeight: 'bold'
        }}>
          🔒 ILP Required
        </div>
      )}

      {/* Content */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '16px'
      }}>
        {/* Type tag */}
        <div style={{
          display: 'inline-block',
          background: 'rgba(245,158,11,0.2)',
          border: '1px solid rgba(245,158,11,0.4)',
          borderRadius: '20px', padding: '2px 8px',
          fontSize: '10px', color: '#FDE68A', fontWeight: 500,
          marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em'
        }}>
          {destination.type ? destination.type.replace('_', ' ') : 'Destination'}
        </div>

        <h3 style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>
          {destination.name}
        </h3>

        <p style={{ 
          color: 'rgba(255,255,255,0.75)', fontSize: '12px', lineHeight: '1.5',
          display: isHovered ? 'block' : '-webkit-box',
          WebkitLineClamp: isHovered ? 'unset' : 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
          marginBottom: '10px'
        }}>
          {destination.shortDescription}
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ color: '#FDE68A', fontSize: '12px' }}>
            ★ {Number(rating).toFixed(1)}
          </div>
          {altitude && (
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>
              ⛰ {altitude}m
            </div>
          )}
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', marginLeft: 'auto' }}>
            From ₹{estimatedBudget.toLocaleString('en-IN')}/day
          </div>
        </div>

        {/* CTA — shown on hover */}
        {isHovered && (
          <div style={{
            marginTop: '12px', display: 'flex', gap: '8px'
          }}>
            <button
              style={{
                flex: 1, height: '36px', borderRadius: '8px',
                background: '#25D366', border: 'none',
                color: 'white', fontSize: '12px', fontWeight: 'bold',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                e.stopPropagation();
                window.open(
                  `https://wa.me/919876543210?text=Hi MQT! I'm interested in visiting ${destination.name}. Please share package details.`,
                  '_blank'
                );
              }}
            >
              WhatsApp Enquiry
            </button>
            <button
              style={{
                height: '36px', padding: '0 12px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white', fontSize: '12px', cursor: 'pointer'
              }}
            >
              Details →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
