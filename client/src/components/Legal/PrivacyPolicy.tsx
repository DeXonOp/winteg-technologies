import './Legal.css';

interface Props {
  onClose: () => void;
}

export default function PrivacyPolicy({ onClose }: Props) {
  return (
    <div className="legal-modal-overlay" onClick={onClose}>
      <div className="legal-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="legal-modal-close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="legal-header">
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-subtitle">Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="legal-content">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Winteg Technologies ("we", "our", or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy ("Policy") informs you about how we look after your personal data when you visit our website (wintegtechnologies.com), use our services, or interact with us, and tells you about your privacy rights and how the law protects you.
          </p>
          <p>
            This Policy applies in accordance with the <strong>Information Technology Act, 2000 (IT Act)</strong> of India, the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (SPDI Rules)</strong>, the <strong>General Data Protection Regulation (GDPR)</strong> for our European users, and the <strong>California Consumer Privacy Act (CCPA)</strong> for our California-based users.
          </p>

          <h2>2. The Data We Collect About You</h2>
          <p>We may collect, use, store, and transfer different kinds of personal data about you, which we have grouped together as follows:</p>
          <ul>
            <li><strong>Identity Data:</strong> includes first name, last name, username, or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes billing address, email address, and telephone numbers.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong>Usage Data:</strong> includes information about how you use our website, products, and services.</li>
            <li><strong>Marketing and Communications Data:</strong> includes your preferences in receiving marketing from us and your communication preferences.</li>
          </ul>

          <h2>3. How Is Your Personal Data Collected?</h2>
          <p>We use different methods to collect data from and about you, including through:</p>
          <ul>
            <li><strong>Direct interactions:</strong> You may give us your Identity and Contact Data by filling in forms or by corresponding with us by post, phone, email, or otherwise (e.g., when you request a quote or subscribe to our newsletter).</li>
            <li><strong>Automated technologies or interactions:</strong> As you interact with our website, we will automatically collect Technical Data about your equipment, browsing actions, and patterns. We collect this personal data by using cookies, server logs, and other similar technologies.</li>
          </ul>

          <h2>4. How We Use Your Personal Data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2>5. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed, conforming strictly with the SPDI Rules and international standards. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements.
          </p>

          <h2>7. Your Legal Rights</h2>
          <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data. These include the right to:</p>
          <ul>
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Object to processing of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
            <li>Request transfer of your personal data.</li>
            <li>Right to withdraw consent.</li>
          </ul>
          <p>If you wish to exercise any of the rights set out above, please contact us.</p>

          <h2>8. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
          <p>Under the CCPA, among other rights, California consumers have the right to:</p>
          <ul>
            <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
            <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
            <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
          </ul>

          <h2>9. GDPR Data Protection Rights</h2>
          <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
          <ul>
            <li>The right to access – You have the right to request copies of your personal data.</li>
            <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
          </ul>

          <h2>10. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul>
            <li><strong>By email:</strong> contact@wintegtechnologies.com</li>
            <li><strong>By phone:</strong> +91-8100474669 / +91-8420573673</li>
            <li><strong>By visiting this page on our website:</strong> <a href="https://wintegtechnologies.com/#contact" onClick={(e) => { e.preventDefault(); onClose(); const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>wintegtechnologies.com/contact</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
