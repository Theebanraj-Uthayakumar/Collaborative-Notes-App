# Collaborative Notes App

This is a collaborative notes application built using TypeScript, React.js, Node.js, Express, MongoDB and Socket.io. The app allows users to create, share, and collaborate on notes in real-time. Authentication is handled with JWT, and the application is designed to be scalable and easy to maintain.

## Back-End Project Structure

```
collaborative-notes-app
│   ├──backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   └── noteController.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── models/
│   │   │   ├── Note.ts
│   │   │   └── User.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   └── noteRoutes.ts
│   │   ├── services/
│   │   │   └── jwtService.ts
│   │   ├── sockets/
│   │   │   └── socket.ts
│   │   ├── tests/
│   │   │   ├── auth.test.ts
│   │   │   └── notes.test.ts
│   │   ├── utils/
│   │   │   ├── responseHandler.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env
│   ├── .gitignore
│   ├── jest.config.js
│   ├── nodemon.json
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
```

### `config/`
- **`db.ts`**: This file contains the database (MongoDB) configuration and connection logic. It initializes the connection to the database and handles any necessary configurations.

### `controllers/`
- **`authController.ts`**: This controller handles user authentication-related operations, such as login, registration, refresh token and get all users.
- **`noteController.ts`**: This controller manages CRUD operations for notes. It includes methods to create, update, delete, and retrieve notes, as well as handle note-sharing functionality.

### `middleware/`
- **`auth.ts`**: This middleware ensures that routes requiring authentication are accessed only by users with valid JWT tokens. It verifies the token and attaches the user information to the request object.

### `models/`
- **`Note.ts`**: Defines the note schema with fields for title, content, user (owner), and sharedWith (users the note is shared with), along with timestamps.
- **`User.ts`**: Defines the user schema with fields for username, email, and password. It includes password hashing before saving and a method to compare passwords for authentication.

### `routes/`
- **`authRoutes.ts`**: Defines routes for user authentication, including registration, login, refreshing tokens, and fetching all users.
- **`noteRoutes.ts`**: Defines routes for note management, including creating, retrieving, updating, deleting, and sharing notes, with authentication middleware applied.

### `services/`
- **`jwtService.ts`**: This service handles JWT tokens, including generating and verifying both access and refresh tokens.

### `sockets/`
- **`socket.ts`**: This file contains the logic for managing real-time socket connections using Socket.io.

### `tests/`
- **`auth.test.ts`**: This file contains unit and integration tests for the authentication functionality. It ensures that the authentication logic works as expected.
- **`notes.test.ts`**: This file contains tests for the notes functionality, verifying the correctness of note creation, updating, deletion, and sharing.

### `utils/`
- **`responseHandler.ts`**: This file contains utility functions for standardized API responses, including success and error messages with metadata like program name, version, timestamp, and status code.

**`app.ts`**: This file contains Sets up the Express application with middleware for logging, security, and CORS. It connects to MongoDB, defines authentication and notes routes, and includes error handling middleware.

**`server.ts`**: This file contains an HTTP server using the Express app and sets up socket connections, starting the server on the specified port.

### Root Files
- **`.env`**: Contains environment variables used by the application, such as database URLs, secret keys, and other sensitive information.
- **`.gitignore`**: Specifies files and directories to be ignored by Git, such as `node_modules`, environment files, and logs.
- **`jest.config.js`**: Configuration file for Jest, the testing framework used in this project.
- **`nodemon.json`**: Configuration file for Nodemon, which is used for automatically restarting the server when changes are detected in development.
- **`package-lock.json`** & **`package.json`**: These files contain the list of dependencies for the project, including their versions and scripts for building, testing, and running the application.
- **`tsconfig.json`**: TypeScript configuration file, specifying compiler options and other TypeScript-related settings.


## Front-End Project Structure

```
collaborative-notes-app
├──frontend/
│   ├── public/
│   │   ├──assets/
│   │   │   └──images/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddNotes/
│   │   │   │   └── index.tsx
│   │   │   ├── ListNotes/
│   │   │   │   └── index.tsx
│   │   │   ├── Navbar/
│   │   │   │   └── index.tsx
│   │   │   └── Toaster/
│   │   │       └── index.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── routes/
│   │   │   └── ProtectedRoute.tsx
│   │   ├── service/
│   │   │   ├── common.service.ts
│   │   │   ├── environment.service.ts
│   │   │   ├── notes.service.ts
│   │   │   └── user.service.ts
│   │   ├── shared/
│   │   │   ├── constants/
│   │   │   │   └── apiConstants.ts
│   │   │   ├── interfaces/
│   │   │   │   └── index.ts
│   │   │   └── utils/
│   │   │       └── helpers.ts
│   │   ├── store/
│   │   │   ├── apps/
│   │   │   │   ├── notesSlice.ts
│   │   │   │   ├── usersSlice.ts
│   │   │   │   └── store.ts
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.tsx
│   │   ├── socket.ts
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── tsconfig.json
```

### `public/assets/`

- **Images/**: Contains static images used by the application, that do not change during the runtime.
  
- **favicon.ico**: The favicon for the application, which is displayed in the browser tab.

- **index.html**: The main HTML file that serves as the entry point for the React application. It includes the root div where the React app is rendered.

- **logo192.png and logo512.png**: Application logos of different sizes used for different contexts, like PWA (Progressive Web App) icons.

- **manifest.json**: The web app manifest file that contain metadata about the application, allowing it to be installed on devices as a PWA.

- **robots.txt**: A file that gives instructions to web crawlers about which pages or files should not be indexed.

### `src/components/`

- **AddNotes/**: This folder contains the `AddNotes` component, which is responsible for providing a form to add new notes.
  
- **ListNotes/**: This folder contains the `ListNotes` component, which is responsible for displaying a list of notes created by the user and user can edit, delete and share that notes.

- **Navbar/**: Contains the `Navbar` component, which includes the navigation links for the app.

- **Toaster/**: Contains the `Toaster` component, which handles toast notifications for the application.

### `src/context/`

- **AuthContext.tsx**: This file contain an authentication context for the application, handling user authentication states across different components.

### `src/pages/`

- **HomePage.tsx**: The main page of the application, showing a list of Notes.

- **LoginPage.tsx**: The login page where users can authenticate themselves.

- **ProfilePage.tsx**: Displays the user's profile information.

- **RegisterPage.tsx**: The registration page for new users to sign up.

### `src/routes/`

- **ProtectedRoute.tsx**: A higher-order component (HOC) that ensures certain routes are only accessible by authenticated users.

### `src/service/`

- **common.service.ts**: Contains common service functions that are reused across the app.

- **environment.service.ts**: Manages environment-specific configurations.

- **notes.service.ts**: This file contains API calls and services related to notes.

- **user.service.ts**: This file contains API calls and services related to user actions.

### `src/shared/`

- **constants/**: Contains constant values used throughout the application, such as API endpoint URLs in `apiConstants.ts`.

- **interfaces/**: Defines TypeScript interfaces and types used across the app for better type safety.

- **utils/**: Contains utility functions that are reused across the app, like helper functions in `helpers.ts`.

### `src/store/`

- **apps/**: Contains the Redux slices for managing global state. For example:
  - **notesSlice.ts**: Manages the state for notes-related data.
  - **usersSlice.ts**: Manages the state for user-related data.
  - **store.ts**: Configures the Redux store, combining various slices.

### `src/styles/`

- **index.css**: Global styles for the application.


### Root Files

- **App.tsx**: The main component that wraps all other components and sets up the routes.

- **socket.ts**: Manages WebSocket connections if the app requires real-time updates.

- **.env**: Environment variables used in the project, such as API keys or URLs.

- **.gitignore**: Lists files and directories that should be ignored by Git.

- **package.json**: Lists the project's dependencies, scripts, and metadata.

- **package-lock.json**: Locks the versions of dependencies installed via npm.

- **README.md**: Documentation file explaining the project, its structure, and usage.

- **tsconfig.json**: TypeScript configuration file defining the compiler options.

## Getting Started
### Back End setup

1. **Set up environment variables:**
    ```
    cd backend
    
    touch .env

    echo "PORT=7001
          MONGO_URI=mongodb+srv://theebanraj:qThJaeJLHCU0oAeH@notes-app.kaclv.mongodb.net/notes-app?retryWrites=true&w=majority
          JWT_SECRET=vXniEY0WPAqQ/ql+xJLgjH2eXgnLctJ2Zf7+rbQtsr4=
          SOCKET_IO_PORT=5001
          JWT_REFRESH_SECRET=vIm2+Sjcx3rVtU5B4l89vt2ZEAFuGIghxke1FYwhfvxEeyXJhyE+N2Y3bsBSXO/bXiCu7nnLMKkOQdjgdt4Ymw==" > .env
    ```

2. **Install Dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm run dev
   ```

4. **Run unit testing:**
    ```
    npm run test
    ```

### Front End setup

1. **Set up environment variables:**
    ```
    cd frontend

    touch .env

    echo "BACKEND_API_BASE_URL=http://localhost:7001" > .env
    ```

2. **Install Dependencies:**
   ```
   npm install
   ```

3. **Install Frontend Dependencies and run the application:**
   ```
   npm start
   ```
4. **Run unit testing:**
    ```
    npm test
    ```