<p align="center">
  <img src="apps/sim/public/static/sim.png" alt="Sim Studio Logo" width="500"/>
</p>

<p align="center">
  <a href="https://www.apache.org/licenses/LICENSE-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License: Apache-2.0"></a>
  <a href="https://discord.gg/Hr4UWYEcTT"><img src="https://img.shields.io/badge/Discord-Join%20Server-7289DA?logo=discord&logoColor=white" alt="Discord"></a>
  <a href="https://x.com/simstudioai"><img src="https://img.shields.io/twitter/follow/simstudioai?style=social" alt="Twitter"></a>
  <a href="https://github.com/simstudioai/sim/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome"></a>
  <a href="https://docs.simstudio.ai"><img src="https://img.shields.io/badge/Docs-visit%20documentation-blue.svg" alt="Documentation"></a>
</p>

<p align="center">
  <strong>Sim Studio</strong> is a lightweight, user-friendly platform for building AI agent workflows.
</p>

## Run

1. Run on our [cloud-hosted version](https://simstudio.ai)
2. Self-host

## How to Self-Host

There are several ways to self-host Sim Studio:

The project includes an example environment file at `apps/sim/.env.example`.
Copy this file to `.env` and adjust the values to match your setup before
starting the application.

### Option 1: Docker Environment (Recommended)

```bash
# Clone the repository
git clone https://github.com/simstudioai/sim.git

# Create environment file and update with required environment variables (BETTER_AUTH_SECRET)
cd apps/sim
cp .env.example .env

# Start Sim Studio using the provided script
docker compose up -d --build

or

./start_simstudio_docker.sh

# Windows and cross-platform users can run the Node.js helper
node start_simstudio_docker.js
```

After running these commands:

1. **Access the Application**:

   - Open [http://localhost:3000/w/](http://localhost:3000/w/) in your browser
   - The `/w/` path is where the main workspace interface is located

2. **Useful Docker Commands**:

   ```bash
   # View application logs
   docker compose logs -f simstudio

   # Access PostgreSQL database
   docker compose exec db psql -U postgres -d simstudio

   # Stop the environment
   docker compose down

   # Rebuild and restart (after code changes)
   docker compose up -d --build
   ```

#### Using the OpenAI API

If you plan to work exclusively with OpenAI models, a minimal Python example is included. It uses the official `openai` package to send a chat completion request.

```bash
# Install Python dependencies
pip install -r python/requirements.txt

# Run the example chat script
python python/openai_chat.py
```

Make sure the `OPENAI_API_KEY` environment variable is set before running the script. This script demonstrates a basic call to the OpenAI API and can be used as a starting point for further experimentation.

### Option 2: Dev Containers

1. Open VS Code or your favorite VS Code fork (Cursor, Windsurf, etc.)
2. Install the [Remote - Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
3. Open the project in your editor
4. Click "Reopen in Container" when prompted
5. The environment will automatically be set up
6. Run `bun run dev` in the terminal or use the `sim-start` alias

### Option 3: Manual Setup

1. **Install Dependencies**

```bash
# Clone the repository
git clone https://github.com/simstudioai/sim.git
cd sim

# Install dependencies
bun install
```

2. **Set Up Environment**

```bash
cd apps/sim
cp .env.example .env  # or create a new .env file

# Configure your .env file with the required environment variables:
# - Database connection (PostgreSQL)
# - Authentication settings (Better-Auth Secret,  Better-Auth URL)
```

⚠️ **Important Notes:**

- If `RESEND_API_KEY` is not set, verification codes for login/signup will be logged to the console.
- You can use these logged codes for testing authentication locally.
- For production environments, you should set up a proper email provider.

3. **Set Up Database**

```bash
# Push the database schema
cd apps/sim
bunx drizzle-kit push
```

4. **Start Development Server**

```bash
# Start the development server
cd ../..
bun run dev
```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Runtime**: [Bun](https://bun.sh/)
- **Database**: PostgreSQL with [Drizzle ORM](https://orm.drizzle.team)
- **Authentication**: [Better Auth](https://better-auth.com)
- **UI**: [Shadcn](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Flow Editor**: [ReactFlow](https://reactflow.dev/)
- **Docs**: [Fumadocs](https://fumadocs.vercel.app/)
- **Monorepo**: [Turborepo](https://turborepo.org/)

## Contributing

We welcome contributions! Please see our [Contributing Guide](.github/CONTRIBUTING.md) for details.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

##

<p align="center">Made with ❤️ by the Sim Studio Team</p>
