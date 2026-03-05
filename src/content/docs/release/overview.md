---
title: Release Overview
description: Changelog, deployment procedures, and versioning strategy for the Software Engineering Group.
sidebar:
  order: 1
---

# Release Overview

This section documents the release management process, versioning strategy, deployment procedures, and changelog for all services in the platform.

## Release Philosophy

We follow a **continuous delivery** model with structured release gates. All services use semantic versioning and require automated testing to pass before any deployment to production.

### Release Principles

| Principle | Description |
|-----------|-------------|
| **Semantic Versioning** | All releases follow SemVer (MAJOR.MINOR.PATCH) |
| **Automated Testing** | All tests must pass before deployment |
| **Immutable Artifacts** | Container images are tagged with commit SHA and never mutated |
| **Progressive Rollout** | Production deployments use canary or blue/green |
| **Rollback Ready** | Every deployment can be rolled back within 5 minutes |
| **Change Control** | Production deployments require change request approval |

---

## Versioning Strategy

### Semantic Versioning (SemVer)

All services follow [SemVer 2.0.0](https://semver.org/):

```
MAJOR.MINOR.PATCH

1.0.0  → Initial stable release
1.1.0  → New feature added (backward compatible)
1.1.1  → Bug fix (backward compatible)
2.0.0  → Breaking change
```

| Version Bump | When to Use |
|-------------|-------------|
| **MAJOR** | Breaking API changes, incompatible data model changes |
| **MINOR** | New features, new endpoints (backward compatible) |
| **PATCH** | Bug fixes, security patches, performance improvements |

### Git Tag Format

```
v{MAJOR}.{MINOR}.{PATCH}
v{MAJOR}.{MINOR}.{PATCH}-rc.{N}   # Release candidate
v{MAJOR}.{MINOR}.{PATCH}-hotfix   # Emergency production fix
```

---

## Deployment Process

### Environments & Promotion Path

```
Feature Branch → Develop → Staging → Production
     (CI)          (CI)     (Manual Gate)  (Change Request)
```

| Environment | Trigger | Approval Required | Rollback SLA |
|-------------|---------|------------------|-------------|
| **Development** | Auto on PR merge | None | Immediate |
| **Staging** | Auto on `develop` branch merge | None | Immediate |
| **Production** | Manual trigger + Change Request | 2 approvals | < 5 minutes |

### Production Deployment Steps

1. **Create Change Request** in ServiceNow (minimum 24h notice for standard, immediate for emergency)
2. **Tag Release** in GitHub with `git tag v1.2.3 && git push --tags`
3. **CI/CD Pipeline** builds and tests the tagged release
4. **Staging Validation** — QA sign-off required
5. **Change Window Opens** — Deploy begins
6. **Canary Deployment** — 5% of traffic routed to new version
7. **Monitor for 15 minutes** — Check error rates, latency, business metrics
8. **Full Rollout** — Traffic shifted 100% to new version
9. **Change Request Closed** — Document outcome

### Rollback Procedure

If issues are detected post-deployment:

```bash
# Immediate rollback using ArgoCD
argocd app rollback payment-service --revision {previous-revision}

# Or using Helm
helm rollback payment-service --namespace production
```

All rollbacks must be documented in the change request with root cause analysis.

---

## Change Freeze Periods

No production deployments are permitted during:

| Period | Dates | Exception Process |
|--------|-------|-----------------|
| **End of Quarter** | Last 5 business days of each quarter | CISO + CTO approval |
| **Major Holidays** | Christmas Eve to New Year's Day | Emergency only |
| **Regulatory Deadlines** | As published by Compliance | Emergency only |
| **Audit Periods** | As notified by Security | Security Team approval |

---

## Changelog

### Format

All services maintain a `CHANGELOG.md` in their repository following [Keep a Changelog](https://keepachangelog.com/) format:

```markdown
# Changelog

## [Unreleased]

## [1.3.0] - 2025-01-20
### Added
- Fraud detection scoring on payment transactions
- New `/v1/fraud/evaluate` endpoint

### Changed
- Improved transaction search performance by 40%

### Security
- Updated dependency X to remediate CVE-2025-XXXX

## [1.2.1] - 2025-01-10
### Fixed
- Fixed race condition in payment processing under high load
```

---

## Recent Platform Releases

### Core API v2.5.0 — 2025-02-01

**Added:**
- Real-time fraud detection integration on all payment flows
- New `fraudScore` field on transaction responses
- Support for multi-currency transaction processing

**Changed:**
- Authentication token TTL reduced from 1 hour to 30 minutes (security hardening)
- Pagination default page size changed from 50 to 25

**Fixed:**
- Resolved memory leak in connection pool under sustained load
- Fixed incorrect currency conversion for JPY and KRW (no decimal places)

**Security:**
- Updated `express` to 4.21.2 (CVE-2024-XXXXX patch)
- Rotated internal service-to-service API keys

---

### Account Service v1.8.0 — 2025-01-15

**Added:**
- Account freeze capability for compliance and fraud holds
- New `POST /v1/accounts/{id}/freeze` and `POST /v1/accounts/{id}/unfreeze` endpoints

**Deprecated:**
- `GET /v1/accounts/{id}/details` → replaced by `GET /v1/accounts/{id}` (to be removed in v2.0.0)

---

## Related Documents

- [Development Overview](/development/overview/)
- [API Versioning](/apis/overview/)
- [Runbooks](/runbooks/overview/)
- [Infrastructure Overview](/infrastructure/overview/)
