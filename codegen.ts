import type { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";

dotenv.config();

const config: CodegenConfig = {
  schema: {
    "https://graphql.datocms.com": {
      headers: {
        "Content-Type": "application/json",
        "X-Exclude-Invalid": "true",
        Accept: "application/json",
        Authorization: `Bearer ${
          process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN ?? ""
        }`,
      },
    },
  },
  documents: "app/**/*.gql",
  overwrite: true,
  generates: {
    "dato.ts": {
      hooks: { afterOneFileWrite: ["prettier --write"] },
      config: {
        scalars: {
          BooleanType: "boolean",
          CustomData: "Record<string, string>",
          Date: "string",
          DateTime: "string",
          FloatType: "number",
          IntType: "number",
          ItemId: "string",
          JsonField: "StructuredTextScalar",
          MetaTagAttributes: "Record<string, string>",
          UploadId: "string",
        },
      },
      plugins: [
        {
          typescript: {
            useImplementingTypes: true,
            enumsAsTypes: true,
            pureMagicComment: true,
          },
        },
        { "typescript-generic-sdk": {} },
        {
          "typescript-operations": {
            useTypeImports: true,
            dedupeFragments: true,
            exportFragmentSpreadSubTypes: true,
            namingConvention: "keep",
            defaultScalarType: "unknown",
          },
        },
      ],
    },
    "dato.graphql": {
      plugins: ["schema-ast"],
    },
  },
};
export default config;
