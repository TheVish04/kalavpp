# Security & SQL Injection Prevention

## SQL Injection Prevention

This project uses **Supabase** (PostgreSQL) as the backend. All database access goes through the Supabase JavaScript client, which uses **parameterized queries** by default. User input is never concatenated into raw SQL.

### Safe Patterns

- **`.eq('column', value)`** – Values are passed as parameters
- **`.insert([object])`** – Object values are escaped
- **`.update(object)`** – Object values are escaped
- **`.select('*')`** – No user input in query structure

### Input Sanitization

For defense-in-depth, user-provided text is sanitized before being sent to Supabase:

- **`sanitizeString(val, max)`** – Trims and limits length (default 500 chars)
- **`sanitizeText(val, max)`** – Same for longer text (default 5000 chars)

Used in: `AddressesTab`, `ServiceRequestForm`, `ProfileForm`, and similar forms.

### Recommendation

- Never use `supabase.rpc()` with raw SQL built from user input
- Always use `.eq()`, `.filter()`, `.insert()`, `.update()` with parameterized values
- Sanitize user input before display (XSS prevention) and before DB writes
