# 📝 NoteSpace — React Native Notes Application

<p align="center">
  <img src="https://socialify.git.ci/Samukelokhathi/React-Native-Notes-Application/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="NoteSpace" width="640" />
</p>

NoteSpace is a mobile notes application built with React Native, TypeScript, and Expo. It provides users with a simple and organized space to create, manage, and access their personal notes.

The application allows users to register, log in, create custom note categories, write notes, update existing notes, delete notes, search their notes, and manage their profiles. It also includes dark and light theme support to provide a comfortable user experience.

The application uses Expo Router for navigation, AsyncStorage for local data persistence, and SecureStore for password storage. Its structure separates screens, reusable components, application context, services, types, and utilities to keep the code organized and maintainable.

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- Git
- Visual Studio Code or another code editor
- Expo Go on an Android or iOS device, or an Android emulator
- An Expo-compatible development environment

### Clone the repository

```bash
git clone https://github.com/Samukelokhathi/React-Native-Notes-Application.git
cd React-Native-Notes-Application
```

### 1. Install Dependencies

Install the project dependencies:

```bash
npm install
```

Expo-compatible packages can be installed using:

```bash
npx expo install
```

### 2. Start the Application

Start the Expo development server:

```bash
npx expo start
```

After starting the development server:

- Scan the QR code using Expo Go on your mobile device.
- Press `a` to open the application in an Android emulator.
- Press `w` to open the web version if web support is configured.

For a clean restart of the development server, use:

```bash
npx expo start -c
```

> **Note:** The application uses local device storage. User accounts and notes are stored on the device and are not automatically synchronized between devices.

## ✨ Features

### 🔐 User Authentication

- User registration
- User login and logout
- Email validation
- Password validation
- Duplicate email prevention
- Persistent user session
- Protected application navigation

### 📝 Notes Management

- Create new notes
- View all saved notes
- Edit existing notes
- Delete notes
- Assign notes to categories
- Display note creation and update dates
- Organize notes using custom categories

### 📂 Category Management

- Four default categories:
  - Work
  - Study
  - Personal
  - Ideas
- Add custom categories
- Assign different colors to categories
- Display the number of notes in each category
- Open notes belonging to a selected category
- Match category label colors across the application

### 🔍 Search and Sorting

- Search notes by title
- Search notes by content
- Search notes by category
- Sort notes by newest first
- Sort notes by oldest first

### 👤 Profile Management

- View profile information
- Update username
- Update email address
- Change account password
- Log out of the application

### 🎨 Application Features

- Dark mode
- Light mode
- Persistent theme selection
- Responsive mobile interface
- Reusable React Native components
- Expo Router navigation
- Local data persistence
- User-specific note management

## 🛠️ Technologies Used

### Frontend and Mobile Development

- React Native
- TypeScript
- Expo
- Expo Router
- React Hooks
- React Native StyleSheet
- React Native components

### Navigation and State Management

- Expo Router
- React Context API
- React Hooks (`useState`, `useEffect`, `useCallback`)
- Custom authentication context
- Custom theme context

### Data Storage

- `@react-native-async-storage/async-storage`
- `expo-secure-store`

### Development Tools

- Git and GitHub
- npm
- Visual Studio Code
- Expo Go
- Android Emulator
- EAS Build

## 📚 What I Learned

- Building mobile applications with React Native and Expo
- Developing applications using TypeScript
- Organizing a project using a structured folder architecture
- Implementing navigation using Expo Router
- Creating reusable components
- Managing application state with React Hooks
- Sharing application data using the Context API
- Implementing user registration and login
- Validating user input
- Working with AsyncStorage for local data persistence
- Using SecureStore for password storage
- Implementing CRUD operations (Create, Read, Update, Delete)
- Managing notes and custom categories
- Filtering and sorting application data
- Implementing search functionality
- Managing user profile information
- Creating reusable and responsive mobile interfaces
- Implementing dark and light themes
- Using Git and GitHub for version control
- Testing and debugging a React Native application

## 🏗️ Application Architecture

NoteSpace follows a simple layered architecture. The screens handle the user interface, components provide reusable UI elements, contexts share application state, and services handle data operations.

```text
┌────────────────────────────────────┐
│           React Native UI          │
│                                    │
│  Landing · Login · Register        │
│  Dashboard · Notes · Profile       │
└──────────────────┬─────────────────┘
                   |
                   | User interactions
                   v
┌────────────────────────────────────┐
│          Application Context       │
│                                    │
│  AuthContext · ThemeContext        │
│  Current User · Selected Theme     │
└──────────────────┬─────────────────┘
                   |
                   | Function calls
                   v
┌────────────────────────────────────┐
│             Services               │
│                                    │
│  AuthService · NotesService        │
│  CategoryService · Storage         │
└──────────────────┬─────────────────┘
                   |
                   | Local data operations
                   v
┌────────────────────────────────────┐
│           Device Storage           │
│                                    │
│  AsyncStorage · SecureStore        │
│                                    │
│  Users · Notes · Categories        │
│  Sessions · Passwords · Theme      │
└────────────────────────────────────┘
```

### Application Flow

1. A user opens NoteSpace and accesses the welcome screen.
2. The user registers or logs into an account.
3. Authentication context makes the current user available to application screens.
4. The dashboard loads the user's categories and notes.
5. The user can create, view, update, search, sort, and delete notes.
6. The user can create custom categories and organize notes.
7. Application services communicate with local storage to save and retrieve information.
8. The user can update profile details and switch between dark and light themes.

## 📁 Project Structure

```text
samukelokhathi-react-native-notes-application/
├── README.md
├── AGENTS.md
├── app.json
├── LICENSE
├── package.json
├── tsconfig.json
├── assets/
│   └── expo.icon/
│       └── icon.json
└── src/
    ├── app/
    │   ├── _layout.tsx
    │   ├── addNote.tsx
    │   ├── dashboard.tsx
    │   ├── editNote.tsx
    │   ├── index.tsx
    │   ├── notes.tsx
    │   ├── profile.tsx
    │   └── auth/
    │       ├── authForm.tsx
    │       ├── login.tsx
    │       └── register.tsx
    ├── components/
    │   ├── constants/
    │   │   ├── categories.ts
    │   │   └── storageKeys.ts
    │   ├── custom/
    │   │   ├── customButton.tsx
    │   │   └── customInput.tsx
    │   ├── dashboard/
    │   │   └── categoryCard.tsx
    │   └── notes/
    │       └── noteCard.tsx
    ├── constants/
    │   ├── categories.ts
    │   └── storageKeys.ts
    ├── context/
    │   ├── authContext.tsx
    │   └── themeContext.tsx
    ├── services/
    │   ├── authService.ts
    │   ├── categoryService.ts
    │   ├── notesService.ts
    │   ├── noteStorage.ts
    │   └── storage.ts
    ├── styles/
    │   └── colors.ts
    ├── types/
    │   └── noteAppModels.ts
    └── utils/
        └── inputValidation.ts

.claude/
└── settings.json
```

### Folder Responsibilities

| Folder | Responsibility |
|---|---|
| `app/` | Application screens and Expo Router navigation |
| `components/` | Reusable UI components |
| `constants/` | Default categories and storage keys |
| `context/` | Shared authentication and theme state |
| `services/` | Authentication, notes, categories and storage operations |
| `styles/` | Shared application colors |
| `types/` | TypeScript models for users, notes and categories |
| `utils/` | Input validation and helper functions |

## 🔧 Application Commands

### Start Development Server

```bash
npx expo start
```

### Start with Cache Cleared

```bash
npx expo start -c
```

### Check TypeScript

```bash
npx tsc --noEmit
```

### Run Expo Diagnostics

```bash
npx expo-doctor
```

### Fix Expo Package Versions

```bash
npx expo install --fix
```

## 📱 Building the Application

NoteSpace can be prepared for Android distribution using Expo Application Services (EAS).

Install or use the EAS CLI:

```bash
npx eas-cli@latest login
```

Configure an EAS build profile using `eas.json`, then create an Android APK:

```bash
npx eas-cli@latest build -p android --profile preview
```

The preview profile should be configured for APK distribution if you want an installable Android APK.

For more information, see the [Expo EAS Build documentation](https://docs.expo.dev/build/introduction/).

## 🔐 Security and Data Storage

NoteSpace uses local storage to manage user information and application data.

- **AsyncStorage:** Used to persist application data such as users, notes, categories, and session information.
- **SecureStore:** Used to store account passwords separately from ordinary application data.
- **Account isolation:** Each note contains a `userId`, allowing the application to retrieve notes belonging to the logged-in user.
- **Input validation:** Registration and profile forms validate user input before saving changes.
- **Protected navigation:** Authentication state controls access to application screens.

> **Important:** This is a local-storage application, not a cloud-based multi-device service. AsyncStorage data is not encrypted by default. SecureStore protects stored credentials using platform-provided secure storage, but a production application should also consider server-side authentication, password hashing, encrypted data handling, backups, and account recovery.

## 🌐 Project Links

- 💻 **GitHub Repository:** [React Native Notes Application](https://github.com/Samukelokhathi/React-Native-Notes-Application)
- ⚡ **Development Platform:** [Expo](https://expo.dev/)
---

<p align="center">
  Built with ❤️ using React Native, TypeScript and Expo.
</p>
