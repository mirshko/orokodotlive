import React from "react";
import SinglePage from "../views/SinglePage";
import TitleBox from "../components/TitleBox";
import { InferGetStaticPropsType } from "next";
import { getSupportPage } from "../lib/contentful/pages/support";
import { renderRichTextWithImages } from "../lib/rich-text";

export async function getStaticProps({ preview = false }) {
  return {
    props: { preview, ...(await getSupportPage(preview)) },
    revalidate: 60 * 60,
  };
}

export default function Support({
  preview,
  title,
  subtitle,
  coverImage,
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <SinglePage
      coverImage={coverImage.url}
      coverImageAlt="View"
      repeatCover={false}
      title="Support"
    >
      <TitleBox bgColor="green" title={title} slug="support" boxText="Support">
        <div className="container max-w-5xl mx-auto">
          <p className="hidden md:block mb-4 ml-0.5 font-sans font-semibold tracking-wide text-xl lg:text-2xl">
            Support
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 font-heading heading-leading md:mr-36">
            {title}
          </h1>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl md:mr-36">
            {subtitle}
          </h2>
        </div>
      </TitleBox>
      <section className="container max-w-5xl mx-auto rich-text py-6 md:py-8 mb-24">
        {renderRichTextWithImages(content)}
      </section>
    </SinglePage>
  );
}
