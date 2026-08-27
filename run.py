"""
run.py — Launch both the Vite frontend and FastAPI backend together.

Usage:
    python run.py          # Start both servers
    python run.py --client # Start only frontend
    python run.py --server # Start only backend
"""

import subprocess
import sys
import os
import signal
import time

# ── Paths ───────────────────────────────────────────────────
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
CLIENT_DIR = os.path.join(ROOT_DIR, "client")
SERVER_DIR = os.path.join(ROOT_DIR, "server")

# ── Colors for terminal output ──────────────────────────────
CYAN = "\033[96m"
YELLOW = "\033[93m"
GREEN = "\033[92m"
RED = "\033[91m"
RESET = "\033[0m"
BOLD = "\033[1m"


def print_banner():
    print(f"""
{CYAN}{BOLD}------------------------------------------------
       Winteg Technologies - Dev Server       
------------------------------------------------{RESET}
""")


def check_node_modules():
    """Check if node_modules exists in client/, if not run npm install."""
    node_modules = os.path.join(CLIENT_DIR, "node_modules")
    if not os.path.isdir(node_modules):
        print(f"{YELLOW}[SETUP]{RESET} node_modules not found in client/. Running npm install...")
        result = subprocess.run(
            ["npm", "install"],
            cwd=CLIENT_DIR,
            shell=True,
        )
        if result.returncode != 0:
            print(f"{RED}[ERROR]{RESET} npm install failed. Please run it manually in client/")
            sys.exit(1)
        print(f"{GREEN}[SETUP]{RESET} npm install completed!\n")


def check_python_deps():
    """Check if FastAPI is importable, if not suggest installing requirements."""
    try:
        import fastapi  # noqa: F401
        import uvicorn   # noqa: F401
    except ImportError:
        print(f"{YELLOW}[SETUP]{RESET} Python dependencies not found. Installing from server/requirements.txt...")
        result = subprocess.run(
            [sys.executable, "-m", "pip", "install", "-r", os.path.join(SERVER_DIR, "requirements.txt")],
        )
        if result.returncode != 0:
            print(f"{RED}[ERROR]{RESET} pip install failed. Please run:")
            print(f"  pip install -r server/requirements.txt")
            sys.exit(1)
        print(f"{GREEN}[SETUP]{RESET} Python dependencies installed!\n")


def start_client():
    """Start the Vite dev server."""
    print(f"{CYAN}[CLIENT]{RESET} Starting Vite dev server on http://localhost:5173")
    return subprocess.Popen(
        ["npm", "run", "dev"],
        cwd=CLIENT_DIR,
        shell=True,
    )


def start_server():
    """Start the FastAPI/Uvicorn server."""
    print(f"{YELLOW}[SERVER]{RESET} Starting FastAPI server on http://localhost:8000")
    return subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"],
        cwd=SERVER_DIR,
    )


def main():
    print_banner()

    # Parse simple flags
    only_client = "--client" in sys.argv
    only_server = "--server" in sys.argv

    processes = []

    try:
        if not only_server:
            check_node_modules()
            client_proc = start_client()
            processes.append(("CLIENT", client_proc))

        if not only_client:
            check_python_deps()
            server_proc = start_server()
            processes.append(("SERVER", server_proc))

        if not processes:
            print(f"{RED}[ERROR]{RESET} No processes to start.")
            sys.exit(1)

        print(f"\n{GREEN}{BOLD}[OK] All servers running!{RESET}")
        print(f"  {CYAN}Frontend:{RESET}  http://localhost:5173")
        print(f"  {YELLOW}Backend:{RESET}   http://localhost:8000")
        print(f"  {YELLOW}API Docs:{RESET}  http://localhost:8000/api/docs")
        print(f"\n  Press {BOLD}Ctrl+C{RESET} to stop all servers.\n")

        # Wait for processes
        for name, proc in processes:
            proc.wait()

    except KeyboardInterrupt:
        print(f"\n{RED}[SHUTDOWN]{RESET} Stopping all servers...")
        for name, proc in processes:
            try:
                proc.terminate()
                proc.wait(timeout=5)
                print(f"  {GREEN}[OK]{RESET} {name} stopped")
            except Exception:
                proc.kill()
                print(f"  {RED}[X]{RESET} {name} killed")
        print(f"{GREEN}[SHUTDOWN]{RESET} All servers stopped. Goodbye!\n")
        sys.exit(0)


if __name__ == "__main__":
    main()
