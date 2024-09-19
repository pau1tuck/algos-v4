# Authorization Process

## 1. useAuthChecker

- **Purpose:** Checks if the user is authenticated based on the presence of a token.
- **Usage:** Used within `useAuthState` to determine if the authentication process is loading or has completed.

### Flow

1. Checks for a token in cookies.
2. If found, makes an API call to validate the token and fetch user data.
3. Updates the Redux state with user data if authentication is successful.
4. Returns a loading state.

## 2. useAuthState**

- **Purpose:** Provides the current authentication state of the user.
- **Usage:** Called by components to get the user’s authentication status (`isAuthenticated`) and user data (`user`).

### Flow

- Calls `useAuthChecker` to perform authentication checks.
- Returns `isLoading`, `isAuthenticated`, and user based on Redux state.

## 3. usePageAuthorization**

- **Purpose:** Determines if a user is authorized to access a specific page.
- **Usage:** Called within `PageInitializer` to decide if the user should be granted access to a page.

### Flow

- Uses useAuthState to get the current user’s role from `user.role`
- Checks if the page requires authentication and if the user’s role matches the required role.
- Sets the `isAuthorized` state based on these checks.

## 4. withAuth**

- **Purpose:** A Higher-Order Component (HOC) that protects non-MDX React pages that require authentication.
- **Usage:** Wraps components to enforce authentication checks before rendering.

### Flow

- Uses `useAuthState` with `requiresAuth` set to true.
- Redirects to the login page if the user is not authenticated.
Shows a loading screen if authentication is still in progress.

## 5. PageInitializer**

- **Purpose:** Initializes a page within the course context, handling progress tracking and authorization.
- **Usage:** Used at the top of each MDX page to set up page data and handle user progress.

### Flow

- Uses `usePageAuthorization` to check if the user is authorized to view the page.
- If unauthorized, redirects to either /login or /unauthorized.
If authorized, initializes the page context and updates Redux with page progress.

## How They Interact

1. `withAuth`**:** Directly uses `useAuthState` to enforce authentication for non-MDX pages (e.g., /user/profile). It ensures users are redirected to /login if they aren’t authenticated.

2. `PageInitializer`**:** Uses `usePageAuthorization` to determine if the user has the necessary role to view the page. It takes care of pages within the MDX context and manages both authentication and authorization based on page data.

3.	`usePageAuthorization`**:** Calls `useAuthStat`e to get the current authentication state and determine if the user has access to the page. This is primarily used within `PageInitializer`.

4.	`useAuthState`**:** Serves as a centralized hook to get the authentication state, relying on `useAuthChecker` to validate the user’s token and update the Redux state accordingly.

5.	`useAuthChecker`**:** Handles the core logic of checking for a user token, making API calls to validate the token, and updating the Redux state.

**Complexity Breakdown**

•	**Separation of Concerns:** Each hook and component has a specific role, whether it’s checking authentication, authorizing access, or wrapping protected pages.

•	**Authorization Flow:** PageInitializer handles both authentication and authorization within the MDX pages, using usePageAuthorization to decide if a user should access the page.

•	**Handling Edge Cases:** requiresAuth allows pages to be accessed without authentication, providing flexibility for public content.

**Potential Streamlining**

•	**Combine Logic:** If PageInitializer handles authorization and withAuth handles authentication for non-MDX pages, you could consider consolidating their logic to reduce redundancy.

•	**Direct Access:** Instead of using usePageAuthorization within PageInitializer, you could pass the required role and requiresAuth directly to useAuthState to simplify the flow.

**Final Thoughts**

This setup is comprehensive and allows for fine-grained control over page access. However, it’s complex due to handling both authentication and role-based authorization across different contexts (MDX pages and regular routes). The complexity is a trade-off for flexibility and control over user access and experience.