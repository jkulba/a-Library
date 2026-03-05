---
title: Database Overview
description: Database schema, ERDs, migrations, and data dictionary for the Software Engineering Group.
sidebar:
  order: 1
---

# Database Overview

This section documents the database architecture, schema definitions, entity relationships, migration strategy, and data dictionary for all services in the platform.

## Database Strategy

We use a **polyglot persistence** approach — each service selects the database technology best suited to its domain's access patterns and consistency requirements.

| Database | Type | Use Cases | Services |
|----------|------|-----------|---------|
| PostgreSQL (RDS) | Relational | Transactional, ACID-required | account-service, payment-service |
| DynamoDB | NoSQL Key-Value | High-throughput, low-latency reads | audit-service, session-service |
| Redis (ElastiCache) | In-Memory Cache | Rate limiting, session cache | api-gateway, auth-service |
| Redshift | Data Warehouse | Analytics, reporting | reporting-service |

---

## Core Domain: Accounts

### Entity Relationship Diagram (ERD)

```
┌─────────────────────────┐         ┌──────────────────────────┐
│         CUSTOMER        │         │          ACCOUNT          │
├─────────────────────────┤         ├──────────────────────────┤
│ PK  customer_id (UUID)  │──┐      │ PK  account_id (UUID)    │
│     first_name          │  └─────▶│ FK  customer_id          │
│     last_name           │ 1:many  │     account_type         │
│     email               │         │     balance (DECIMAL)    │
│     phone               │         │     currency (CHAR 3)    │
│     kyc_status          │         │     status               │
│     created_at          │         │     opened_at            │
│     updated_at          │         │     closed_at (nullable) │
└─────────────────────────┘         └──────────────────────────┘
                                               │
                                          1:many│
                                               ▼
                                    ┌──────────────────────────┐
                                    │       TRANSACTION         │
                                    ├──────────────────────────┤
                                    │ PK  transaction_id (UUID)│
                                    │ FK  account_id           │
                                    │     type (ENUM)          │
                                    │     amount (DECIMAL)     │
                                    │     currency (CHAR 3)    │
                                    │     status (ENUM)        │
                                    │     reference_id         │
                                    │     created_at           │
                                    │     settled_at           │
                                    └──────────────────────────┘
```

---

## Data Dictionary

### `customer` Table

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `customer_id` | UUID | No | `gen_random_uuid()` | Primary key |
| `first_name` | VARCHAR(100) | No | — | Customer's first name |
| `last_name` | VARCHAR(100) | No | — | Customer's last name |
| `email` | VARCHAR(255) | No | — | Unique email address |
| `phone` | VARCHAR(20) | Yes | NULL | Phone number (E.164 format) |
| `kyc_status` | ENUM | No | `'PENDING'` | KYC verification status |
| `created_at` | TIMESTAMPTZ | No | `NOW()` | Record creation timestamp |
| `updated_at` | TIMESTAMPTZ | No | `NOW()` | Last updated timestamp |

**KYC Status Values:**
- `PENDING` – Awaiting identity verification
- `VERIFIED` – Identity verified
- `FAILED` – Verification failed
- `SUSPENDED` – Account under review

### `account` Table

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `account_id` | UUID | No | `gen_random_uuid()` | Primary key |
| `customer_id` | UUID | No | — | FK → `customer.customer_id` |
| `account_type` | ENUM | No | — | Type of account |
| `balance` | DECIMAL(20,4) | No | `0.0000` | Current balance |
| `currency` | CHAR(3) | No | `'USD'` | ISO 4217 currency code |
| `status` | ENUM | No | `'ACTIVE'` | Account status |
| `opened_at` | TIMESTAMPTZ | No | `NOW()` | Account open date |
| `closed_at` | TIMESTAMPTZ | Yes | NULL | Account closure date |

**Account Type Values:** `CHECKING`, `SAVINGS`, `INVESTMENT`, `LOAN`  
**Account Status Values:** `ACTIVE`, `FROZEN`, `CLOSED`, `PENDING_REVIEW`

### `transaction` Table

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `transaction_id` | UUID | No | `gen_random_uuid()` | Primary key |
| `account_id` | UUID | No | — | FK → `account.account_id` |
| `type` | ENUM | No | — | Transaction type |
| `amount` | DECIMAL(20,4) | No | — | Transaction amount |
| `currency` | CHAR(3) | No | — | ISO 4217 currency code |
| `status` | ENUM | No | `'PENDING'` | Transaction status |
| `reference_id` | VARCHAR(100) | Yes | NULL | External reference |
| `created_at` | TIMESTAMPTZ | No | `NOW()` | When transaction was initiated |
| `settled_at` | TIMESTAMPTZ | Yes | NULL | When transaction settled |

**Transaction Types:** `DEBIT`, `CREDIT`, `TRANSFER`, `FEE`, `REVERSAL`  
**Transaction Status:** `PENDING`, `PROCESSING`, `SETTLED`, `FAILED`, `REVERSED`

---

## Migration Strategy

We use **Flyway** for database schema migrations, following a versioned migration approach.

### Naming Convention

```
V{version}__{description}.sql
V1__initial_schema.sql
V2__add_kyc_status.sql
V3__create_transaction_indexes.sql
```

### Migration Rules

1. Migrations are **forward-only** — no rollback scripts in production
2. All migrations must be reviewed by the Database Team before merge
3. Destructive changes (DROP, TRUNCATE) require explicit approval and maintenance window
4. Always add indexes in separate migrations to avoid table locks
5. Large data migrations must be run in batches

### Sample Migration

```sql
-- V4__add_fraud_score_to_transaction.sql
-- Description: Add fraud_score column to support fraud detection feature
-- Author: payments-team
-- Date: 2025-02-01

ALTER TABLE transaction
  ADD COLUMN fraud_score SMALLINT,
  ADD COLUMN fraud_reviewed_by VARCHAR(100),
  ADD COLUMN fraud_reviewed_at TIMESTAMPTZ;

COMMENT ON COLUMN transaction.fraud_score IS 'Risk score 0-100 from fraud detection service';
```

---

## Database Access Standards

- All database access must use **parameterized queries** — no string interpolation
- **Connection pooling** via PgBouncer is required for all production services
- Direct database access is prohibited — all access goes through the service API
- Read replicas are used for analytics queries to reduce load on primary
- Sensitive fields (SSN, account numbers) must be **encrypted at rest** using AWS KMS

---

## Related Documents

- [Architecture Overview](/architecture/overview/)
- [Infrastructure Overview](/infrastructure/overview/)
- [Security Policies](/security/overview/)
