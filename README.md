# 🛍️ EcoShop — React Native E-Commerce App

A production-grade React Native e-commerce application built with clean architecture, Redux Toolkit state management, and a premium UI/UX design system.

> Built as part of the React Native interview assignment using the [FakeStore API](https://fakestoreapi.com/)

---

## 🏗️ Architecture
src/
├── api/ # Axios client & service layers
│ ├── client.ts # Configured Axios instance with interceptors
│ ├── authService.ts # Auth API endpoints
│ └── productService.ts # Product API endpoints
├── components/
│ ├── common/ # Generic reusable components (Button, Input, ErrorBoundary, etc.)
│ └── ui/ # Feature-specific UI blocks (ProductCard, CartItemCard, etc.)
├── config/ # App configuration (status bar theme mapping)
├── constants/ # Design system (colors, typography, spacing)
├── hooks/ # Custom React hooks (useDebounce, useNetwork, useStatusBar, useStore)
├── navigation/ # React Navigation stacks, tabs, root navigator
├── screens/ # Screen components organized by feature
│ ├── Auth/ # Login, Register, Forgot Password, Splash, Profile
│ ├── Home/ # Sectioned product listing with filters
│ ├── Product/ # Product detail with add-to-cart
│ ├── Cart/ # Cart management
│ └── Search/ # Debounced search
├── store/ # Redux Toolkit configuration
│ └── slices/ # Feature slices (auth, products, cart)
├── types/ # TypeScript type definitions
└── utils/ # Utilities (storage, formatters, toast, route)


---

### Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Redux Toolkit** over Context API | Predictable state, dev tools, middleware support, scalable for large apps |
| **Feature-based slices** | Co-located logic — each slice owns its state, actions, and async thunks |
| **Separate API layer** | Services abstract API calls; easy to swap/mock; interceptors handle errors globally |
| **Design system constants** | Single source of truth for colors, typography, spacing — no magic values |
| **TypeScript throughout** | Type safety, better DX, fewer runtime bugs, self-documenting code |
| **Error Boundary** | Catches unexpected crashes gracefully instead of white screen of death |
| **Network awareness** | Offline banner informs users; prevents confusion when API calls fail |
| **Custom Toast notifications** | Premium UX feedback instead of jarring Alert.alert for every action |
| **Debounced search** | Prevents excessive filtering on every keystroke — performance conscious |
| **Async Storage persistence** | Auth session survives app restarts — users don't re-login every time |
| **Centralized status bar** | Single config map + hook — navigator controls everything, zero duplication |
| **Custom tab bar** | Professional ripple feedback, no harsh default Android shadows |

---

## ✅ Features

### Authentication
- [x] Login with FakeStore API (`/auth/login`)
- [x] Register with FakeStore API (`/users`)
- [x] Forgot Password flow (demo with success state)
- [x] Session persistence via Async Storage
- [x] Auto session restore on app restart
- [x] Splash screen during session check
- [x] Logout with confirmation

### Product Listing
- [x] Fetch all products from FakeStore API
- [x] Sectioned horizontal rows (Top Rated, Best Value, per Category)
- [x] Category filter chips (All, Electronics, Jewelery, etc.)
- [x] Sort & Filter modal (price, rating, name)
- [x] Shimmer loading skeleton
- [x] Pull-to-refresh
- [x] Error state with retry

### Product Details
- [x] Full product image, title, description, rating
- [x] Quantity selector with validation
- [x] Add to cart with loading spinner
- [x] Share product (floating button)
- [x] Shipping & returns info
- [x] Floating back button

### Cart Management
- [x] Add/remove/update items
- [x] Real-time total calculation
- [x] Quantity controls (increase/decrease)
- [x] Remove item with confirmation
- [x] Clear entire cart
- [x] Checkout action
- [x] Empty cart state
- [x] Cart badge on home & profile screens

### Search
- [x] Debounced search (400ms)
- [x] Search across title, description, and category
- [x] Results count indicator
- [x] Empty state / no results state
- [x] Clear search button

### UX Polish
- [x] Network connectivity banner
- [x] Custom toast notifications (success/error/info)
- [x] Error boundary for crash recovery
- [x] Consistent design system (colors, typography, spacing)
- [x] Premium card shadows and borders
- [x] Custom bottom tab bar with smooth ripple
- [x] Gradient auth headers with decorative elements
- [x] Adaptive status bar per screen
- [x] Loading states on all async actions

---

## 🛠️ Tech Stack

| Technology | Version |
|------------|---------|
| React Native | 0.85.3 |
| TypeScript | 5.8.3 |
| Redux Toolkit | 2.12.0 |
| React Navigation | 7.x |
| Axios | 1.16.1 |
| Async Storage | 3.0.2 |
| React Native Vector Icons (Material Icons) | Latest |
| React Native Toast Message | 2.3.3 |
| React Native Shimmer Placeholder | 2.0.9 |
| React Native NetInfo | 12.0.1 |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 22.11.0
- React Native CLI setup ([official guide](https://reactnative.dev/docs/environment-setup))
- Android Studio / Xcode
- Java Development Kit (JDK 17+)
- Android SDK (compileSdk 36)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/rkumar9525/EcoShop.git
cd EcoShop

# 2. Install dependencies
npm install

# 3. Install iOS pods (Mac only)
cd ios && pod install && cd ..

# 4. Start Metro bundler
npm start

# 5. Run on Android (new terminal)
npx react-native run-android

# 6. Run on iOS (Mac only, new terminal)
npx react-native run-ios
