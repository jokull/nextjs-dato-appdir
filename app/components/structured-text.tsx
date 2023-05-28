"use client";

import { type ComponentProps } from "react";
import type {} from "react-datocms/structured-text";
import {
  StructuredText as DatoStructuredText,
  type StructuredTextGraphQlResponse,
} from "react-datocms/structured-text";
import { type ArticleQuery } from "~/cms/dato";
import { Image } from "~/components/image";

type ImageRecord = NonNullable<NonNullable<NonNullable<ArticleQuery["article"]>["body"]>["blocks"][0]>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ImageStructuredText = StructuredTextGraphQlResponse<ImageRecord, any>;

type Props = Omit<ComponentProps<typeof DatoStructuredText>, "data" | "renderBlock"> & {
  data: ImageStructuredText;
};

export function StructuredText({ data, ...props }: Props) {
  return (
    <DatoStructuredText
      data={data}
      renderBlock={({ record }) => {
        switch (record.__typename) {
          case "ImageRecord":
            if (!record.image?.responsiveImage) return null;
            return <Image data={record.image.responsiveImage} />;
          default:
            return null;
        }
      }}
      {...props}
    />
  );
}
