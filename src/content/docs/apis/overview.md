---
title: APIs Overview
description: API references, authentication standards, and versioning strategy for the Software Engineering Group.
sidebar:
  order: 1
---

# APIs Overview

This section documents the API design standards, authentication mechanisms, versioning strategy, and references for all services in the platform. All APIs are RESTful and follow the guidelines defined here.

## API Design Principles

| Principle | Description |
|-----------|-------------|
| **REST** | All APIs follow REST conventions |
| **Versioning** | URLs use explicit version prefix (`/v1/`, `/v2/`) |
| **JSON** | All request/response bodies are JSON |
| **HTTPS Only** | Plain HTTP is rejected at the API Gateway |
| **Idempotency** | POST/PATCH operations support idempotency keys |
| **Pagination** | All list endpoints support cursor-based pagination |

---

## Base URLs

| Environment | Base URL |
|-------------|----------|
| Production | `https://api.example-bank.com` |
| Staging | `https://api-staging.example-bank.com` |
| Development | `https://api-dev.example-bank.com` |
| Local | `http://localhost:3000` |

---

## Authentication

### Overview

All API calls require authentication. We use **OAuth 2.0 with JWT Bearer tokens** for human-initiated flows and **mutual TLS (mTLS)** for service-to-service communication.

### OAuth 2.0 Authorization Code Flow

Used for user-facing applications (web, mobile):

```
┌────────┐          ┌──────────────┐          ┌─────────────┐
│  User  │          │  Client App  │          │  Auth Server│
└────────┘          └──────────────┘          └─────────────┘
    │                      │                        │
    │   Login Request       │                        │
    │──────────────────────▶│                        │
    │                      │  Authorization Request  │
    │                      │───────────────────────▶│
    │                      │                        │
    │                      │◀───────────────────────│
    │                      │   Auth Code            │
    │◀─────────────────────│                        │
    │   Login Page         │  Token Request         │
    │──────────────────────│───────────────────────▶│
    │                      │                        │
    │                      │◀───────────────────────│
    │                      │   Access Token + Refresh│
    │◀─────────────────────│                        │
    │   Logged In          │                        │
```

### Client Credentials Flow

Used for service-to-service communication:

```bash
# Request a service token
curl -X POST https://auth.example-bank.com/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "scope=payments:read payments:write"
```

### Token Format

All access tokens are **RS256-signed JWTs** with the following standard claims:

```json
{
  "iss": "https://auth.example-bank.com",
  "sub": "usr_abc123",
  "aud": "api.example-bank.com",
  "exp": 1735689600,
  "iat": 1735686000,
  "jti": "jwt_xyz789",
  "scope": "accounts:read payments:write",
  "roles": ["engineer"],
  "customer_id": "cust_xyz789"
}
```

---

## API Reference

### Accounts Service

#### GET /v1/accounts/{accountId}

Retrieve account details by account ID.

**Authentication:** Bearer token with `accounts:read` scope

**Request:**
```http
GET /v1/accounts/acc_xyz789
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...
```

**Response (200 OK):**
```json
{
  "accountId": "acc_xyz789",
  "customerId": "cust_abc123",
  "accountType": "CHECKING",
  "balance": 12540.50,
  "currency": "USD",
  "status": "ACTIVE",
  "openedAt": "2023-06-15T09:00:00Z"
}
```

**Error Responses:**

| Status | Code | Description |
|--------|------|-------------|
| 401 | `UNAUTHORIZED` | Missing or invalid token |
| 403 | `FORBIDDEN` | Token lacks required scope |
| 404 | `ACCOUNT_NOT_FOUND` | Account does not exist |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests |

---

#### POST /v1/accounts/{accountId}/transactions

Initiate a transaction on an account.

**Authentication:** Bearer token with `payments:write` scope  
**Idempotency:** Required via `Idempotency-Key` header

**Request:**
```http
POST /v1/accounts/acc_xyz789/transactions
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...
Idempotency-Key: idemp_unique_key_12345
Content-Type: application/json

{
  "type": "DEBIT",
  "amount": 500.00,
  "currency": "USD",
  "description": "Utility payment",
  "metadata": {
    "merchantId": "mch_power_co",
    "category": "UTILITIES"
  }
}
```

**Response (201 Created):**
```json
{
  "transactionId": "txn_new_abc123",
  "accountId": "acc_xyz789",
  "type": "DEBIT",
  "amount": 500.00,
  "currency": "USD",
  "status": "PENDING",
  "createdAt": "2025-01-20T14:30:00Z"
}
```

---

## Rate Limiting

All API endpoints are rate limited at the API Gateway level.

| Tier | Rate Limit | Burst |
|------|-----------|-------|
| Standard (authenticated) | 1,000 req/min | 2,000 |
| Premium (financial ops) | 5,000 req/min | 10,000 |
| Service-to-Service | 50,000 req/min | 100,000 |

Rate limit headers are returned on every response:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 847
X-RateLimit-Reset: 1735689660
```

---

## API Versioning

### Policy

- New major versions are announced **90 days** before release
- Old versions are supported for **12 months** after a new major version is released
- Breaking changes (field removal, type changes) always require a new major version
- Additive changes (new fields, new endpoints) are non-breaking and deployed in place

### Sunset Header

When an API version is being deprecated, the `Sunset` header is returned:

```
Sunset: Sat, 01 Jan 2026 00:00:00 GMT
Deprecation: true
Link: <https://docs.example-bank.com/apis/migration-v1-to-v2>; rel="deprecation"
```

---

## Related Documents

- [Security Overview](/security/overview/)
- [Design Overview](/design/overview/)
- [Architecture Overview](/architecture/overview/)
