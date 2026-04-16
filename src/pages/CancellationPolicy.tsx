import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';

export default function CancellationPolicy() {
  return (
    <PageLayout>
      <PageHero title="Cancellation & Refund Policy" subtitle="Clear, transparent terms for peace of mind" />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg dark:prose-invert">
          <h2>1. Standard Cancellation Policy</h2>
          <p>We understand that plans can change. Cancellations made 30+ days before the travel date get a full refund minus a 10% processing fee. Cancellations made 15-29 days prior receive a 50% refund. No refunds are possible within 14 days of travel.</p>
          
          <h2>2. Flight & Train Bookings</h2>
          <p>Flight and rail tickets are subject completely to the third-party operator's terms and conditions. MyQuickTrippers will only process refunds issued by the carrier directly.</p>

          <h2>3. Bad Weather / Force Majeure</h2>
          <p>For trips strongly impacting by extreme weather or unforeseen governmental restrictions (e.g., Kedarnath or Valley of Flowers closures), we offer full travel credit valid for 12 months with no rescheduling fee.</p>
        </div>
      </div>
    </PageLayout>
  );
}
