# Overview

This interactive learning platform is structured to be scalable and maintainable, with a clear separation between frontend and backend components. Below is a detailed explanation of the technologies, frameworks, and tools involved in the development stage.

## Technologies, Frameworks, and Tools

### Frontend

- **React**:  
  - Core framework for building the user interface.
  - **State Management**: Utilizes hooks, Context API, and Redux for managing global and local states.
  - **Components**: Includes modules like CodeEditor, TrueFalseQuestion, MultipleChoiceQuestion, and ShortAnswerQuestion.

- **Docusaurus**:  
  - Static site generator optimized for documentation.
  - **Configuration**: Managed in `docusaurus.config.ts` for theming, plugins, and sidebar generation.
  - **Documentation**: Used to maintain and update course materials, challenges, and quizzes.

- **Monaco Editor**:  
  - Provides a VS Code-like experience for coding challenges.
  - Integrated via `@monaco-editor/react` for syntax highlighting, IntelliSense, and customizability.

- **Material-UI**:  
  - Provides UI components like buttons and icons.
  - Ensures consistent and responsive design.

- **MDX**:  
  - Embeds React components inside Markdown for interactive documentation.

- **Yarn**:  
  - Package manager for handling dependencies and scripts.

### Backend

- **Django**:  
  - Core framework for the backend.
  - Manages user authentication, data storage, and serves REST APIs.
  - Key files include `manage.py`, `core/settings.py`, and `core/urls.py`.

- **Django REST Framework**:  
  - Facilitates API creation and management.
  - Uses token-based authentication for secure communication with the frontend.

- **Node.js**:  
  - Environment for running user-submitted code.
  - Paired with **Docker** to create isolated containers for secure code execution.

- **Docker**:  
  - Containerization tool to ensure security and isolation for running user-submitted code.

### Additional Tools and Practices

- **Jest**:  
  - Unit testing framework for ensuring component integrity.
  - Configuration managed via `jest.config.js` and `jest.setup.js`.

## Summary of Choices and Implementations

- **Monaco Editor**: Chosen for its rich feature set and integration with React.
- **Django Backend**: Provides a secure and reliable framework for user data and APIs.
- **Containerized Code Execution**: Ensures security and isolation.
- **State Management**: Managed using Redux and Context API.
- **REST APIs**: Facilitate communication between frontend and backend.
- **Docusaurus for Documentation**: Simplifies maintenance and updates of course materials.
