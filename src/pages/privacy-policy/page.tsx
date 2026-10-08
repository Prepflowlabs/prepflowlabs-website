/** @format */

import Footer from "../../components/footer";
import Header from "../../components/header";

export default function PrivacyPolicy() {
    return (
        <div className="w-screen">
            <Header />

            <div className="flex flex-col items-center justify-center pt-8">
                <div className="w-full px-5 text-left sm:max-w-4xl sm:px-0">
                    <h1 className="text-2xl font-bold">Privacy Policy</h1>
                    <pre className="pt-10" style={{whiteSpace:"pre-wrap"}}>
{`
Privacy Policy

1. Introduction

Your privacy is important to us. This Privacy Policy describes how Urva Developments LLC, operating as PrepflowLabs ("we," "us," or "our"), collects, uses, discloses, and protects information in connection with our warehouse management platform for Amazon FBA prep centers.

2. Information We Collect

- Order Identifiers: We receive and store unique order IDs (e.g. Amazon Order IDs) to track fulfillment status.
- Shipping Label Files: We generate and retain shipping label documents (PDFs, images) needed for carrier processing.
- Inventory & Shipment Data: Product catalog information, FNSKU data, shipment plans, and box content details retrieved via Amazon's Selling Partner API to support warehouse operations.
- System Metadata: Timestamps, process logs, and status codes, solely to support system functionality and troubleshooting.

3. Amazon Selling Partner API (SP-API) Data

PrepflowLabs integrates with Amazon's Selling Partner API to provide warehouse management features. Our use of SP-API data is governed by the following:

- SP-API data is used exclusively to deliver platform features that Selling Partners have been informed of, including inventory sync, shipment planning, order management, and label generation.
- We do not use SP-API data for any purpose outside of delivering PrepflowLabs functionality.
- All API calls correspond directly to features visible within the application. We do not make background API calls for unrelated purposes.
- SP-API data is not sold, licensed, or shared with third parties for their independent use.
- Selling Partners authorize SP-API access during onboarding and can revoke it at any time.

4. Information We Do Not Collect or Store

- Seller Financial Data: We do not collect or retain banking details, tax IDs, or payment information associated with seller accounts.
- Customer PII Beyond Labels: Except for minimal recipient shipping details embedded in label files (required by carriers), we do not retain customer PII in our databases.

5. How We Use Your Data

- Order Processing: Order IDs retrieve order details at runtime via SP-API; we do not store full order records beyond what is needed for warehouse operations.
- Inventory & Shipment Management: Product and shipment data powers receiving workflows, labeling, bundling, and FBA shipment creation.
- Label Generation: Shipping label files are created, stored for printing, and archived to support audit trails and reprints.
- System Operations: Metadata and log data help us monitor system health, performance, and diagnose issues.

6. Data Storage & Security

- Infrastructure: All data is hosted on Railway (SOC 2 Type II certified) with private networking by default.
- Encryption at Rest: AES-256 encryption at the storage layer.
- Encryption in Transit: SSL/TLS on all database connections and API communications.
- Access Controls: Role-based permissions ensure only authorized personnel and system processes can access stored data.

7. Data Retention

- Order IDs & Labels: Retained for a configurable period (default: 365 days) to support reprints, audits, and compliance. After expiration, data is securely purged.
- Logs & Metadata: Retained for up to 90 days for troubleshooting and performance analysis, then automatically deleted.

8. Data Sharing

We do not share your data with third parties except:

- Service Providers: Trusted subprocessors (e.g. cloud hosting) under strict confidentiality and security agreements.

9. Data Subject Rights

You have the following rights regarding your personal data:

- Right of Access: You may request a copy of the personal data we hold about you.
- Right to Rectification: You may request correction of inaccurate or incomplete personal data.
- Right to Erasure: You may request deletion of your personal data. We will comply within 30 days, unless retention is legally required.
- Right to Stop Processing: You may request that we cease processing your personal data for specific purposes. This includes the ability to disconnect your Amazon account and revoke SP-API access at any time.

To exercise any of these rights, contact us at support@prepflowlabs.com. We will respond to all requests within 30 days.`}
                    </pre>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export function TermsOfService() {
    return (
        <div className="w-screen">
            <Header />

            <div className="flex flex-col items-center justify-center pt-8">
                <div className="w-full px-5 text-left sm:max-w-4xl sm:px-0">
                    <h1 className="text-2xl font-bold">Terms</h1>
                    <pre className="pt-5" style={{whiteSpace:"pre-wrap"}}>
{`PREPFLOWLABS — ACCEPTABLE USE POLICY

PrepflowLabs provides warehouse management software for Amazon FBA prep centers. This policy defines what users of our platform may and may not do, and how we protect the integrity of the Amazon marketplace.


PROHIBITED ACTIVITIES

Users of PrepflowLabs must not:

• Engage in or facilitate brushing — sending unsolicited products to generate fake reviews, inflate sales rank, or manipulate product ratings

• Use the platform to infringe intellectual property, including counterfeiting, unauthorized use of trademarks, or listing products that violate copyright

• Facilitate any violation of the Amazon Services Business Solutions Agreement, Selling Partner agreements, or Amazon's Acceptable Use Policies

• Misuse Amazon Selling Partner API data for purposes outside the scope authorized by Amazon

• Scrape, redistribute, or sell data obtained through the platform or the SP-API

• Manipulate shipment data, inventory counts, or product information to deceive Amazon or end customers


INTELLECTUAL PROPERTY PROTECTION

PrepflowLabs does not store, process, or handle product listings, brand content, or creative assets. Our platform manages warehouse operations — receiving, labeling, packing, and shipment coordination.

Where our platform interacts with product data via the SP-API:

• We access only the data scopes required for warehouse management functions
• We do not modify product listings, brand registry data, or intellectual property records
• We do not facilitate the creation or distribution of counterfeit or infringing products
• Users who are found using the platform in connection with IP infringement will have their access terminated


COMPLIANCE WITH AMAZON AGREEMENTS

PrepflowLabs operates in compliance with the Amazon Selling Partner API Terms of Use and the Amazon Acceptable Use Policy. Specifically:

• We do not provide services designed to circumvent Amazon's policies or detection systems
• We do not assist sellers in violating the Business Solutions Agreement
• Our use of SP-API data is limited to authorized purposes: warehouse management, shipment planning, and inventory coordination
• We maintain data handling practices consistent with Amazon's Data Protection Policy


ENFORCEMENT

Violations of this policy result in:

1. Immediate suspension of platform access
2. Investigation and documentation of the violation
3. Permanent termination for confirmed violations
4. Reporting to Amazon where required by our SP-API obligations

Users are responsible for ensuring their use of PrepflowLabs complies with this policy and all applicable Amazon agreements.


CONTACT

Questions about this policy: support@prepflowlabs.com`}
                    </pre>
                </div>
            </div>
            <Footer />
        </div>
    );
}