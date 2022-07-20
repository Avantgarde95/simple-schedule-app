import { ComponentProps } from "react";
import NextLink from "next/link";

type LinkProps = ComponentProps<"a">;

/**
 * Wrapper of Next.js Link, which can be styled by using Emotion.
 */
const Link = ({ href, children, ...others }: LinkProps) => (
  <NextLink href={href ?? ""}>
    <a target="_blank" rel="noopenner noreferrer" {...others}>
      {children}
    </a>
  </NextLink>
);

export default Link;
