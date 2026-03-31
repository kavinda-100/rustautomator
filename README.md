# RustAutomator 🦀

**Stop fighting with boilerplate. Start writing Rust.**

RustAutomator is a productivity-first VS Code extension designed to eliminate the repetitive manual work of managing Rust module structures. Whether you are building a CLI tool, a web server, or a high-performance Web3 program, RustAutomator keeps your project structure in sync with your code.

---

## 🚀 Core Features

### 1. Smart Module Folder Creation

Tired of manually creating a folder, adding a `mod.rs`, and then registering it in `main.rs`?

- **The Workflow:** Right-click the `src` folder > **"Create Rust Module Folder"**.
- **The Automation:** \* Creates the directory and an empty `mod.rs` file.
    - Automatically injects `mod <folder_name>;` into your `main.rs` or `lib.rs`.
    - **Smart Placement:** It intelligently scans for existing imports and module declarations, placing the new line exactly where it belongs—keeping your code clean and organized.

### 2. Live Sub-file Registration (Auto-Watcher)

Adding a new logic file shouldn't require a trip back to the parent module file.

- **The Workflow:** Just create a new `.rs` file (e.g., `auth.rs`) inside any folder containing a `mod.rs`.
- **The Automation:** RustAutomator detects the new file and instantly appends `pub mod <file_name>;` to the parent `mod.rs`.
- **Safe Sync:** It intelligently ignores `main.rs`, `lib.rs`, and `mod.rs` to ensure your module tree remains valid and circular-dependency free.

---

## 🛠 How to Use

### Creating a New Module

1. In the VS Code Explorer, **right-click** on the `src` folder.
2. Select **"Create Rust Module Folder"**.
3. Enter your desired folder name.
4. _Result:_ Your folder is ready, and your entry point (`main.rs`/`lib.rs`) is already updated.

### Adding Logic Files

1. Create a new `.rs` file inside any of your module folders.
2. _Result:_ Watch the parent `mod.rs` update automatically in the background.

---

## ⚙️ Requirements & Compatibility

- **Project Type:** Requires a valid Rust project (presence of `Cargo.toml`).
- **VS Code:** Version 1.80.0 or higher.
- **OS:** Windows, macOS, and Linux supported.

---

## 📄 License

This extension is licensed under the [MIT License](LICENSE).

---

**Developed with ❤️ by the Rust community, for the Rust community.**
