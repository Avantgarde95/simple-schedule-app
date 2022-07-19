import { ComponentProps } from "react";
import NextLink from "next/link";

type LinkProps = ComponentProps<"a">;

const Link = ({ href, ...others }: LinkProps) => (
  <NextLink href={href ?? ""}>
    <a target="_blank" rel="noopenner noreferrer" {...others} />
  </NextLink>
);

export default Link;
