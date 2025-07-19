# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript project called "js_realtor_mcp" that implements a minimal MCP (Model Context Protocol) server using the fastmcp library. The project mirrors the API of the adjacent Python realtor_mcp server but instead of creating a database or embedding text queries locally, it makes calls to a remote server to return results.

## Development Commands

### Environment Setup

- `npm install` - Install project dependencies
- `npm run build` - Build the TypeScript code
- `npm run dev` - Run the server in development mode with auto-reload

### Testing

- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage reports

### Code Quality

- `npm run lint` - Run ESLint for code linting
- `npm run lint:fix` - Auto-fix linting issues
- `npm run typecheck` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Project Structure

```
src/
├── index.ts          # Main MCP server entry point
├── tools/            # MCP tool implementations
│   └── property-search.ts
├── types/            # TypeScript type definitions
│   └── property.ts
└── utils/            # Utility functions
    └── remote-api.ts
```

## API Specification

### Tools

#### property_search

Search for real estate properties via spatial, semantic, or hybrid search by calling a remote API.

**Parameters:**

- `query` (string): Query listing desired property style and amenities
- `search_mode` (string, default: "hybrid"): Search mode - 'spatial', 'semantic', or 'hybrid'
- `min_beds` (number, default: 0): Minimum number of bedrooms
- `min_baths` (number, default: 0): Minimum number of bathrooms
- `min_sqft` (number, default: 0): Minimum square footage
- `max_price` (number, default: Infinity): Maximum price
- `search_center_latitude` (number | null): Latitude for search center (required for spatial search)
- `search_center_longitude` (number | null): Longitude for search center (required for spatial search)
- `search_radius` (number, default: 5): Search radius in miles from center
- `limit` (number, default: 20): Maximum number of properties to return

**Returns:** JSON string containing array of property objects with fields:

- `id`, `beds`, `full_baths`, `half_baths`, `sqft`, `latest_price`
- `full_address`, `city`, `types`, `sub_types`, `styles`, `description`, `images`

## Remote API Integration

The server calls a remote realtor API endpoint instead of querying a local database. The remote API should:

- Accept the same parameters as the local Python implementation
- Return results in the same JSON format
- Handle spatial, semantic, and hybrid search modes
- Apply the same filtering logic (beds, baths, sqft, price)

## Code Style and Quality

### TypeScript Configuration

- **Target**: ES2022
- **Module**: CommonJS for Node.js compatibility
- **Strict**: Enabled for type safety
- **Source Maps**: Enabled for debugging

### Linting and Formatting

- **ESLint**: TypeScript-aware linting with recommended rules
- **Prettier**: Code formatting with consistent style
- **Line length**: 100 characters
- **Quote style**: Double quotes for strings
- **Semicolons**: Required

### Dependencies

- **fastmcp**: Core MCP server framework
- **zod**: Schema validation for tool parameters
- **axios**: HTTP client for remote API calls
- **@types/node**: Node.js type definitions

## Development Notes

- The server uses fastmcp's TypeScript framework for MCP protocol handling
- Zod schemas validate all tool parameters before execution
- Error handling includes validation errors and remote API failures
- The server can run via stdio transport for Claude integration
- All type annotations and descriptions match the Python realtor_mcp server for consistency
