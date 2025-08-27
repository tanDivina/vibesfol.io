<script lang="ts">
  import { WebsiteName, WebsiteBaseUrl } from "$config"
</script>

<svelte:head>
  <title>Privacy Policy - {WebsiteName}</title>
  <meta name="description" content="Privacy Policy for {WebsiteName} - How we collect, use, and protect your personal information." />
</svelte:head>

<div class="min-h-screen bg-base-100">
  <div class="container mx-auto px-4 py-16 max-w-4xl">
    <!-- Back to Homepage Button -->
    <div class="mb-6">
      <a href="/" class="btn btn-outline btn-sm">
        <svg
          class="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Back to Homepage
      </a>
    </div>

    <!-- Back to Homepage Button -->
    <div class="mb-6">
      <a href="/" class="btn btn-outline btn-sm">
        <svg
          class="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Back to Homepage
      </a>
    </div>

    <div class="prose prose-lg mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
      
      <div class="text-sm text-gray-600 mb-8 text-center">
        Last updated: January 1, 2025
      </div>

      <h2>1. Introduction</h2>
      <p>
        Welcome to {WebsiteName} ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website and in using our services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our portfolio platform services.
      </p>

      <h2>2. Information We Collect</h2>
      
      <h3>2.1 Personal Information</h3>
      <p>We may collect personal information that you voluntarily provide to us when you:</p>
      <ul>
        <li>Register for an account</li>
        <li>Create or update your portfolio</li>
        <li>Contact us through our contact forms</li>
        <li>Subscribe to our newsletter or communications</li>
        <li>Use our services</li>
      </ul>
      
      <p>This information may include:</p>
      <ul>
        <li>Name and contact information (email address, phone number)</li>
        <li>Professional information (company name, website, bio)</li>
        <li>Portfolio content (projects, descriptions, screenshots, testimonials)</li>
        <li>Social media profile links</li>
        <li>Payment information (processed securely through Stripe)</li>
      </ul>

      <h3>2.2 Automatically Collected Information</h3>
      <p>When you visit our website, we may automatically collect certain information about your device and usage patterns:</p>
      <ul>
        <li>IP address and location data</li>
        <li>Browser type and version</li>
        <li>Operating system</li>
        <li>Pages visited and time spent on pages</li>
        <li>Referring website addresses</li>
        <li>Device identifiers and characteristics</li>
      </ul>

      <h3>2.3 Cookies and Tracking Technologies</h3>
      <p>We use cookies and similar tracking technologies to enhance your experience on our website. These may include:</p>
      <ul>
        <li>Essential cookies for website functionality</li>
        <li>Authentication cookies to keep you logged in</li>
        <li>Analytics cookies to understand website usage</li>
        <li>Preference cookies to remember your settings</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use the information we collect for various purposes, including:</p>
      <ul>
        <li>Providing and maintaining our services</li>
        <li>Creating and hosting your portfolio</li>
        <li>Processing payments and managing subscriptions</li>
        <li>Communicating with you about your account and our services</li>
        <li>Providing customer support</li>
        <li>Improving our website and services</li>
        <li>Analyzing usage patterns and trends</li>
        <li>Preventing fraud and ensuring security</li>
        <li>Complying with legal obligations</li>
      </ul>

      <h2>4. Information Sharing and Disclosure</h2>
      
      <h3>4.1 Public Information</h3>
      <p>
        Your portfolio information that you choose to make public (such as your name, bio, projects, and contact information) will be visible to anyone who visits your portfolio page. You control what information is displayed publicly through your privacy settings.
      </p>

      <h3>4.2 Service Providers</h3>
      <p>We may share your information with trusted third-party service providers who assist us in operating our website and providing our services:</p>
      <ul>
        <li><strong>Supabase:</strong> Database and authentication services</li>
        <li><strong>Stripe:</strong> Payment processing</li>
        <li><strong>Resend:</strong> Email delivery services</li>
        <li><strong>Screenshot Services:</strong> Automated screenshot generation</li>
        <li><strong>Hosting Providers:</strong> Website hosting and content delivery</li>
      </ul>

      <h3>4.3 Legal Requirements</h3>
      <p>We may disclose your information if required to do so by law or in response to valid requests by public authorities.</p>

      <h2>5. Data Security</h2>
      <p>
        We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
      </p>
      <ul>
        <li>Encryption of data in transit and at rest</li>
        <li>Regular security assessments</li>
        <li>Access controls and authentication</li>
        <li>Secure payment processing through PCI-compliant providers</li>
      </ul>

      <h2>6. Data Retention</h2>
      <p>
        We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When you delete your account, we will delete your personal information, though some information may be retained for legal or legitimate business purposes.
      </p>

      <h2>7. Your Rights and Choices</h2>
      <p>Depending on your location, you may have certain rights regarding your personal information:</p>
      <ul>
        <li><strong>Access:</strong> Request access to your personal information</li>
        <li><strong>Correction:</strong> Request correction of inaccurate information</li>
        <li><strong>Deletion:</strong> Request deletion of your personal information</li>
        <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
        <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
        <li><strong>Object:</strong> Object to certain processing of your information</li>
      </ul>

      <h3>7.1 Managing Your Information</h3>
      <p>You can manage your personal information through your account settings:</p>
      <ul>
        <li>Update your profile information</li>
        <li>Control what information is publicly displayed</li>
        <li>Manage email subscription preferences</li>
        <li>Delete your account and associated data</li>
      </ul>

      <h2>8. International Data Transfers</h2>
      <p>
        Your information may be transferred to and processed in countries other than your own. We ensure that such transfers are conducted in accordance with applicable data protection laws and that appropriate safeguards are in place.
      </p>

      <h2>9. Children's Privacy</h2>
      <p>
        Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete such information.
      </p>

      <h2>10. Third-Party Links</h2>
      <h2>2. Information We Collect</h2>
      
      <h3>2.1 Personal Information</h3>
      <p>We may collect personal information that you voluntarily provide to us when you:</p>
      <ul>
        <li>Register for an account</li>
        <li>Create or update your portfolio</li>
        <li>Contact us through our contact forms</li>
        <li>Subscribe to our newsletter or communications</li>
        <li>Use our services</li>
      </ul>
      
      <p>This information may include:</p>
      <ul>
        <li>Name and contact information (email address, phone number)</li>
        <li>Professional information (company name, website, bio)</li>
        <li>Portfolio content (projects, descriptions, screenshots, testimonials)</li>
        <li>Social media profile links</li>
        <li>Payment information (processed securely through Stripe)</li>
      </ul>

      <h3>2.2 Automatically Collected Information</h3>
      <p>When you visit our website, we may automatically collect certain information about your device and usage patterns:</p>
      <ul>
        <li>IP address and location data</li>
        <li>Browser type and version</li>
        <li>Operating system</li>
        <li>Pages visited and time spent on pages</li>
        <li>Referring website addresses</li>
        <li>Device identifiers and characteristics</li>
      </ul>

      <h3>2.3 Cookies and Tracking Technologies</h3>
      <p>We use cookies and similar tracking technologies to enhance your experience on our website. These may include:</p>
      <ul>
        <li>Essential cookies for website functionality</li>
        <li>Authentication cookies to keep you logged in</li>
        <li>Analytics cookies to understand website usage</li>
        <li>Preference cookies to remember your settings</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use the information we collect for various purposes, including:</p>
      <ul>
        <li>Providing and maintaining our services</li>
        <li>Creating and hosting your portfolio</li>
        <li>Processing payments and managing subscriptions</li>
        <li>Communicating with you about your account and our services</li>
        <li>Providing customer support</li>
        <li>Improving our website and services</li>
        <li>Analyzing usage patterns and trends</li>
        <li>Preventing fraud and ensuring security</li>
        <li>Complying with legal obligations</li>
      </ul>

      <h2>4. Information Sharing and Disclosure</h2>
      
      <h3>4.1 Public Information</h3>
        Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
        Your portfolio information that you choose to make public (such as your name, bio, projects, and contact information) will be visible to anyone who visits your portfolio page. You control what information is displayed publicly through your privacy settings.

      <h2>11. Changes to This Privacy Policy</h2>
      <h3>4.2 Service Providers</h3>
      <p>We may share your information with trusted third-party service providers who assist us in operating our website and providing our services:</p>
      <ul>
        <li><strong>Supabase:</strong> Database and authentication services</li>
        <li><strong>Stripe:</strong> Payment processing</li>
        <li><strong>Resend:</strong> Email delivery services</li>
        <li><strong>Screenshot Services:</strong> Automated screenshot generation</li>
        <li><strong>Hosting Providers:</strong> Website hosting and content delivery</li>
      </ul>

      <h3>4.3 Legal Requirements</h3>
      <p>We may disclose your information if required to do so by law or in response to valid requests by public authorities.</p>

      <h2>5. Data Security</h2>
        We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
        We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:

      <ul>
        <li>Encryption of data in transit and at rest</li>
        <li>Regular security assessments</li>
        <li>Access controls and authentication</li>
        <li>Secure payment processing through PCI-compliant providers</li>
      </ul>
      <h2>12. Contact Us</h2>
      <h2>6. Data Retention</h2>
        If you have any questions about this Privacy Policy or our privacy practices, please contact us:
        We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When you delete your account, we will delete your personal information, though some information may be retained for legal or legitimate business purposes.
      <ul>
        <li>Through our <a href="/contact_us" class="link">contact form</a></li>
      <h2>7. Your Rights and Choices</h2>
      <p>Depending on your location, you may have certain rights regarding your personal information:</p>
      <ul>
        <li><strong>Access:</strong> Request access to your personal information</li>
        <li><strong>Correction:</strong> Request correction of inaccurate information</li>
        <li><strong>Deletion:</strong> Request deletion of your personal information</li>
        <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
        <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
        <li><strong>Object:</strong> Object to certain processing of your information</li>
      </ul>

      <h3>7.1 Managing Your Information</h3>
      <p>You can manage your personal information through your account settings:</p>
      <ul>
        <li>Update your profile information</li>
        <li>Control what information is publicly displayed</li>
        <li>Manage email subscription preferences</li>
        <li>Delete your account and associated data</li>
      </ul>

      <h2>8. International Data Transfers</h2>
        <li>Through your account settings if you have specific requests about your data</li>
        Your information may be transferred to and processed in countries other than your own. We ensure that such transfers are conducted in accordance with applicable data protection laws and that appropriate safeguards are in place.

      <h2>13. GDPR Compliance (EU Users)</h2>
      <h2>9. Children's Privacy</h2>
        If you are located in the European Union, you have additional rights under the General Data Protection Regulation (GDPR):
        Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete such information.
      <ul>
        <li>The right to be informed about how your data is used</li>
      <h2>10. Third-Party Links</h2>
        <li>The right to rectification of inaccurate data</li>
        Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
        <li>The right to restrict processing</li>
        <li>The right to data portability</li>
      <h2>11. Changes to This Privacy Policy</h2>
        <li>Rights related to automated decision-making</li>
        We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.

      <h2>14. California Privacy Rights (CCPA)</h2>
      <h2>12. Contact Us</h2>
        If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA):
        If you have any questions about this Privacy Policy or our privacy practices, please contact us:
      <ul>
      <ul>
        <li>Through our <a href="/contact_us" class="link">contact form</a></li>
        <li>By email: privacy@mydevfol.io</li>
        <li>Through your account settings if you have specific requests about your data</li>
      </ul>
        <li>The right to know what personal information we collect</li>
      <h2>13. GDPR Compliance (EU Users)</h2>
        <li>The right to opt-out of the sale of personal information (we do not sell personal information)</li>
        If you are located in the European Union, you have additional rights under the General Data Protection Regulation (GDPR):
      </ul>
      <ul>
        <li>The right to be informed about how your data is used</li>
        <li>The right to access your personal data</li>
        <li>The right to rectification of inaccurate data</li>
        <li>The right to erasure ("right to be forgotten")</li>
        <li>The right to restrict processing</li>
        <li>The right to data portability</li>
        <li>The right to object to processing</li>
        <li>Rights related to automated decision-making</li>
      </ul>

      <h2>14. California Privacy Rights (CCPA)</h2>
      <p>
        If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA):
      </p>
      <ul>
        <li>The right to know what personal information we collect</li>
        <li>The right to delete personal information</li>
        <li>The right to opt-out of the sale of personal information (we do not sell personal information)</li>
        <li>The right to non-discrimination for exercising your privacy rights</li>
      </ul>

      <div class="text-center mt-12">
        <a href="/" class="btn btn-primary">Back to Home</a>
      </div>
    </div>
  </div>
</div>