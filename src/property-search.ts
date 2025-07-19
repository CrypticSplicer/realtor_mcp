import axios from "axios";
import { z } from "zod";

const PropertySearchSchema = z.object({
  limit: z
    .number()
    .positive()
    .default(20)
    .describe("The maximum number of properties to return"),
  max_price: z
    .number()
    .positive()
    .default(Infinity)
    .describe("Maximum price of properties to return"),
  min_baths: z
    .number()
    .min(0)
    .default(0)
    .describe(
      "Return properties with a number of baths greater than or equal to this number",
    ),
  min_beds: z
    .number()
    .min(0)
    .default(0)
    .describe(
      "Return properties with a number of bedrooms greater than or equal to this number",
    ),
  min_sqft: z
    .number()
    .min(0)
    .default(0)
    .describe(
      "Return properties with a square footage greater than or equal to this number",
    ),
  query: z
    .string()
    .describe(
      "A short and concise description of desired apartment amenities and other intangibles. Don't include traits like number of bedrooms that are covered by other search parameters. Don't include amenities or intangibles the user wants to avoid.",
    ),
  search_center_latitude: z
    .number()
    .nullable()
    .default(null)
    .describe(
      "Optional float latitude for search center. Should always be set if longitude is set",
    ),
  search_center_longitude: z
    .number()
    .nullable()
    .default(null)
    .describe(
      "Optional float longitude for search center. Should always be set if latitude is set",
    ),
  search_radius: z
    .number()
    .positive()
    .default(5)
    .describe(
      "Return properties within this distance (in miles) from the search center",
    ),
});

export type PropertySearchParams = z.infer<typeof PropertySearchSchema>;

export async function searchProperties(
  params: PropertySearchParams,
): Promise<string> {
  // Validate that both latitude and longitude are provided together
  if (
    (params.search_center_latitude !== null) !==
    (params.search_center_longitude !== null)
  ) {
    throw new Error(
      "Must provide both search_center_latitude and search_center_longitude if either is set",
    );
  }

  try {
    const response = await axios.get(
      "http://0.0.0.0:3000/properties",
      {
        params: {
          limit: params.limit,
          max_price: params.max_price === Infinity ? null : params.max_price,
          min_baths: params.min_baths,
          min_beds: params.min_beds,
          min_sqft: params.min_sqft,
          query: params.query,
          search_center_latitude: params.search_center_latitude,
          search_center_longitude: params.search_center_longitude,
          search_radius: params.search_radius,
        },
        timeout: 30000, // 30 second timeout
      },
    );

    return JSON.stringify(response.data, null, 2);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          `API Error ${error.response.status}: ${error.response.statusText}`,
        );
      } else if (error.request) {
        throw new Error(
          "No response from API server.",
        );
      }
    }
    throw new Error(
      `Request failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

export { PropertySearchSchema };
