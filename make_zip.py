#!/usr/bin/env python3
"""Create the complete VELORA_Prompt5_Final.zip project archive."""
from pathlib import Path
import zipfile

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT.parent / "VELORA_Prompt5_Final.zip"
EXCLUDED_DIRS = {"node_modules", "__pycache__", ".git", ".venv", "venv", ".pytest_cache", ".mypy_cache"}
EXCLUDED_SUFFIXES = {".pyc", ".pyo"}
EXCLUDED_ARCHIVES = {
    "VELORA_Prompt1_Initial.zip",
    "VELORA_Prompt2_Design.zip",
    "VELORA_Prompt3_Functionality.zip",
    "VELORA_Prompt4_Debugged.zip",
    "VELORA_Prompt5_Final.zip",
}

with zipfile.ZipFile(OUTPUT, "w", compression=zipfile.ZIP_DEFLATED) as archive:
    for path in sorted(ROOT.rglob("*")):
        if not path.is_file():
            continue
        relative = path.relative_to(ROOT)
        if any(part in EXCLUDED_DIRS for part in relative.parts):
            continue
        if path.name in EXCLUDED_ARCHIVES or path.suffix.lower() in EXCLUDED_SUFFIXES:
            continue
        archive.write(path, Path("VELORA") / relative)

with zipfile.ZipFile(OUTPUT, "r") as archive:
    bad_member = archive.testzip()
    if bad_member:
        raise SystemExit(f"ZIP integrity check failed: {bad_member}")
print(f"Created and verified: {OUTPUT}")
