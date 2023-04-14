import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from 'rehype-raw';
import parse from 'uniorg-parse';
import uniorg2rehype from 'uniorg-rehype';
import katex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';


async function convertMDtoHTML(value: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight, { ignoreMissing: true, detect: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(value)

  console.log(file.toString())
  return file.toString()
}



async function convertORGtoHTML(value: string) {
  const file = await unified()
    .use(parse)
    .use(uniorg2rehype)
    .use(rehypeHighlight, { ignoreMissing: true, detect: true })
    .use(katex)
    .use(rehypeStringify)
    .process(value)

  return String(file)
}


export { convertMDtoHTML, convertORGtoHTML }
