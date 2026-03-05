---
title: Architecture Overview
description: System architecture, design principles, and architecture decision records (ADRs) for the Software Engineering Group.
sidebar:
  order: 1
---

# Architecture Overview

This section documents the system architecture, design decisions, and technical standards that guide how we build and evolve our software systems. All significant architectural decisions are recorded as Architecture Decision Records (ADRs).

## System Architecture

Our platform is built on a **cloud-native microservices architecture** deployed on AWS, designed for high availability, resilience, and regulatory compliance in the financial services sector.

### High-Level Architecture

The system is organized into three primary layers:

1. **Presentation Layer** – React-based frontend applications (SPA and Server-Side Rendered)
2. **API Gateway Layer** – API Gateway + WAF for routing, rate limiting, and security
3. **Services Layer** – Domain-bounded microservices communicating via REST and async events
4. **Data Layer** – Polyglot persistence (PostgreSQL, DynamoDB, Redis)
5. **Infrastructure Layer** – AWS EKS (Kubernetes), managed services, and observability

### Core Design Principles

| Principle | Description |
|-----------|-------------|
| **Domain-Driven Design** | Services are organized around business domains |
| **API-First** | All services expose versioned REST APIs |
| **Security by Default** | Zero-trust networking; least privilege access |
| **Observability** | Every service emits structured logs, metrics, and traces |
| **Compliance** | SOC 2 Type II and PCI-DSS compliant architecture |
| **Fault Tolerance** | Circuit breakers, retries, and graceful degradation |

---

## Architecture Decision Records (ADRs)

ADRs document important architectural decisions. Each ADR follows this format: context, decision, status, and consequences.

### ADR-001: Adopt Microservices Architecture

**Status:** Accepted  
**Date:** 2024-01-15

**Context:** The legacy monolithic application was becoming difficult to scale, deploy independently, and maintain as the engineering team grew.

**Decision:** Decompose the monolith into domain-bounded microservices. Each service owns its data store and communicates via REST APIs (synchronous) and event streams (asynchronous).

**Consequences:**
- ✅ Independent deployability of services
- ✅ Technology flexibility per service
- ✅ Improved fault isolation
- ⚠️ Increased operational complexity
- ⚠️ Distributed tracing required across service boundaries

---

### ADR-002: Use PostgreSQL as Primary Relational Database

**Status:** Accepted  
**Date:** 2024-02-10

**Context:** We needed a relational database that supports ACID transactions, JSON querying, and has strong AWS managed service support.

**Decision:** Use Amazon RDS for PostgreSQL (version 15+) as the primary relational database for transactional workloads.

**Consequences:**
- ✅ Full ACID compliance
- ✅ Strong ecosystem and team expertise
- ✅ Native JSON/JSONB support
- ⚠️ Vertical scaling limits for very large datasets

---

### ADR-003: Use AWS EKS for Container Orchestration

**Status:** Accepted  
**Date:** 2024-03-01

**Context:** Container orchestration was required to manage deployments, auto-scaling, service discovery, and health checks across our microservices.

**Decision:** Deploy all services to Amazon EKS (Elastic Kubernetes Service) using Helm charts for packaging.

**Consequences:**
- ✅ Industry-standard Kubernetes tooling
- ✅ Managed control plane reduces operational overhead
- ✅ Strong ecosystem (Helm, ArgoCD, Prometheus)
- ⚠️ Kubernetes expertise required from all engineers

---

### ADR-004: Event-Driven Communication via AWS SNS/SQS

**Status:** Accepted  
**Date:** 2024-04-05

**Context:** Services needed asynchronous communication for workflows that don't require immediate responses (e.g., notifications, audit logging, downstream processing).

**Decision:** Use AWS SNS (fan-out) + SQS (queuing) for all asynchronous inter-service communication. Apache Kafka is reserved for high-throughput streaming use cases.

**Consequences:**
- ✅ Decoupled service communication
- ✅ Built-in dead-letter queues for error handling
- ✅ Managed service; no infrastructure to operate
- ⚠️ Message ordering is not guaranteed with SNS/SQS standard queues

---

## Service Catalog

| Service | Domain | Tech Stack | Owner |
|---------|--------|-----------|-------|
| `auth-service` | Identity & Access | Node.js, PostgreSQL | Platform Team |
| `payment-service` | Payments | Java, PostgreSQL | Payments Team |
| `account-service` | Accounts | Node.js, PostgreSQL | Core Banking Team |
| `notification-service` | Messaging | Node.js, SQS | Platform Team |
| `audit-service` | Compliance | Go, DynamoDB | Security Team |
| `reporting-service` | Analytics | Python, Redshift | Data Team |

---

## Related Documents

- [Infrastructure Overview](/infrastructure/overview/) – AWS deployment topology
- [Database Schema](/database/overview/) – Data models and ERDs
- [API Standards](/apis/overview/) – API design guidelines
- [Security Architecture](/security/overview/) – Security controls and patterns
