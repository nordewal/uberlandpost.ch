import path from 'path';
import { defineCollection, z } from 'astro:content';

const glob = import.meta.glob('./**'); /* vite */
export const collectionNames = Object.keys(glob).map((filepath) => path.basename(path.dirname(filepath)));


const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		date: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		image: z.any().optional(),
	}),
});

export const collections = { blog };
