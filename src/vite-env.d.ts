/// <reference types="vite/client" />

/* Allow importing CSS modules and plain CSS files */
declare module "*.css" {
  const content: string;
  export default content;
}

