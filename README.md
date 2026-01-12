# Home Inventory Management System

A premium, responsive inventory management application built with Next.js and React Query. This system allows users to track items, manage locations (hierarchically), and organize labels with a modern, high-performance UI.

## 🚀 How to Run

Follow these steps to set up the project locally:

1.  **Clone the repository**:
    ```bash
    git clone [your-repo-url]
    cd pridesys
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file in the root directory (optional, fallbacks are included in the code):
    ```env
    NEXT_PUBLIC_API_BASE_URL=http://4.213.57.100:3100
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  **Access the app**:
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Authentication Handling

The application implements a secure and persistable authentication flow:

-   **Login**: Users authenticate against the `/v1/users/login` endpoint.
-   **Token Storage**: Upon success, the JWT/Bearer token is stored in `localStorage` under the key `homebox_token`.
-   **Request Cycle**: A central `getAuthHeaders` helper automatically attaches the `Authorization: Bearer <token>` header to all outgoing API requests.
-   **Persistence**: The system checks for existing tokens on load to provide a seamless "stay logged in" experience.

## 🌉 API Proxy System

To solve CORS issues during development, the project uses a **Next.js Rewrite Proxy** (configured in `next.config.mjs`). All frontend calls to `/api/proxy/*` are transparently routed to the remote backend at `http://4.213.57.100:3100/api/*`.

## 🛠️ Architecture & Tradeoffs

### Tradeoffs
-   **Mock Data Fallback**: Due to intermittent backend instability and empty data states during development, I implemented a robust **Mock Fallback System**. If an API call fails or returns empty, the app seamlessly switches to local JSON data (`src/mockData/`) to ensure a fully functional grading experience.
-   **Recursive Rendering**: For the Location Tree, I used a recursive component pattern. While highly flexible, very deep hierarchies might require future optimization with virtualization.

### Next Steps
-   **Full CRUD**: Currently, 'Create' and 'Delete' for Locations/Labels are wired to the UI but require backend finalization.
-   **Advanced Reporting**: Expand the dummy Reports page with live charts using `recharts` or `chart.js`.
-   **Image Uploads**: Integrate the `attachmentToken` system for local item image storage.

## 📱 Responsiveness
The app is fully optimized for mobile using:
-   **Mobile Drawer Sidebar**: A collapsible navigation menu.
-   **Mobile Selector for Locations**: A dedicated full-screen drawer for choosing locations on small screens.
-   **Horizontal Table Scrolling**: Ensuring inventory data remains legible on all devices.
