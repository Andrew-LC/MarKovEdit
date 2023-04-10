import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import parse from 'uniorg-parse';
import uniorg2rehype from 'uniorg-rehype';
import katex from 'rehype-katex';
import highlight from 'rehype-highlight';

async function convertMDtoHTML(value: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(highlight)
    .use(rehypeStringify)
    .process(value)

  return String(file)
}


async function convertORGtoHTML(value: string) {
  const file = await unified()
    .use(parse)
    .use(uniorg2rehype)
    .use(katex)
    .use(rehypeStringify)
    .process(value)

  return String(file)
}


export { convertMDtoHTML, convertORGtoHTML }
