import "dotenv/config";
import { defineConfig, env } from "prisma/config";

//this configuration file is new introduction to this version and it's recommended approach which requires to remove url property from datasource db in schema.prisma. But removing that doesn't allow npx prisma studio to work so keeping it as it is. this version 6.18 is in transition phase so.

export default defineConfig({
  schema: "prisma/schema.prisma",
  engine: "classic", //for silencing depricaton error for url in schema.prisma
  migrations: {
    path: "prisma/migrations",
    // seed: 'tsx prisma/seed.ts'
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
