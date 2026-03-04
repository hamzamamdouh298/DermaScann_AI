# DermaScann AI - Mobile App Interface Design

## Design Philosophy

DermaScann AI is a medical skin scanning application that combines professional healthcare aesthetics with user-friendly design. The app follows **Apple Human Interface Guidelines (HIG)** to deliver a first-party iOS experience. The design prioritizes clarity, trust, and accessibility for users concerned about skin health.

### Key Principles
- **Medical Trust:** Professional color palette (blues, teals, neutral grays) to convey healthcare authority
- **One-Handed Usage:** All interactive elements positioned within thumb reach on portrait orientation (9:16)
- **Clear Information Hierarchy:** Risk levels and results prominently displayed with color coding
- **Accessibility:** High contrast ratios, clear typography, intuitive navigation

---

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Primary Blue** | `#0A7EA4` | Buttons, headers, primary actions |
| **Teal Accent** | `#06B6D4` | Highlights, accents, secondary actions |
| **Success Green** | `#22C55E` | Low-risk status, positive feedback |
| **Warning Yellow** | `#F59E0B` | Medium-risk status, caution indicators |
| **Error Red** | `#EF4444` | High-risk status, alerts |
| **Background** | `#FFFFFF` (light) / `#151718` (dark) | Screen backgrounds |
| **Surface** | `#F5F5F5` (light) / `#1E2022` (dark) | Cards, elevated surfaces |
| **Foreground** | `#11181C` (light) / `#ECEDEE` (dark) | Primary text |
| **Muted** | `#687076` (light) / `#9BA1A6` (dark) | Secondary text |
| **Border** | `#E5E7EB` (light) / `#334155` (dark) | Dividers, borders |

---

## Screen List & Layout

### 1. **Welcome & Auth Screen**
**Purpose:** User onboarding and authentication

**Layout Structure:**
- **Top Section (30%):** Logo, app name, tagline
- **Middle Section (50%):** Segmented control (Login | Sign Up), form fields
- **Bottom Section (20%):** Disclaimer box, privacy/terms links

**Key Elements:**
- Logo (app icon)
- App name: "DermaScann AI"
- Tagline: "AI Skin Monitoring"
- Segmented control with animated underline
- Login form: email, password (with eye toggle), remember me, forgot password
- Sign up form: full name, email, password, confirm password, terms checkbox
- Primary CTA: "Login" / "Create Account"
- Divider: "OR"
- Social login: "Continue with Google" (optional)
- Disclaimer: "⚠ This app does not replace medical diagnosis"
- Links: Privacy Policy, Terms of Service

---

### 2. **Dashboard / Home Screen**
**Purpose:** Central hub showing lesion overview and quick actions

**Layout Structure:**
- **Top App Bar:** Greeting, profile avatar
- **Summary Card:** Total lesions tracked, last scan date, overdue reminder
- **Lesions List:** Card-based grid/list
- **Floating Action Button:** "New Scan"
- **Empty State:** Illustration + CTA when no lesions

**Key Elements:**
- Greeting: "Hello, [Name]"
- Profile avatar (clickable → Profile screen)
- Summary card with stats
- Lesion cards showing:
  - Thumbnail image
  - Lesion name
  - Body location
  - Risk status (color-coded: 🟢 Low, 🟡 Medium, 🔴 High)
  - Last scan date
  - Chevron icon
- FAB: "New Scan" (bottom-right)
- Empty state illustration + "Start First Scan" button

---

### 3. **Camera & Preview Screen**
**Purpose:** Capture skin lesion images for analysis

**Layout Structure:**
- **Camera Mode:** Fullscreen camera view
- **Capture UI:** Grid overlay, flash toggle, camera switch, capture button
- **Preview Mode:** Image preview with crop/zoom, retake/confirm buttons

**Key Elements:**
- Fullscreen camera view
- Grid overlay (optional, for composition guidance)
- Flash toggle (top-left)
- Camera switch icon (top-right)
- Large circular capture button (bottom-center)
- Auto-focus indicator
- Lighting suggestion tooltip
- AI detection frame guide
- Preview image with zoom/pan support
- Retake button (secondary)
- "Confirm & Analyze" button (primary)

---

### 4. **Analysis Results Screen**
**Purpose:** Display AI analysis and risk assessment

**Layout Structure:**
- **Header:** Back button, "Scan Result" title
- **Image Section:** Lesion image, date/time
- **Risk Card:** Risk level, confidence score progress bar
- **AI Explanation:** Summary paragraph, expandable "See More"
- **Recommendation:** Next steps, alerts if high-risk
- **Action Buttons:** Save to History, Share Report, Start New Scan

**Key Elements:**
- Back button
- Title: "Scan Result"
- Lesion image (large)
- Date & time of scan
- Risk indicator card with:
  - Large risk level text (Low/Medium/High)
  - Color gradient background
  - Risk icon
  - Confidence score progress bar
- AI explanation section (expandable)
- Recommendation box (styled alert if high-risk)
- Action buttons (Save, Share, New Scan)

---

### 5. **Lesion Detail Screen**
**Purpose:** View complete history and details of a specific lesion

**Layout Structure:**
- **Header:** Back arrow, lesion name, edit icon
- **Main Image:** Large image with zoom/pan, risk badge overlay
- **Info Card:** Detection date, body location, average risk, editable notes
- **Timeline:** Scrollable vertical timeline of scans
- **Comparison Mode:** Multi-select and side-by-side comparison
- **Bottom Actions:** Add New Scan, Edit Notes, Delete Lesion

**Key Elements:**
- Back arrow
- Lesion name (editable)
- Edit icon
- Large image with zoom/pan
- Risk badge overlay
- Info card showing:
  - First detected date
  - Body location
  - Average risk over time
  - Editable notes
- Scrollable timeline with:
  - Date
  - Thumbnail
  - Risk label
  - Confidence %
  - Tap to view full result
- Comparison mode (multi-select, side-by-side slider)
- Action buttons:
  - "Add New Scan"
  - "Edit Notes"
  - "Delete Lesion" (red, with confirmation modal)

---

### 6. **Profile & Settings Screen**
**Purpose:** User account management and app preferences

**Layout Structure:**
- **Top Section:** User avatar, name, email, edit profile button
- **Tabs Navigation:** Profile | Settings | Education
- **Tab Content:** Varies by selected tab

**Profile Tab:**
- Edit name
- Change password
- Delete account

**Settings Tab:**
- Dark/Light mode toggle
- Notifications toggle
- Language selector
- Data export option

**Education Tab:**
- Article cards:
  - "What is melanoma?"
  - "Prevention tips"
  - "When to visit doctor?"

---

### 7. **Share Report Screen**
**Purpose:** Generate and share scan results

**Layout Structure:**
- **PDF Preview:** Scrollable preview of report
- **Share Options:** WhatsApp, Email, Download PDF, Copy link
- **UX Enhancements:** Loading indicator, success animation

**Key Elements:**
- PDF preview area showing:
  - Lesion image
  - Risk level
  - Confidence score
  - AI explanation
  - Date
- Share options:
  - WhatsApp
  - Email
  - Download PDF
  - Copy link
- Loading indicator while generating PDF
- Success animation after share

---

## Key User Flows

### Flow 1: First-Time User Onboarding
1. User opens app → Welcome screen
2. User signs up (full name, email, password)
3. User accepts terms → Dashboard (empty state)
4. User taps "Start First Scan" → Camera screen
5. User captures image → Preview screen
6. User confirms → Analysis results
7. User saves → Dashboard with first lesion

### Flow 2: Monitor Existing Lesion
1. User opens app → Dashboard
2. User taps lesion card → Lesion Detail screen
3. User views history timeline
4. User taps "Add New Scan" → Camera screen
5. User captures new image → Analysis results
6. User saves → Lesion Detail updated with new scan

### Flow 3: Share Report with Doctor
1. User on Analysis Results screen
2. User taps "Share Report" → Share Report screen
3. User selects share method (Email/WhatsApp)
4. Report generated as PDF
5. Report sent via selected platform

---

## Advanced UX Enhancements

- **Micro-interactions:** Subtle haptic feedback on button presses
- **Smooth Transitions:** Page transitions using React Native Reanimated
- **Skeleton Loading:** Loading states while fetching data
- **Error States:** Clear error messages for camera/analysis failures
- **Push Notifications:** Reminders for periodic skin checks
- **Dark Mode:** Full support for dark mode throughout the app
- **Accessibility:** High contrast ratios, clear typography, proper touch targets

---

## Technical Notes

- **Navigation:** Expo Router with tab-based bottom navigation
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **State Management:** React Context + AsyncStorage for local persistence
- **Camera:** Expo Camera API for image capture
- **Image Processing:** Local image manipulation before upload
- **API Integration:** tRPC for type-safe backend communication
- **Responsive Design:** Portrait orientation (9:16) optimized for mobile

