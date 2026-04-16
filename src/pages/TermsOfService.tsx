import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';

export default function TermsOfService() {
  return (
    <PageLayout>
      <PageHero title="Terms and Conditions" subtitle="Last Updated: April 16, 2026" />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg dark:prose-invert">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing our website (MyQuickTrippers), you agree to be bound by these Terms and Conditions of Use. If you disagree with any part of the terms, then you do not have permission to access the Service.
          </p>

          <h2>2. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, the Site and our services, including our source code, machine learning architectures, databases, software, functionality, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein are owned or controlled by us.
          </p>

          <h2>3. User Representations</h2>
          <p>
            By using the Site, you represent and warrant that: 
            <ol>
              <li>All registration information you submit will be true, accurate, current, and complete.</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
              <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
              <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
            </ol>
          </p>

          <h2>4. AI and Machine Learning Implementations</h2>
          <p>
            Our Service utilizes complex Natural Language Processing (NLP) models, predictive modeling algorithms, and statistical correlation structures to parse travel queries and track metrics. We provide these algorithms on an "as-is" basis to recommend the best locations for you. Although we curate responses for accuracy, our systems may occasionally return hallucinated or irregular recommendations. We bare no liability for booking errors resulting from automated AI suggestions.
          </p>

          <h2>5. Prohibited Activities</h2>
          <p>
            You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
          </p>

          <h2>6. Booking and Cancellation</h2>
          <p>
            When utilizing MyQuickTrippers to draft an itinerary or complete a booking:
            <ul>
              <li>Final quoted prices via WhatsApp or a sales agent will always override platform estimates and NLP generated budgets.</li>
              <li>Cancellation policies vary strictly per-hotel and per-region. Ensure you confirm with an agent prior to wire transfers or deposits.</li>
            </ul>
          </p>
        </div>
      </div>
    </PageLayout>
  );
}