# How the System Functions

## 1. Frontend State Management

- The PageProvider.tsx manages state at the page level, registering questions, updating their statuses, and calculating the page score when users interact with the questions.
- When the user submits the page (via SubmitButton.tsx), the current progress (completed questions, page ID, challenge ID if applicable) is dispatched to Redux.
- userProgressSlice.ts manages the global user progress state using reducers like updatePageProgress, which stores completed questions, pages, and challenges.
- userProgressThunk.tsx handles async requests to fetch or save progress to the backend.

## 2. Backend Gameplay Logic

- On the backend, models like UserProgress, Track, Challenge, Grade, and Rank handle the core gameplay logic. The backend will perform the calculations for XP, Rank, Grade, Level, etc., based on the data received from the frontend.
- The frontend sends completed question IDs, page ID, and optionally the challenge ID, and the backend calculates and returns the updated user state (XP, rank, health, etc.).

