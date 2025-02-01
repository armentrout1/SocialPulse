import fs from "fs";
import path from "path";
import { globSync } from "glob";

const files = globSync("src/**/*.{ts,tsx,js,jsx}", { absolute: false });
const imports = new Set();

files.forEach((file) => {
  const content = fs.readFileSync(file, "utf-8");
  const matches = content.match(/from ['"](.*?)['"]/g);
  if (matches) {
    matches.forEach((match) => {
      const pkg = match.replace(/from |['"]/g, "");
      if (!pkg.startsWith(".") && !pkg.startsWith("/")) {
        imports.add(pkg);
      }
    });
  }
});

console.log([...imports]);
