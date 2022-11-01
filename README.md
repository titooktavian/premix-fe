## Requirements

NodeJS version >= 16.3.0

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Make a Components

1. Open ./components directory at the root of your project directory.
2. Create a directory with your component name. Example: Button.
3. Inside that new directory create a new .jsx file and give the file name the same as the directory name. In this case Button.jsx.
4. Open index.js file at ./components directory.
5. Add this code at the end of the line
   ```
   export { default as Button } from "./Button/Button";
   ```
6. In this case if you want to import the component from ./pages/index.js that stands for Home page. Start using this component accross the project by only using this simple code.
   ```
   import { Button } from "components";
   ```

## How to Make a Page

1. Open ./pages directory at the root of your project directory.
2. Create a folder with your page name. Example: product. And create index.js file inside product folder.
3. Open index.js file at ./pages/product directory, then add this code to your file.

   ```
   import Product from "views/Product";

   export default Product;
   ```

4. If you need 'getServerSideProps' add this function before you export at ./pages/product directory.
5. The product page will have component and must be separated in the views folder. Create a folder with your page name. In this case: Product.
6. Open file at ./views/Product/index.js or index.jsx directory, export your product view.

   ```
   const Index = () => {
      return <div>Product</div>;
   }

   export default Index;
   ```
