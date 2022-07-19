import { ComponentProps } from "react";
import NextLink from "next/link";

type LinkProps = ComponentProps<"a">;

const Link = ({ href, children, ...others }: LinkProps) => (
  <NextLink href={href ?? ""}>
    <a target="_blank" rel="noopenner noreferrer" {...others}>
      {children}
    </a>
  </NextLink>
);

export default Link;
