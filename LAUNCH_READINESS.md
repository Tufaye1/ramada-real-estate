# Launch Readiness

Audit date: 2026-10-20

## Architecture in scope

This is a public, statically exported marketing site deployed with Cloudflare Workers Static Assets. It has no login, database, server API, AI feature, payment flow, webhook, private upload, background queue, or stored contact-form data.

## Applicable checks

| Area | Result | Evidence |
| --- | --- | --- |
| Dependency vulnerabilities | Pass for production | `npm audit --omit=dev --audit-level=moderate` reports 0 vulnerabilities. |
| Secret exposure | Pass | No tracked environment files, private-key blocks, or common private API-key patterns found. The browser bundle uses no private credentials. |
| XSS | Pass for current content model | Production content is authored in source, no visitor content is rendered, and no production component uses an unsafe HTML sink. CSP blocks objects and limits scripts, styles, fonts, images, media, and connections. |
| Security headers | Configured | CSP, HSTS, Referrer-Policy, Permissions-Policy, X-Content-Type-Options, X-Frame-Options, and legacy XSS-filter disable are defined in `public/_headers`. |
| File/input validation | Pass for current form | Native required/type checks and conservative length limits are present. Form values are percent-encoded into a local email draft and are not sent to a server. |
| Accessibility | Pass for launch smoke scope | One `main`, one `h1`, English document language, image alt text, named controls, keyboard-operable tabs, focus-managed mobile dialog, Escape close, and focus return verified. |
| Mobile/desktop browser layout | Pass | Desktop and 390 × 844 mobile layouts were checked; no mobile horizontal overflow was found. |
| Build and type quality | Pass | ESLint, Next.js Cloudflare static build, and the private Vinext build complete successfully. |
| Deployment rollback | Ready | Releases are versioned in Git; Cloudflare rebuilds from `main`, and a known-good commit can be redeployed. |
| Health/load smoke | Pending live redeploy | Verify HTTPS, response headers, page content, and a small concurrent request batch after the launch commit reaches Cloudflare. |

## Not applicable to this static site

The following controls become required if a backend or private-data feature is added: Row-Level Security, server-side validation, authorization and IDOR controls, webhook verification, prompt-injection defenses, API rate limiting, CSRF, SSRF, signed private-file URLs, session expiry, per-user least privilege, sensitive-data audit logs, database transactions/indexes/migrations/retention, race and idempotency controls, connection pooling, cache invalidation, background jobs/retries/timeouts/dead-letter queues, payment testing, API contract tests, and database backup/restore procedures.

## Tracked launch residuals

- The complete development-tool audit reports 12 advisories (8 high, 4 moderate) under `eslint-config-next`/Vinext glob matching and unused Drizzle database tooling. They are not present in the production dependency audit or browser output. npm's automated remediation requires breaking version downgrades, so no forced downgrade was applied before launch.
- External uptime alerting, error aggregation, and cost alerts are operational account settings, not repository features. Cloudflare's dashboard should be used to monitor deployment failures and traffic; add an independent uptime monitor if the client requires active alerts.
- This audit is a launch smoke/security review, not a penetration test or a high-volume capacity benchmark.
