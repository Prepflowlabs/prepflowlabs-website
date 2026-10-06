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
                    <div className="pt-10">
                        <h3 className="text-lg font-semibold">
                            1. Introduction
                        </h3>
                        <p className="">
                            Your privacy is important to us. This Privacy Policy
                            describes how Urva Developments LLC (“we,” “us,” or
                            “our”) collects, uses, discloses, and protects
                            information in connection with our FBM Management
                            Integration for prep-center dashboards.
                        </p>
                    </div>
                    <div className="pt-5">
                        <h3 className="text-lg font-semibold">
                            2. Information We Collect
                        </h3>
                        <ul className="list-disc pl-10">
                            <li>
                                Order Identifiers: We receive and store only
                                unique order IDs (e.g. Amazon Order IDs) to
                                track fulfillment status.
                            </li>
                            <li>
                                Shipping Label Files: We generate and retain
                                shipping label documents (PDFs, images) needed
                                for carrier processing.
                            </li>
                            <li>
                                System Metadata: Timestamps, process logs, and
                                status codes, solely to support system
                                functionality and troubleshooting.
                            </li>
                        </ul>
                    </div>
                    <div className="pt-5">
                        <h3 className="text-lg font-semibold">
                            3. Information We Do Not Collect or Store
                        </h3>
                        <ul className="list-disc pl-10">
                            <li>
                                Personal Seller Data: We never collect or retain
                                any Amazon seller personal information,
                                including names, addresses, email addresses,
                                phone numbers, tax IDs, banking details, or any
                                other personally identifiable information (PII)
                                associated with seller accounts.
                            </li>
                            <li>
                                Customer PII Beyond What's on Labels: Except for
                                the minimal recipient shipping details embedded
                                in label files (required by carriers), we do not
                                retain customer PII in our databases.
                            </li>
                        </ul>
                    </div>
                    <div className="pt-5">
                        <h3 className="text-lg font-semibold">
                            4. How We Use Your Data
                        </h3>
                        <ul className="list-disc pl-10">
                            <li>
                                Order Processing: Order IDs are used to retrieve
                                order details at runtime via Amazon's Selling
                                Partner API; we do not store full order data.
                            </li>
                            <li>
                                Label Generation: Shipping label files are
                                created, stored temporarily for printing, and
                                archived to support audit trails and reprints.
                            </li>
                            <li>
                                System Operations & Analytics: Metadata and log
                                data help us monitor system health, performance
                                metrics, and to diagnose issues.
                            </li>
                        </ul>
                    </div>
                    <div className="pt-5">
                        <h3 className="text-lg font-semibold">
                            5. Data Storage & Security
                        </h3>
                        <ul className="list-disc pl-10">
                            <li>
                                Encrypted Storage: All stored data—order IDs,
                                label files, and logs—are encrypted at rest
                                using AES-256.
                            </li>
                            <li>
                                Access Controls: Role-based permissions ensure
                                only authorized personnel and system processes
                                can access stored files and identifiers.
                            </li>
                            <li>
                                Network Protections: Databases and file stores
                                reside behind firewalls and within private
                                network segments; access is restricted to our
                                application servers.
                            </li>
                        </ul>
                    </div>
                    <div className="pt-5">
                        <h3 className="text-lg font-semibold">
                            6. Data Retention
                        </h3>
                        <ul className="list-disc pl-10">
                            <li>
                                Order IDs & Labels: Retained for a configurable
                                period (default: 365 days) to support reprints,
                                audits, and compliance. After expiration, data
                                is securely purged.
                            </li>
                            <li>
                                Logs & Metadata: Retained for troubleshooting
                                and performance analysis for up to 90 days, then
                                automatically deleted.
                            </li>
                        </ul>
                    </div>
                    <div className="pt-5">
                        <h3 className="text-lg font-semibold">
                            7. Data Sharing
                        </h3>
                        <p>
                            We do not share your stored order IDs or label files
                            with any third parties except:
                        </p>
                        <ul className="list-disc pl-10">
                            <li>
                                We do not share your stored order IDs or label
                                files with any third parties except:
                            </li>
                            <li>
                                Service Providers: We use trusted subprocessors
                                (e.g. cloud hosting) under strict
                                confidentiality and security agreements.
                            </li>
                        </ul>
                    </div>
                    <div className="pt-5">
                        <h3 className="text-lg font-semibold">
                            8. Your Rights
                        </h3>
                        <ul className="list-disc pl-10">
                            <li>
                                Access & Correction: You may request a copy of
                                your stored order IDs and label archives.
                            </li>
                            <li>
                                Deletion: You can request early deletion of
                                order data and label files; we will comply
                                within 30 days, unless retention is legally
                                required.
                            </li>
                            <li>
                                Questions & Complaints: Contact us anytime at
                                support@prepflowlabs.com.
                            </li>
                        </ul>
                    </div>
                    <div className="items-left justify-start pb-20 text-left">
                        <p className="pt-5">
                            For any questions or further clarification, please
                            contact support@prepflowlabs.com.
                        </p>
                    </div>
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
                    <pre className="pt-5">
PREPFLOWLABS — ACCEPTABLE USE POLICY

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

Questions about this policy: support@prepflowlabs.com
                    </pre>
                </div>
            </div>
            <Footer />
        </div>
    );
}