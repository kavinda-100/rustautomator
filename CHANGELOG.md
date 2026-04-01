# Change Log

All notable changes to the "rustautomator" extension will be documented in this file.

## [0.2.0] - 2026-04-01

### Added

- **Code Snippets**: Added production-ready boilerplate for common Rust patterns.
    - `pafn`: Public async function with Result return type.
    - `strimp`: Struct with Debug/Clone derives and a static `new()` constructor.
    - `axh`: Complete Axum route handler with state and JSON extractors.
    - `matchr`: Verbose result matching with built-in error logging.
    - `tmod` & `tfn`: Async test modules and functions using `tokio::test`.
- **Visual Documentation**: Added GIF demonstrations to the README for better onboarding.

## [0.1.0] - 2026-03-31

### Added

- Initial release.
- **Smart Module Creation**: Automated `mod.rs` generation and entry-point injection.
- **Live File Watcher**: Automatic `pub mod` registration for new `.rs` files.
