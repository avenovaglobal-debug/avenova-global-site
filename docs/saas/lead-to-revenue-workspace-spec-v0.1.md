# Avenova Lead-to-Revenue Workspace
## Product Requirements and Technical Architecture Specification

**Document:** AG-SaaS-001  
**Version:** 0.1 — proposed baseline  
**Status:** Draft for founder review; not evidence of market validation  
**Operating context:** Founder-led, solo execution, ₦0 initial software budget; Nigerian and international customers are intended markets  
**Legal status:** Avenova is not yet legally registered. This document does not imply incorporation or operational readiness.

## 1. Executive decision

The proposed first SaaS product is a focused lead-to-revenue workspace for small service businesses. It helps a business capture enquiries, qualify prospects, track opportunities, schedule follow-ups, record interactions, and understand outcomes in one operational workflow.

This is a **product hypothesis**, not a validated market opportunity. Before building a broad platform, Avenova must interview potential users, observe their current process, and test whether they will commit to a pilot or pay.

### Product thesis
Small service businesses can lose opportunities when enquiries live across email, messaging apps, spreadsheets, and memory. A narrow workspace may make ownership, next actions, and outcomes more visible without the complexity of a full enterprise CRM.

### Initial target segment to test
Start discovery with owner-operated service businesses that handle recurring enquiries and sales follow-up. Candidate interview segments—not confirmed customers—include consultants, agencies, IT service providers, training providers, and other appointment- or quote-based services. Do not build segment-specific features until discovery shows a repeatable need.

## 2. Product principles

1. Solve one complete workflow well: enquiry → qualification → next action → follow-up → outcome.
2. Security before convenience. Tenant boundaries, server-side authorization, and validation are core requirements.
3. No fabricated proof: no invented clients, testimonials, usage figures, revenue impact, or customer validation.
4. Mobile-first operation. A user must be able to create and update a lead on a phone.
5. International-ready foundations: store timestamps in UTC, display local time appropriately, and avoid assuming one country or currency.
6. Free-tier discipline. Prefer free tools during the first build. Ask the founder before any paid plan, upgrade, subscription, domain, or usage commitment.
7. Measurable release gates. Each phase must pass its acceptance criteria before the next phase is considered complete.
8. Avoid premature complexity. No AI, complex integrations, billing engine, native mobile app, or advanced automation in the initial MVP unless validated as essential.

## 3. Goals and non-goals

### MVP goals
- Secure workspace for a small service business.
- Create, view, edit, search, filter, and archive leads.
- Track stage, source, priority, estimated value, and next follow-up.
- Record dated notes and interactions against a lead.
- Show overdue and upcoming follow-ups.
- Provide useful pipeline and outcome metrics.
- Support multiple organisations with strict data isolation.
- Work on modern mobile and desktop browsers.
- Provide a clear path to export business records.

### Explicit non-goals for MVP
- General-purpose enterprise CRM.
- Email inbox or WhatsApp replacement.
- Automatic WhatsApp/SMS/email sending.
- E-commerce, payment collection, invoicing, or accounting.
- Complex public lead forms and integrations.
- AI sales advice or autonomous agents.
- Native Android/iOS apps.
- Guaranteed sales, conversion, or revenue improvements.
- Multi-currency accounting or tax calculation.
- A free-forever promise before operating costs are understood.

## 4. Personas and jobs to be done

**Owner/operator:** wants to see which enquiries need action, avoid forgotten follow-ups, and understand which opportunities become customers.

**Sales or operations teammate:** wants clear ownership, shared context, and a reliable record of prior contact.

Core jobs:
- Capture an enquiry quickly even when details are incomplete.
- Qualify a lead and decide the next action.
- Find leads due for follow-up.
- Record a conversation outcome for teammates.
- Review pipeline movement and closed outcomes over a period.

These are hypotheses to validate during discovery.

## 5. Functional requirements

Priority labels: **P0** required for secure MVP; **P1** valuable after core workflow; **Later** excluded until validated.

### 5.1 Identity and organisation
- **P0:** Sign up and sign in through a maintained authentication solution or well-supported framework.
- **P0:** A user belongs to a workspace; every protected record is scoped to that workspace.
- **P0:** Server-side authorization for every read and write. Hiding UI controls is not authorization.
- **P0:** Support workspace owner and member roles with explicit permissions.
- **P0:** Prevent unauthorized workspace joining.
- **P1:** Invitation flow, member removal, and role management UI.
- **Later:** Enterprise SSO, SCIM, complex custom roles.

### 5.2 Lead management
- **P0:** Create, view, edit, search, filter, and archive a lead.
- **P0:** Require a contact name and meaningful title or organisation field; permit partial records when details are unknown.
- **P0:** Optional email, phone, organisation, source, stage, priority, estimated value, currency code, owner, next-action description, and follow-up due date.
- **P0:** Validate and normalize input on the server; browser validation alone is insufficient.
- **P0:** Track created/updated timestamps and responsible user for relevant changes.
- **P0:** Confirm destructive actions; prefer archive over permanent deletion in the normal interface.
- **P1:** Duplicate warning based on available email/phone within the same workspace.
- **P1:** CSV export with documented columns and spreadsheet formula-injection mitigation.
- **Later:** Bulk import, enrichment, advanced deduplication, custom fields.

### 5.3 Pipeline
- **P0:** Initial stages: New, Contacted, Qualified, Proposal/Quote, Won, Lost.
- **P0:** Validate stage transitions and record them in activity history.
- **P0:** Won/Lost outcomes may capture a reason and closing date.
- **P0:** Pipeline view and accessible table/list view must work on mobile.
- **P1:** Drag-and-drop board only if accessible and reliable on touch devices.
- **Later:** Multiple pipelines, conditional stages, forecasting models.

### 5.4 Activity and follow-up
- **P0:** Add a dated note or interaction to a lead.
- **P0:** Set, change, complete, or clear the next follow-up.
- **P0:** Views for overdue and upcoming follow-ups.
- **P0:** Store timestamps in UTC and render using a documented timezone rule.
- **P1:** Activity types such as call, meeting, email, message, and note.
- **Later:** Calendar sync, automated outbound messages, recurring sequences.

### 5.5 Dashboard and reporting
- **P0:** Counts for active leads, overdue follow-ups, upcoming follow-ups, won leads, and lost leads.
- **P0:** Metrics derived from persisted data with clearly defined date ranges.
- **P1:** Stage distribution and win/loss trends for a selected period.
- **P1:** Honest empty states; do not imply meaningful trends when data is insufficient.
- **Later:** Revenue forecasting and custom report builder.

### 5.6 Settings and data control
- **P0:** Workspace name and basic profile settings.
- **P0:** Way to request or perform an export of workspace records.
- **P0:** Define retention, deletion, backup, and recovery before accepting real customer data.
- **P1:** Workspace member management.
- **Later:** Custom branding and advanced configuration.

## 6. Non-functional requirements

### Security and privacy
- Enforce workspace scope in server-side queries and mutations.
- Never trust a workspace ID from the browser without verifying membership.
- Validate inputs on the server with explicit schemas.
- Use parameterized database access or a safe ORM; never concatenate untrusted input into SQL.
- Keep secrets and privileged database credentials on the server only.
- Apply least privilege to credentials and database roles.
- Use secure session settings provided by the selected authentication system.
- Rate-limit authentication-sensitive or expensive endpoints where supported.
- Never log passwords, tokens, session secrets, or unnecessary personal data.
- Record security-relevant actions without storing sensitive payloads unnecessarily.
- Establish a privacy notice and data-handling process before real-user launch.
- Review applicable Nigerian data protection requirements and relevant target-market obligations with qualified advice before commercial launch. This document is not legal advice.

### Reliability and operations
- Use reviewable, repeatable database migrations.
- Provide a health check and actionable server-side error logs.
- Show safe errors without leaking stack traces or secrets.
- Test backup and restore procedures before accepting production customer data.
- Define recovery point and recovery time objectives before making availability promises.
- Monitor free-tier limits, cold starts, database limits, and provider policy changes.
- Do not promise an uptime SLA until infrastructure and monitoring justify it.

### Accessibility and usability
- Responsive layouts from small Android screens upward.
- Keyboard access, visible focus indicators, semantic labels, form error summaries, sufficient contrast, and accessible status messaging.
- Do not use colour as the only indicator of stage or priority.
- Include loading, empty, success, error, and network-failure states.

### Performance
- Paginate or limit list queries.
- Index common workspace-scoped queries and follow-up dates.
- Do not load all workspace records into the browser.
- Establish performance budgets during implementation and test on mobile networks.

## 7. Proposed data model

Use PostgreSQL with UUID primary keys. Every tenant-owned record carries an organization identifier and must be authorized against the authenticated user's membership.

### organizations
- id UUID primary key
- name text, required
- created_at and updated_at timestamps

### memberships
- id UUID primary key
- organization_id foreign key
- user_id from the auth system
- role constrained to allowed values
- created_at
- Unique constraint on organization_id + user_id

### leads
- id UUID primary key
- organization_id foreign key, required
- created_by_user_id and owner_user_id
- name text, required
- title or organization_name
- email, phone, source
- stage and priority constrained to allowed values
- estimated_value numeric nullable
- currency_code char(3) nullable
- next_action text nullable
- follow_up_at timestamptz nullable
- won_lost_reason text nullable
- closed_at and archived_at timestamptz nullable
- created_at and updated_at timestamptz

### lead_activities
- id UUID primary key
- organization_id foreign key
- lead_id foreign key
- actor_user_id, nullable only for valid system-generated activity
- activity_type constrained to allowed values
- body text with a documented size limit
- occurred_at and created_at timestamptz

### audit_events
- id UUID primary key
- organization_id foreign key
- actor_user_id
- entity_type and entity_id
- action
- occurred_at
- Minimal structured metadata; exclude secrets and unnecessary personal data.

### Schema and query rules
- Foreign keys prevent orphaned activities.
- Index tenant-scoped list/search paths and follow_up_at, stage, and relevant timestamps.
- Consider database row-level security if supported, but do not treat it as a substitute for application authorization. Test it using the actual production connection role.
- Avoid maintaining a second password store if a trusted authentication provider handles identity.
- Define delete/cascade behavior deliberately; prevent accidental cross-tenant cascades.
- Treat this as a proposed schema and validate it against implementation and provider constraints before migration.

## 8. Proposed architecture

### Application stack
- **Frontend/application:** TypeScript with Next.js and React.
- **UI:** Accessible responsive component system with minimal dependencies.
- **Database:** PostgreSQL.
- **Authentication:** Maintained framework/provider compatible with the deployment and database.
- **Validation:** Shared TypeScript schemas, with authoritative server-side validation.
- **Testing:** Unit tests, integration tests against a test database, and browser end-to-end tests.
- **Repository:** GitHub with production branch protection where available.
- **Deployment:** Separate SaaS app from the existing static marketing website. Select a free deployment/database/auth combination only after checking current limits and terms.

No provider has been selected or paid for by this specification. Verify current free-tier terms before committing to a stack.

### Request flow
1. Browser sends an authenticated request.
2. Server verifies session and user identity.
3. Server loads membership and role for the requested workspace.
4. Server validates input and checks permissions.
5. Database operation is scoped to the authorized workspace.
6. Server returns only permitted fields.
7. Security-relevant action is logged without sensitive payloads.

### Environment separation
- Local development
- Automated test environment
- Production

Use separate credentials and databases for test and production. Never commit production secrets. Provide an environment example file containing names and safe placeholders only.

## 9. MVP acceptance criteria

The MVP is not accepted until all P0 criteria are demonstrated.

1. Unauthenticated visitors cannot read or mutate protected lead data.
2. A member of Workspace A cannot read, edit, archive, or enumerate Workspace B records, including by guessing UUIDs or modifying request payloads.
3. A workspace owner can create a lead and see it in the workspace list.
4. A lead can be edited, searched, filtered, and archived.
5. Stage changes persist and appear in activity history.
6. A user can add a note and set a follow-up date/time.
7. Overdue/upcoming lists follow a documented timezone and date rule.
8. Dashboard counts match underlying records and documented date ranges.
9. Invalid input is rejected server-side with a safe, understandable error.
10. Empty, loading, validation, network-error, and success states exist.
11. Primary workflows work at a 360-pixel-wide viewport and with keyboard navigation.
12. CSV export, if included, is workspace-scoped and mitigates spreadsheet formula injection.
13. Migrations run against a clean test database.
14. Automated tests cover authentication/authorization, tenant isolation, lead CRUD, stage transitions, follow-up queries, and core reporting.
15. Backup and restore procedures are documented and a restore test is completed before real customer data is accepted.
16. Privacy notice, suitable terms, support contact, and deletion/export process are reviewed before inviting external users.
17. No unapproved paid service, upgrade, or subscription is activated.
18. Product copy makes no unsupported claims about adoption, results, compliance certification, or legal registration.

## 10. Test strategy

**Unit tests:** validation schemas, stage/priority values, metric calculations, date boundaries, permissions, and stage transitions.

**Integration tests:** workspace-scoped lead CRUD, membership enforcement, activity associations, timezone boundaries, database constraints, and migrations.

**End-to-end tests:**
- Sign in → create workspace → add lead → add note → set follow-up → move stage → mark won/lost.
- Mobile-width navigation and forms.
- Validation and error recovery.
- Workspace A/B isolation using separate users and seeded records.
- Export correctness and formula-injection handling if export is included.

A green build alone is insufficient. Require passing automated tests, a manual mobile smoke test, tenant-isolation tests, and a reviewed rollback/restore plan.

## 11. Discovery and validation plan

Do not describe demand as proven until evidence exists.

### Phase A — Problem discovery
- Conduct 8–12 structured conversations with people in the candidate target segment.
- Ask about their last real enquiry-to-sale workflow, not whether they “like the idea.”
- Learn where enquiries arrive, how follow-ups are tracked, what gets missed, what they currently pay for, and who decides to buy.
- Record anonymized patterns and disconfirming evidence.
- Do not collect unnecessary personal or confidential customer records.

### Phase B — Prototype test
- Demonstrate a clickable or limited prototype using realistic sample data clearly labelled as sample data.
- Ask participants to complete a concrete workflow.
- Observe confusion, workarounds, and what they would stop using to adopt it.
- Avoid integrations before the workflow is proven.

### Phase C — Commitment test
- Offer a narrowly scoped pilot with explicit limits, support expectations, data handling, and cancellation terms.
- Look for concrete commitment, such as agreeing to a pilot, providing time/data with permission, or willingness to pay—not compliments alone.
- Do not invent pilot users or report interest as revenue.

### Proposed decision gate
Proceed to a production MVP only if several independent target users report the same costly problem and at least a small number agree to a concrete pilot or comparable next step. Document the evidence and founder's decision before committing further build time. These are proposed gates, not universal market rules.

## 12. Delivery roadmap

### Stage 0 — Discovery and product boundary
**Output:** Interview guide, evidence log, target-segment decision, MVP scope.  
**Exit gate:** A repeated problem is evidenced and a concrete pilot path is plausible.

### Stage 1 — Technical foundation
**Output:** Repository structure, environment setup, CI checks, database migrations, auth integration, organization/membership model, tenant-isolation tests.  
**Exit gate:** Cross-tenant access tests pass before lead features are added.

### Stage 2 — Core lead workflow
**Output:** Lead CRUD, pipeline stages, activity timeline, follow-up scheduling, responsive list/table views.  
**Exit gate:** P0 lead and follow-up criteria pass.

### Stage 3 — Dashboard and operational readiness
**Output:** Core metrics, justified export, error handling, logs, privacy/data-control flows, backup and restore runbook.  
**Exit gate:** Full test suite, mobile smoke test, tenant isolation, and restore test pass.

### Stage 4 — Controlled pilot
**Output:** Limited pilot with explicit scope, feedback capture, issue triage, and rollback plan.  
**Exit gate:** Users complete the core workflow and provide evidence for a go/no-go decision.

### Stage 5 — Paid launch decision
**Output:** Pricing hypothesis, support boundaries, service limits, operating-cost estimate, and terms reviewed for intended markets.  
**Exit gate:** Founder approves commercial launch and any paid infrastructure commitments.

## 13. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Building before validating the problem | High | Complete discovery and commitment gates first |
| Cross-tenant data exposure | Critical | Server-side membership checks, scoped queries, automated adversarial tests |
| Free-tier limits or policy changes | High | Verify terms, monitor usage, document migration options |
| Solo-founder support overload | High | Limit pilot cohort, publish scope/support hours, avoid custom integrations |
| Poor mobile usability | High | Test core flows on small-screen browsers throughout development |
| Scope creep | High | Enforce P0/P1/Later classification and change-control notes |
| Data loss | Critical | Backups, tested restoration, retention and export runbook |
| Privacy/legal obligations misunderstood | High | Review applicable requirements with qualified advice before commercial use |
| Misleading marketing claims | High | Maintain evidence log; no fabricated clients, results, certifications, or registration claims |
| Hidden operating costs | Medium/high | Estimate storage, database, email, logs, and deployment costs before launch |

## 14. Decisions required before implementation

These decisions can follow discovery; do not silently assume them:
- Which target segment has the strongest repeated pain?
- Is the initial product for a single owner or a small team?
- Which authentication and PostgreSQL provider currently offers suitable free-tier terms?
- Is CSV export needed for the first pilot?
- Which deployment limits and data-region options are acceptable?
- What support and data-retention commitments can a solo operator realistically meet?
- What pricing model will be tested: per workspace, per user, or a limited pilot fee?

Paid plans or usage commitments require explicit founder approval.

## 15. Definition of done

A feature is complete only when:
- Scope and acceptance criteria are written.
- Validation and authorization are implemented server-side.
- Tenant isolation is covered by tests.
- Loading, empty, success, and failure states are handled.
- Mobile and keyboard usability are checked.
- Automated tests pass.
- Documentation is updated.
- No secrets or personal data are committed.
- Deployment and rollback implications are understood.

A deployment marked successful by a hosting provider does not by itself prove that the product is secure, usable, or production-ready.

## Appendix A — Initial product metrics

Track metrics that support decisions and can be calculated reliably:
- Time from lead creation to first recorded follow-up.
- Share of active leads with a next action.
- Number of overdue follow-ups.
- Stage movement over a defined period.
- Won/lost outcomes over a defined period.
- Weekly active workspaces during a controlled pilot, with an explicit definition.

Do not use these as public marketing claims without a sufficiently representative, documented evidence base.

## Appendix B — Product naming

**Avenova Lead-to-Revenue Workspace** is a working name only. Check naming conflicts, domain availability, and relevant legal considerations before investing in a permanent product identity.

## Change log

- **v0.1:** Initial product hypothesis, MVP requirements, architecture, data model, acceptance criteria, discovery gates, and staged delivery plan.
