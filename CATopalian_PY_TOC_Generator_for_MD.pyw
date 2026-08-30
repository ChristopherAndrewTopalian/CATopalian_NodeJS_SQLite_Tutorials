# CATopalian_PY_TOC_Generator_for_MD.pyw

from pathlib import Path

# Configuration
ROOT_DIR = Path(".")
OUTPUT_TOC = ROOT_DIR / "TABLE_OF_CONTENTS.md"
OUTPUT_COMBINED = ROOT_DIR / "main.md"
LANGUAGE = "javascript"


def get_sorted_javascript_files(base_path: Path):
    """Finds all .js files, ignoring hidden folders and the generator script itself."""
    js_files = []
    for file_path in base_path.rglob("*.js"):
        # Skip this generator script and hidden/build directories
        if file_path.name == Path(__file__).name or any(part.startswith(".") for part in file_path.parts):
            continue
        js_files.append(file_path)
    
    return sorted(js_files, key=lambda p: (p.parent.as_posix(), p.name))


def generate_table_of_contents(files):
    """Creates a structured, clickable Markdown Table of Contents."""
    content = [
        "# Table of Contents\n",
        "---\n"
    ]
    
    current_folder = None
    
    for file_path in files:
        folder_name = file_path.parent.name
        
        # New folder section
        if folder_name != current_folder:
            if current_folder is not None:
                content.append("---\n")
            current_folder = folder_name
            content.append(f"### {folder_name}\n")
        
        # Relative path formatted with web forward-slashes
        web_path = file_path.relative_to(ROOT_DIR).as_posix()
        file_name = file_path.name
        
        content.append(f"* [{file_name}]({web_path})\n")
    
    content.append("---\n")
    
    OUTPUT_TOC.write_text("\n".join(content), encoding="utf-8")
    print(f"Table of Contents created -> {OUTPUT_TOC.resolve()}")


def generate_combined_markdown(files):
    """Combines all javascript files into a single structured Markdown document."""
    content = [
        "# CODE BOOK\n",
        "---\n"
    ]

    current_folder = None

    for file_path in files:
        folder_name = file_path.parent.name
        
        if folder_name != current_folder:
            current_folder = folder_name
            content.append(f"## Section: {folder_name}\n")
        
        content.append(f"### `{file_path.name}`\n")
        content.append(f"```{LANGUAGE}")
        
        # Read the code, strip trailing empty space, then guarantee clean block boundaries
        code = file_path.read_text(encoding="utf-8", errors="replace").rstrip()
        content.append(code)
        content.append("```\n")
        content.append("---\n")
    
    OUTPUT_COMBINED.write_text("\n".join(content), encoding="utf-8")
    print(f"Combined codebook created  -> {OUTPUT_COMBINED.resolve()}")


def main():
    print("Scanning directory structure...")
    files = get_sorted_javascript_files(ROOT_DIR)
    
    if not files:
        print("No JavaScript files found.")
        return
    
    print(f"Found {len(files)} javascript files.")
    generate_table_of_contents(files)
    generate_combined_markdown(files)
    print("Done!")


if __name__ == "__main__":
    main()

####

# Dedicated to God the Father
# All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
# https://github.com/ChristopherAndrewTopalian
# https://github.com/ChristopherTopalian
# https://sites.google.com/view/CollegeOfScripting

