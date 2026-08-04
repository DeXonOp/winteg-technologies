import './Legal.css';

interface Props {
  onClose: () => void;
}

export default function TermsOfService({ onClose }: Props) {
  return (
    <div className="legal-modal-overlay" onClick={onClose}>
      <div className="legal-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="legal-modal-close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="legal-header">
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-subtitle">Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="legal-content">
          <h2>1. Agreement to Terms</h2>
          <p>
            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Winteg Technologies ("Company", "we", "us", or "our"), concerning your access to and use of the wintegtechnologies.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
          </p>
          <p>
            You agree that by accessing the Site and utilizing our services (Web Development, Software Engineering, AI Solutions, Mobile Apps, Social Media Marketing), you have read, understood, and agreed to be bound by all of these Terms of Service. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF SERVICE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
          </p>

          <h2>2. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of India, foreign jurisdictions, and international conventions.
          </p>

          <h2>3. User Representations</h2>
          <p>By using the Site, you represent and warrant that:</p>
          <ul>
            <li>All registration and contact information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
            <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise, except as permitted by us.</li>
            <li>You will not use the Site for any illegal or unauthorized purpose.</li>
          </ul>

          <h2>4. Service Provision and Deliverables</h2>
          <p>
            Winteg Technologies provides digital services on a per-contract basis. Project scopes, timelines, deliverables, and payment terms will be outlined in a separate Statement of Work (SOW) or formal agreement signed by both parties. These Terms of Service apply to the general usage of our digital footprint and initial engagements.
          </p>

          <h2>5. Prohibited Activities</h2>
          <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
          <p>As a user of the Site, you agree not to:</p>
          <ul>
            <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
            <li>Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email.</li>
            <li>Circumvent, disable, or otherwise interfere with security-related features of the Site.</li>
            <li>Engage in unauthorized framing of or linking to the Site.</li>
          </ul>

          <h2>6. Modifications and Interruptions</h2>
          <p>
            We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time.
          </p>
          <p>
            We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site or the Services.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These Terms shall be governed by and defined following the laws of India. Winteg Technologies and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
          </p>

          <h2>8. Limitations of Liability</h2>
          <p>
            IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE OR SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>

          <h2>9. Contact Us</h2>
          <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:</p>
          <ul>
            <li><strong>Email:</strong> contact@wintegtechnologies.com</li>
            <li><strong>Phone:</strong> +91-8100474669 / +91-8420573673</li>
            <li><strong>Web:</strong> <a href="https://wintegtechnologies.com/#contact" onClick={(e) => { e.preventDefault(); onClose(); const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>wintegtechnologies.com/contact</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
