import { Metadata } from "next"
import { notFound } from "next/navigation"

import { siteConfig } from "@/config/site"
import { getAllBlockIds, getBlock } from "@/lib/blocks"
import { absoluteUrl, cn } from "@/lib/utils"
import { Style, styles } from "@/registry/styles"

import "@/styles/mdx.css"
import "public/registry/themes.css"
import { BlockWrapper } from "@/components/block-wrapper"

export async function generateMetadata({
  params,
}: {
  params: {
    style: Style["name"]
    name: string
  }
}): Promise<Metadata> {
  const { name, style } = params
  const block = await getBlock(name, style)

  if (!block) {
    return {}
  }

  return {
    title: block.name,
    description: block.description,
    openGraph: {
      title: block.name,
      description: block.description,
      type: "article",
      url: absoluteUrl(`/blocks/${block.name}`),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: block.name,
      description: block.description,
      images: [siteConfig.ogImage],
      creator: "@shadcn",
    },
  }
}

export async function generateStaticParams() {
  const blockIds = await getAllBlockIds()
  return styles
    .map((style) =>
      blockIds.map((name) => ({
        style: style.name,
        name,
      }))
    )
    .flat()
}

export default async function BlockPage({
  params,
}: {
  params: {
    style: Style["name"]
    name: string
  }
}) {
  const { name, style } = params
  const block = await getBlock(name, style)

  if (!block) {
    return notFound()
  }

  const Component = block.component

  const chunks = block.chunks?.map((chunk) => ({ ...chunk }))

  delete block.component
  block.chunks?.map((chunk) => delete chunk.component)

  return (
    <BlockWrapper
      block={block}
      className={cn(block.container?.className || "", "theme-zinc")}
    >
      <Component />
      {chunks?.map((chunk) => (
        <chunk.component key={chunk.name} />
      ))}
    </BlockWrapper>
  )
}
