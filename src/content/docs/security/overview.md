---
title: Security Overview
description: Security policies, access control, and vulnerability management for the Software Engineering Group.
sidebar:
  order: 1
---

# Security Overview

Security is a foundational requirement for a financial services engineering group. This section documents security policies, access control standards, and vulnerability management procedures that all engineers must follow.

## Security Principles

Our security posture is built on the following core principles:

| Principle | Description |
|-----------|-------------|
| **Zero Trust** | Never trust, always verify — every request is authenticated and authorized |
| **Least Privilege** | Grant only the minimum access required to perform a task |
| **Defense in Depth** | Multiple layers of security controls at every tier |
| **Shift Left** | Security is addressed early in the software development lifecycle |
| **Compliance First** | All systems meet SOC 2 Type II and PCI-DSS Level 1 requirements |

---

## Access Control

### Identity and Authentication

All access to systems and services uses **corporate Single Sign-On (SSO)** via Okta with enforced multi-factor authentication (MFA).

| Authentication Method | Use Case | MFA Required |
|-----------------------|---------|--------------|
| Okta SSO | All corporate SaaS and internal tools | Yes |
| AWS IAM + SSO | AWS Console and CLI access | Yes |
| GitHub OAuth + SAML | Source code repositories | Yes |
| Service Accounts | Service-to-service API calls | API Keys + mTLS |

### Role-Based Access Control (RBAC)

Access to systems is granted based on job function. Engineers must request access through the IT Service Portal.

| Role | Access Level | Systems |
|------|-------------|---------|
| **Junior Engineer** | Read-only to production; full dev/staging | GitHub, Datadog, Jira |
| **Engineer** | Limited production read; full dev/staging | GitHub, AWS dev, Datadog |
| **Senior Engineer** | Production read + deploy; no direct DB access | All dev/staging/prod (view) |
| **Tech Lead** | Production access; database read | All environments |
| **SRE / Platform** | Full production access | All environments + infra |
| **Security Team** | Audit and security tooling | All environments (read-only) |

### AWS Permissions Model

All AWS access follows **IAM roles with the principle of least privilege**. Service accounts use instance profiles (never long-lived IAM credentials).

```
Engineers → Okta SSO → AWS SSO → Role-based AWS IAM Role → AWS Resources
```

**Prohibited:** Hard-coded AWS credentials in source code, long-lived access keys for human users, shared IAM users.

---

## Data Classification

| Classification | Description | Examples | Handling |
|---------------|-------------|---------|---------|
| **Public** | Freely shareable | Marketing content, public docs | No restrictions |
| **Internal** | For employees only | Internal tools, architecture docs | Corporate SSO required |
| **Confidential** | Business sensitive | Source code, financial reports | Need-to-know; encrypted |
| **Restricted** | Highly sensitive / regulated | PII, PAN, account numbers | Encrypted + audit log required |

### PII and Financial Data Handling

- All Personally Identifiable Information (PII) must be **encrypted at rest** (AES-256) and **in transit** (TLS 1.3)
- Payment card data (PAN) must be **tokenized** — never stored in plaintext
- Social Security Numbers (SSN) must be **encrypted using AWS KMS** with field-level encryption
- Access to restricted data is **logged in the audit trail** for compliance

---

## Vulnerability Management

### Security Scanning Pipeline

All code changes go through an automated security scanning pipeline before merging:

```
Developer Push → SAST Scan (SonarQube) → Dependency Scan (Snyk) 
  → Container Scan (Trivy) → IaC Scan (Checkov) → PR Approval Required
```

### SAST (Static Application Security Testing)

- **Tool:** SonarQube
- **Trigger:** Every pull request
- **Blocking:** Critical and High severity findings block merge
- **Review:** Security team reviews Medium findings weekly

### Dependency Scanning

- **Tool:** Snyk
- **Trigger:** Daily automated scan + every PR
- **Policy:** Critical CVEs must be remediated within 24 hours; High within 7 days

### Container Image Scanning

- **Tool:** Trivy (integrated with ECR)
- **Trigger:** On every image push to ECR
- **Policy:** No containers with Critical CVEs may be deployed to production

### Penetration Testing

- External penetration test conducted **annually** by a qualified third party
- Internal red team exercises conducted **quarterly**
- All findings are tracked in the Security Jira board

---

## Incident Response (Security)

In the event of a security incident:

1. **Contain** – Isolate affected systems immediately
2. **Notify** – Alert the Security Team and CISO within 15 minutes
3. **Assess** – Determine scope, impact, and affected data
4. **Eradicate** – Remove the threat
5. **Recover** – Restore systems from verified clean backups
6. **Post-mortem** – Mandatory within 5 business days

For complete incident response procedures, see [Runbooks: Security Incident Response](/runbooks/overview/).

---

## Compliance

| Framework | Status | Last Audit | Next Audit |
|-----------|--------|-----------|-----------|
| SOC 2 Type II | ✅ Certified | Q4 2025 | Q4 2026 |
| PCI-DSS Level 1 | ✅ Certified | Q3 2025 | Q3 2026 |
| GDPR | ✅ Compliant | Ongoing | — |
| CCPA | ✅ Compliant | Ongoing | — |
| ISO 27001 | 🔄 In Progress | — | Q2 2026 |

---

## Related Documents

- [Architecture Overview](/architecture/overview/)
- [Infrastructure Overview](/infrastructure/overview/)
- [Runbooks](/runbooks/overview/)
- [API Authentication](/apis/overview/)
