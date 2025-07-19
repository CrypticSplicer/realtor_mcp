import { FastMCP } from "fastmcp";

import { PropertySearchSchema, searchProperties } from "./property-search.js";

const server = new FastMCP({
  name: "Realtor MCP",
  version: "1.0.0",
});

server.addTool({
  annotations: {
    openWorldHint: true, // This tool interacts with external API
    readOnlyHint: true, // This tool doesn't modify anything
    title: "Property Search",
  },
  description:
    "Search for a real estate property via spatial, semantic, or hybrid search",
  execute: async (args) => {
    return await searchProperties(args);
  },
  name: "property_search",
  parameters: PropertySearchSchema,
});

server.start({
  transportType: "stdio",
});
