# Vivah.mu

Mauritius' leading wedding vendor marketplace. Couples can discover and contact photographers, venues, cake designers, DJs, decorators, and makeup artists. Vendors can apply to join the platform.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (Radix UI primitives) |
| Animation | Framer Motion |
| Carousel | Embla Carousel |
| Email | Resend |
| Payments | Stripe (installed, not yet wired) |
| Forms | react-hook-form + Zod |
| Toasts | react-hot-toast |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Email (Resend) — required for vendor signup form
RESEND_API_KEY=re_xxxxxxxxxxxx
FROM_EMAIL=noreply@vivah.mu
TO_EMAIL=admin@vivah.mu

# Optional: override API base URL (defaults to empty string = same origin)
NEXT_PUBLIC_API_URL=
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/                          # Next.js App Router pages & API routes
│   ├── layout.tsx                # Root layout — fonts, global toast config, metadata
│   ├── page.tsx                  # Home page (Navbar + Hero + VendorCarousel)
│   ├── globals.css               # Global styles
│   │
│   ├── for-vendors/
│   │   └── page.tsx              # Vendor signup page with application form
│   │
│   ├── vendors/
│   │   ├── layout.tsx            # Vendors layout — wraps all /vendors/* with Navbar
│   │   ├── page.tsx              # /vendors — category index grid
│   │   ├── all/
│   │   │   └── page.tsx          # /vendors/all — filterable listing (grid/list toggle)
│   │   ├── photographers/[slug]/ # Photographer detail page
│   │   ├── venues/[slug]/        # Venue detail page (gallery, packages, amenities tabs)
│   │   ├── cakes/[slug]/         # Cake vendor detail page
│   │   ├── djs/[slug]/           # DJ vendor detail page
│   │   ├── decorators/[slug]/    # Decorator detail page
│   │   ├── makeup/[slug]/        # Makeup artist detail page
│   │   └── [category]/[slug]/    # Generic vendor detail fallback
│   │
│   ├── admin/
│   │   └── availability/
│   │       └── page.tsx          # Admin panel — manage vendor availability calendars
│   │
│   └── api/
│       ├── vendor-signup/
│       │   └── route.ts          # POST — vendor application email via Resend
│       └── vendors/
│           ├── route.ts          # GET, POST — list/filter/create vendors
│           └── [slug]/
│               ├── route.ts      # GET, PUT, DELETE — single vendor by slug
│               └── availability/
│                   └── route.ts  # GET, PUT — vendor availability dates
│
├── components/
│   ├── Navbar.tsx                # Top navigation bar
│   ├── HeroSection.tsx           # Full-screen video hero with search
│   ├── SearchBar.tsx             # Live search dropdown (calls /api/vendors)
│   ├── VendorCarousel.tsx        # Category grid on home page
│   ├── Footer.tsx                # Site footer
│   └── admin/
│       └── AvailabilityManager.tsx  # Admin calendar component
│
├── components/ui/                # shadcn/ui components
│   ├── availability-calendar.tsx
│   ├── badge.tsx
│   ├── button.tsx
│   ├── calendar.tsx
│   ├── card.tsx
│   ├── carousel.tsx
│   ├── date-picker.tsx
│   ├── loading.tsx
│   └── popover.tsx
│
├── lib/
│   ├── utils.ts                  # Tailwind class merge utility (cn)
│   └── data/
│       └── vendors.ts            # Single source of truth for all vendor data
│                                 # Exports: vendors[], getVendorBySlug(),
│                                 #          getVendorsByCategory(), getVendorLink()
│
├── services/
│   └── vendorService.ts          # Client-side fetch helpers (searchVendors, getVendorBySlug)
│
└── types/
    └── vendor.ts                 # TypeScript interfaces: Vendor, VendorPackage,
                                  # VendorContact, VendorAvailability, VendorCategory,
                                  # VendorSearchFilters, VendorSearchResult
```

---

## API Endpoints

All endpoints are under `/api`.

### Vendors

#### `GET /api/vendors`

Returns a paginated, filterable list of active vendors.

**Query Parameters**

| Parameter | Type | Description |
|---|---|---|
| `category` | string | Filter by category (`Photographers`, `Venues`, `Cakes`, `DJs`, `Decorators`, `Makeup Artists`) |
| `location` | string | Filter by location (partial match) |
| `search` | string | Full-text search across name, category, location, specialties |
| `minRating` | number | Minimum rating filter (e.g. `4.5`) |
| `page` | number | Page number (default: `1`) |
| `limit` | number | Results per page (default: `10`) |

**Response** `200 OK`
```json
{
  "vendors": [ ...Vendor[] ],
  "total": 15,
  "page": 1,
  "limit": 10,
  "hasMore": true
}
```

---

#### `POST /api/vendors`

Creates a new vendor entry (in-memory only — no persistence until a database is connected).

**Request Body** — `Vendor` fields (name, category, location, etc.)

**Response** `201 Created` — the created vendor object.

---

#### `GET /api/vendors/:slug`

Returns a single vendor by their URL slug.

**Path Parameter**

| Parameter | Description |
|---|---|
| `slug` | Vendor slug, e.g. `sarah-johnson-photography` |

**Response** `200 OK` — `Vendor` object.  
**Response** `404 Not Found` — `{ "error": "Vendor not found" }`

---

#### `PUT /api/vendors/:slug`

Updates a vendor record (in-memory only).

**Request Body** — partial or full `Vendor` fields to update.

**Response** `200 OK` — updated vendor object.

---

#### `DELETE /api/vendors/:slug`

Deletes a vendor by slug (in-memory only).

**Response** `200 OK` — `{ "message": "Vendor deleted successfully" }`  
**Response** `404 Not Found` — `{ "error": "Vendor not found" }`

---

### Availability

#### `GET /api/vendors/:slug/availability`

Returns the availability calendar for a vendor.

**Response** `200 OK`
```json
{
  "success": true,
  "data": {
    "availableDates": ["2024-01-15", "2024-01-16"],
    "unavailableDates": ["2024-01-20"],
    "partiallyAvailableDates": ["2024-01-23"]
  }
}
```

---

#### `PUT /api/vendors/:slug/availability`

Updates the availability calendar for a vendor.

**Request Body**
```json
{
  "availableDates": ["2024-01-15"],
  "unavailableDates": ["2024-01-20"],
  "partiallyAvailableDates": ["2024-01-23"]
}
```

**Response** `200 OK` — `{ "success": true, "message": "Availability updated successfully" }`  
**Response** `400 Bad Request` — `{ "success": false, "error": "Invalid availability data format" }`

---

### Vendor Signup

#### `POST /api/vendor-signup`

Submits a vendor application. Sends an email to the admin via Resend.

**Request Body**
```json
{
  "firstName": "string",
  "lastName": "string",
  "businessName": "string",
  "email": "string",
  "phone": "string",
  "category": "photographer | venue | cake | dj | decorator | makeup | other",
  "location": "string",
  "experience": "beginner | intermediate | experienced | expert",
  "about": "string",
  "website": "string (optional)"
}
```

**Response** `200 OK` — `{ "ok": true }`  
**Response** `400 Bad Request` — `{ "ok": false, "error": "Missing required fields." }`  
**Response** `500 Internal Server Error` — `{ "ok": false, "error": "..." }`

**Required env vars:** `RESEND_API_KEY`, `FROM_EMAIL`, `TO_EMAIL`

---

## Data Model

### `Vendor`

```typescript
interface Vendor {
  id: string;
  slug: string;
  name: string;
  category: VendorCategory;
  location: string;
  rating: number;
  reviews: number;
  price: string;             // e.g. "From Rs 25,000"
  image: string;             // path to hero image
  description: string;
  specialties: string[];
  experience: string;        // e.g. "8+ years"
  languages: string[];
  portfolio: string[];       // image paths
  packages: VendorPackage[];
  contact: VendorContact;
  availability: VendorAvailability;
  features?: string[];       // used by venues
  amenities?: string[];      // used by venues
  equipment?: string;        // used by photographers
  gallery?: string[];        // additional venue images
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

type VendorCategory =
  | 'Photographers'
  | 'Venues'
  | 'Cakes'
  | 'DJs'
  | 'Decorators'
  | 'Makeup Artists';
```

### `VendorPackage`

```typescript
interface VendorPackage {
  id: string;
  name: string;
  price: string;
  duration?: string;
  includes: string[];
  isPopular?: boolean;
}
```

---

## Vendor Categories & URL Paths

| Category | URL Path |
|---|---|
| Photographers | `/vendors/photographers/:slug` |
| Venues | `/vendors/venues/:slug` |
| Cakes | `/vendors/cakes/:slug` |
| DJs | `/vendors/djs/:slug` |
| Decorators | `/vendors/decorators/:slug` |
| Makeup Artists | `/vendors/makeup/:slug` |

---

## Known Limitations

- **No database** — all vendor data lives in `src/lib/data/vendors.ts`. Mutations via `POST`/`PUT`/`DELETE` API calls are not persisted across server restarts.
- **Availability** — stored in an in-memory `Map` in the availability route. Resets on server restart.
- **Stripe** — the `stripe` and `@stripe/stripe-js` packages are installed but no checkout flow exists yet.
- **Auth** — there is no authentication. The admin panel at `/admin/availability` is publicly accessible.
- **Reviews** — review content on detail pages is placeholder text.
