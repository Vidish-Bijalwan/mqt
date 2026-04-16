import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';

export default function PrivacyPolicy() {
  return (
    <PageLayout>
      <PageHero title="Privacy Policy" subtitle="Last Updated: April 16, 2026" />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg dark:prose-invert">
          <h2>1. Introduction</h2>
          <p>
            Welcome to MyQuickTrippers ("MQT", "we", "our", "us"). We are committed to protecting your personal information and your right to privacy. 
            If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise when you contact us.
          </p>
          <ul>
            <li><strong>Personal Information Provided by You:</strong> We collect names; phone numbers; email addresses; and other similar information.</li>
            <li><strong>Data collected automatically:</strong> We automatically collect certain information like IP addresses, browser and device characteristics, operating systems, and page views, to improve our app performance and run our Machine Learning personalization engines.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>
            We use personal information collected via our website for a variety of business purposes, including:
          </p>
          <ul>
            <li><strong>Personalized Package Recommendations:</strong> Our content-based machine learning systems analyze your engagement to suggest travel itineraries.</li>
            <li><strong>Conversion and Usability Analytics:</strong> We employ a predictive model to identify when users are frustrated or stuck to provide proactive assistance (such as our Smart AI Planner nudge).</li>
            <li><strong>Semantic Search Logs:</strong> Queries entered into our AI search bar are anonymized and processed using NLP embeddings for finding matches.</li>
            <li><strong>Communications:</strong> To send you marketing and promotional communications.</li>
          </ul>

          <h2>4. Cookies and Similar Technologies</h2>
          <p>
            We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. These are strictly used to track user sessions, handle preferences, and deliver our intelligent contextual trip planner.
          </p>

          <h2>5. Keeping Your Information Safe</h2>
          <p>
            We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards, no internet transmission can be guaranteed to be 100% secure.
          </p>

          <h2>6. Updates to This Notice</h2>
          <p>
            We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}