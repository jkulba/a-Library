---
title: Getting Started Overview
description: Onboarding guide, setup guides, and tools installation for new engineers joining the Software Engineering Group.
sidebar:
  order: 1
---

# Getting Started

Welcome to the Software Engineering Group. This section provides everything you need to get up and running quickly — from onboarding checklists to local development environment setup.

## Onboarding Checklist

Before your first day and in your first two weeks, complete the following steps:

### Day One
- [ ] Receive access credentials from IT
- [ ] Log in to corporate SSO (Okta)
- [ ] Join required Slack channels (`#engineering`, `#dev-announcements`, `#on-call`)
- [ ] Set up multi-factor authentication (MFA) on all corporate accounts
- [ ] Review and sign the Acceptable Use Policy

### First Week
- [ ] Complete mandatory security awareness training
- [ ] Set up your local development environment (see [Local Dev Setup](#local-development-environment))
- [ ] Request access to GitHub organization
- [ ] Review the [coding standards](/development/coding-standards/)
- [ ] Meet your team lead and engineering manager
- [ ] Review the current sprint backlog

### First Two Weeks
- [ ] Complete your first pull request
- [ ] Shadow an on-call engineer
- [ ] Review the [architecture overview](/architecture/overview/)
- [ ] Complete the internal compliance training modules

---

## Local Development Environment

### Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| Git | 2.40+ | Version control |
| Node.js | 20 LTS | JavaScript runtime |
| Docker Desktop | Latest | Container runtime |
| VS Code | Latest | Recommended IDE |
| AWS CLI | v2 | Cloud provider CLI |

### Setup Steps

1. **Clone the primary repositories**

   ```bash
   git clone git@github.com:your-org/core-api.git
   git clone git@github.com:your-org/frontend-app.git
   git clone git@github.com:your-org/infra-as-code.git
   ```

2. **Install dependencies**

   ```bash
   cd core-api
   npm install
   cp .env.example .env.local
   ```

3. **Configure AWS CLI**

   ```bash
   aws configure --profile dev
   # Enter your AWS Access Key ID and Secret
   # Default region: us-east-1
   # Output format: json
   ```

4. **Start local services**

   ```bash
   docker compose up -d
   npm run dev
   ```

5. **Verify setup**

   ```bash
   curl http://localhost:3000/health
   # Expected: {"status":"ok","version":"x.x.x"}
   ```

---

## Tools & Software

### Required Tools

| Tool | Purpose | Download |
|------|---------|---------|
| Git | Source control | https://git-scm.com |
| Docker Desktop | Container runtime | https://docker.com |
| Node.js 20 LTS | JavaScript runtime | https://nodejs.org |
| AWS CLI v2 | AWS management | https://aws.amazon.com/cli |
| kubectl | Kubernetes CLI | https://kubernetes.io/docs/tasks/tools |
| Terraform | Infrastructure as Code | https://www.terraform.io |

### Recommended VS Code Extensions

- **GitLens** – Enhanced Git capabilities
- **ESLint** – JavaScript/TypeScript linting
- **Prettier** – Code formatting
- **Docker** – Docker container management
- **AWS Toolkit** – AWS service integration
- **REST Client** – API testing

### Corporate Accounts

| System | Purpose | Access Request |
|--------|---------|---------------|
| GitHub | Source code | IT Help Desk |
| Jira | Issue tracking | Team Lead |
| Confluence | Wiki & docs | IT Help Desk |
| AWS Console | Cloud infrastructure | Security Team |
| Datadog | Monitoring & observability | Team Lead |
| PagerDuty | Incident alerting | On-call Manager |

---

## Important Links

- [Engineering Handbook](/development/overview/) – Coding standards and best practices
- [Architecture Overview](/architecture/overview/) – System design reference
- [Security Policies](/security/overview/) – Security guidelines and requirements
- [Runbooks](/runbooks/overview/) – Operational procedures
- [API Reference](/apis/overview/) – API documentation
