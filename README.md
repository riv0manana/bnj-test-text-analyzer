# Text Analyzer Project

## Project Overview

Text Analyzer is a full-stack application designed to analyze text input and scores it.

**Key Features:**
- **Text Analysis:** Analyze text, return scores.
- **AI Integration:** Leveraging OpenAI's GPT models for deep analysis (configurable).
- **History:** Persist analysis results for future reference.
- **Stack:** React, Node.js, and PostgreSQL.

## Dev Installation

Follow these steps to set up the development environment.

### Prerequisites
- Node.js (v20+)
- Docker and Docker Compose (for the database)

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd text-analyzer
    ```

2.  **Install dependencies:**
    This command installs dependencies for the root, client, and server workspaces.
    ```bash
    npm run install:all
    ```

3.  **Environment Configuration:**
    - Copy `.env.example` to `.env` in the root directory (if applicable) and in `server/`.
    - Configure your `DATABASE_URL` and `OPENAI_API_KEY` (optional) in `server/.env`.

4.  **Start the Database:**
    Start the PostgreSQL instance using Docker Compose.
    ```bash
    docker-compose up -d db
    ```

5.  **Run Migrations:**
    Apply database migrations to set up the schema.
    ```bash
    npm run db:migrate --prefix server
    ```

6.  **Start Development Servers:**
    Run both client and server in development mode concurrently.
    ```bash
    npm run dev
    ```
    - Client: http://localhost:5173
    - Server: http://localhost:3000

## Product Docker Installation

The project includes a production-ready Docker setup using a multi-stage build process.

1.  **Build and Run:**
    ```bash
    docker-compose up -d --build
    ```
    This command will:
    - Build the application image using the `Dockerfile`.
    - Start the `app` and `db` services defined in `docker-compose.yml`.

2.  **Access the Application:**
    The application will be available at http://localhost:3000 (The server serves the built static frontend files in production).

**Dockerfile Highlights:**
- **Multi-stage Build:** Uses a `builder` stage to compile TypeScript and build React assets, keeping the final `runner` image lightweight.
- **Production Optimization:** Installs only production dependencies in the final image.
- **Security:** runs as a non-root user (best practice recommended for future enhancements).

## UI Atomic Design Choice

The frontend architecture follows the **Atomic Design** methodology to ensure consistency, reusability, and scalability of the UI.

**Structure (`client/src/components`):**
- **UI (Atoms):** Basic building blocks like `button.tsx`, `input.tsx`, `card.tsx`. These are highly reusable, stateless components (built with `shadcn/ui` primitives).
- **Molecules:** Combinations of atoms working together, e.g., `ChatInput.tsx` (Input + Button), `MessageBubble.tsx`.
- **Organisms:** Complex sections of the interface composed of molecules and atoms, e.g., `ChatWindow.tsx`, `HistoryList.tsx`.
- **Templates:** Page-level layouts that define the structure of content, e.g., `DashboardTemplate.tsx`.

**Benefits:**
- **Maintainability:** Changes to atoms propagate throughout the system.
- **Consistency:** Ensures a unified look and feel.
- **Development Speed:** Developers can assemble pages quickly using pre-built components.

## Backend Structure Choice

The backend is architected using **Hexagonal Architecture (Ports and Adapters)**, also known as Clean Architecture principles.

**Structure (`server/src/core`):**
- **Domain:** Contains the core business logic and models (`domain/models`). This layer is independent of external frameworks or libraries.
- **Application:** Defines the use cases of the system (`application/use-cases`). It orchestrates the flow of data using Ports (`application/ports`).
- **Infrastructure:** Contains the implementation of the Ports (Adapters).
    - **Repository:** Database implementations (`infra/repository/db`).
    - **Services:** External service integrations like `GPTAnalyser` or `SimpleAnalyzeService`.

**Dependency Injection:**
- The project uses `@evyweb/ioctopus` for dependency injection (`container.ts`).
- This allows for easy swapping of implementations (e.g., using a Mock repository for testing or switching between GPT and Simple analysis services based on configuration).

**Benefits:**
- **Testability:** Business logic can be tested in isolation without a database or external APIs.
- **Flexibility:** Infrastructure components (database, external APIs) can be changed without affecting the core business logic.
- **Separation of Concerns:** Clear boundaries between business rules and technical details.
