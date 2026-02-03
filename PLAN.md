# Certify365 — Learn365 Competitor Plan

> **Mission:** Replicate Learn365's core value at 25% of the cost ($7,750/year vs $31,000/year)
> **Target:** SMBs and mid-market companies priced out of enterprise LMS solutions

---

## 1. Competitive Intelligence: What Learn365 Offers

### Pricing Tiers
| Tier | Features | Estimated Price |
|------|----------|-----------------|
| Standard | Basic LMS, Teams integration, AI course creation | ~$10-15k/year |
| Professional | Skills framework, external users, HRIS integration | ~$20-25k/year |
| Select | Advanced security, audit reporting, high availability | ~$31k+/year |

### Core Features (Must Replicate)
1. **Course Management**
   - Unlimited course catalogs
   - Course modules with lessons
   - SCORM support
   - Video/PDF/document uploads
   - AI-powered course creation from documents

2. **Certificate Manager**
   - Custom certificate templates
   - Automated certificate generation on completion
   - Certificate verification/validation
   - Expiration tracking & renewal reminders

3. **Learning Paths**
   - Sequential course progressions
   - Prerequisite enforcement
   - Personalized recommendations

4. **Assessments & Quizzes**
   - Multiple question types
   - Pass/fail thresholds
   - Retake policies
   - Question banks

5. **Enrollment & Automation**
   - Auto-enrollment rules (by role, department, hire date)
   - Enrollment reminders
   - Deadline enforcement
   - Completion notifications

6. **Reporting & Analytics**
   - Completion rates by course/user/department
   - Time spent on training
   - Assessment scores
   - Compliance status dashboards
   - Export for audits

7. **Microsoft 365 Integration**
   - Teams app
   - SharePoint embedding
   - SSO via Azure AD/Entra ID
   - Calendar integration

### Advanced Features (Phase 2)
- AI skills framework & taxonomy generation
- Skill manager & talent mapping
- Third-party content marketplace (Go1, LinkedIn Learning, etc.)
- HRIS integrations (Workday, BambooHR, etc.)
- Offline mobile sync
- Audit trail
- Copilot/AI assistant

---

## 2. Our Differentiation Strategy

### Price Disruption
- **Learn365:** $31,000/year
- **Certify365:** $7,750/year (75% cheaper)
- Alternative: Per-user pricing at $3-5/user/month for transparency

### Feature Focus
1. **Best-in-class certificate designer** — This is Steven's entry point
2. **Dead-simple course builder** — Not bloated, just works
3. **Modern UI/UX** — Dark theme, mobile-first, actually pleasant to use
4. **Self-hosted option** — For enterprises with compliance requirements
5. **API-first** — Easy integrations without expensive add-ons

### What We Skip (Initially)
- Deep Microsoft 365 integration (complex, lock-in)
- 60+ HRIS connectors (build top 5 first)
- AI skills taxonomy (nice-to-have, not core)

---

## 3. Technical Architecture

### Tech Stack
| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | **SvelteKit** | Steven's preference, fast, modern |
| Mobile | **Capacitor** | Wrap SvelteKit for iOS/Android |
| Backend | **Node.js + Hono** | Lightweight, fast, TypeScript |
| Database | **PostgreSQL** | Reliable, supports complex queries |
| Auth | **Auth.js (NextAuth)** | SSO ready, multiple providers |
| Storage | **S3-compatible** (Cloudflare R2) | Cost-effective, fast |
| AI | **OpenAI/Claude API** | Course generation, content parsing |
| Hosting | **Cloudflare** | Workers, Pages, R2, D1 option |

### Alternative: Supabase Stack
- Supabase for auth, database, storage, edge functions
- Faster MVP, less infrastructure management
- Trade-off: Less control, vendor dependency

### Database Schema (Core Entities)
```
organizations
├── users (employees, admins, instructors)
├── departments
├── roles

courses
├── modules
│   └── lessons (video, text, document, quiz)
├── enrollments
├── completions
└── certificates

learning_paths
├── path_courses (ordered)
└── path_enrollments

certificates
├── templates
├── issued_certificates
└── verification_tokens

assessments
├── questions
├── question_banks
└── attempts
```

### API Design
```
/api/v1/
├── auth/
├── organizations/
├── users/
├── courses/
│   ├── modules/
│   └── lessons/
├── enrollments/
├── certificates/
│   ├── templates/
│   └── verify/:token
├── learning-paths/
├── assessments/
├── reports/
└── ai/
    └── generate-course
```

---

## 4. Design Philosophy

### Theme: "Midnight Command"
Inspired by Learn365's clean look but with our own identity.

#### Color Palette
| Role | Color | Hex |
|------|-------|-----|
| Background | Deep Navy | `#0a0e1a` |
| Surface | Dark Slate | `#141b2d` |
| Primary | Electric Cyan | `#00d4ff` |
| Secondary | Steel Blue | `#4a6fa5` |
| Accent | Emerald | `#10b981` |
| Warning | Amber | `#f59e0b` |
| Error | Coral Red | `#ef4444` |
| Text Primary | White | `#ffffff` |
| Text Secondary | Silver | `#94a3b8` |

#### Design Principles
1. **Dark-first** — Easy on eyes, modern feel
2. **Mobile-first** — Responsive from the start
3. **Minimal chrome** — Content is the focus
4. **Subtle animations** — Smooth but not distracting
5. **Clear hierarchy** — Learners know where to go

#### UI Components
- Glass-morphism cards (subtle blur, borders)
- Rounded corners (8-12px)
- Lucide icons (not emojis)
- Inter or Geist font
- Progress indicators with cyan glow

---

## 5. MVP Feature Set (Phase 1)

### Week 1-2: Foundation
- [ ] Project setup (SvelteKit + Tailwind)
- [ ] Auth system (email/password, Google, Microsoft)
- [ ] Organization/workspace creation
- [ ] User management (invite, roles)
- [ ] Database schema & migrations

### Week 3-4: Course Builder
- [ ] Course CRUD
- [ ] Module/lesson structure
- [ ] Content types: text, video embed, file upload
- [ ] Basic quiz builder
- [ ] Course preview

### Week 5-6: Learning Experience
- [ ] Learner dashboard
- [ ] Course enrollment
- [ ] Progress tracking
- [ ] Course completion
- [ ] Basic certificate generation

### Week 7-8: Admin & Polish
- [ ] Admin dashboard
- [ ] Basic reporting
- [ ] Certificate template designer
- [ ] Email notifications
- [ ] Mobile responsiveness

---

## 6. Certificate System (Core Differentiator)

### Template Designer Features
- Drag-and-drop editor
- Dynamic fields: {name}, {course}, {date}, {id}
- Background image upload
- Company logo placement
- Custom fonts
- QR code for verification
- Digital signatures

### Certificate Verification
- Unique verification URL per certificate
- Public verification page (no login required)
- Blockchain option for premium (future)

### Certificate Types
- Completion certificates
- Achievement badges
- Compliance attestations
- Skill certifications (with expiration)

---

## 7. Integrations Roadmap

### Phase 1 (MVP)
- Email (SMTP, SendGrid)
- Google Auth
- Microsoft Auth (basic)

### Phase 2
- Slack notifications
- Zapier/Make webhooks
- Google Workspace
- Microsoft Teams (basic)

### Phase 3
- BambooHR
- Workday
- SCORM 1.2/2004
- xAPI (Tin Can)

---

## 8. Pricing Strategy

### Proposed Tiers

| Tier | Price | Users | Features |
|------|-------|-------|----------|
| Starter | $99/mo | Up to 50 | Basic LMS, 5 courses, certificates |
| Growth | $299/mo | Up to 250 | Unlimited courses, learning paths, reports |
| Business | $599/mo | Up to 1000 | API access, SSO, priority support |
| Enterprise | Custom | Unlimited | Self-hosted option, SLA, dedicated support |

### Per-User Alternative
- $4/user/month (min 25 users)
- Volume discounts at 100+, 500+, 1000+

---

## 9. Immediate Next Steps

1. **Create GitHub repo** — `certify365`
2. **Initialize SvelteKit project** with Tailwind
3. **Set up basic auth** — Lucia or Auth.js
4. **Create database schema** — Drizzle ORM + PostgreSQL
5. **Build landing page** — Show the vision
6. **Implement course CRUD** — Admin side first

---

## 10. Success Metrics

### 6-Month Goals
- Working MVP with core features
- 10 beta customers
- $5k MRR

### 12-Month Goals
- Feature parity with Learn365 Standard
- 100 paying customers
- $50k MRR

---

*"If you want to win, you have to be willing to fight where your enemy doesn't expect you."*

Let's move.
