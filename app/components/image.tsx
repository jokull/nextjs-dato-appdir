"use client";

import { type ComponentProps } from "react";
import { Image as DatoImage } from "react-datocms/image";

export function Image(
  props: ComponentProps<typeof DatoImage> & { alt?: string }
) {
  return <DatoImage {...props} />;
}
