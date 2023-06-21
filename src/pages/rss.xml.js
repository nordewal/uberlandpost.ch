import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';


export async function get(context) {
  const blog = await getCollection('blog');

  return rss({
    title: 'überlandpost.ch',
    description: 'Blog von überlandpost.ch',
    site: context.site,
    items: blog.map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.title,
        link: `/blog/${post.slug}/`,
      })),
  });
}