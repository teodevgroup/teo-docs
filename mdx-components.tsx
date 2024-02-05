import type { MDXComponents } from "mdx/types"
import { Aside, Div, H2, H3, H4, H5, H6, Pre } from "./src/shared/components/Documentation";

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    aside: (props: any) => <Aside {...props} />,
    pre: (props: any) => <Pre {...props} />,
    div: (props: any) => <Div {...props} />,
    h2: (props: any) => <H2 {...props} />,
    h3: (props: any) => <H3 {...props} />,
    h4: (props: any) => <H4 {...props} />,
    h5: (props: any) => <H5 {...props} />,
    h6: (props: any) => <H6 {...props} />,
    ...components,
  };
}