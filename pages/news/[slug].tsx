import React from "react";
import { getNewsPageSingle } from "../../lib/contentful/pages/news";
import { getArticlePathsToPreRender } from "../../lib/contentful/paths";
import { renderRichTextWithImages } from "../../lib/rich-text";
import { ArticleInterface } from "../../types/shared";
import SinglePage from "../../views/SinglePage";
import Tag from "../../components/Tag";
import dayjs from "dayjs";
import TitleBox from "../../components/TitleBox";

type ArticleProps = {
  article: ArticleInterface;
  preview: boolean;
  relatedArticles?: ArticleInterface[];
};

export default function Article({
  article,
  preview,
  relatedArticles,
}: ArticleProps) {
  const {
    articleType,
    subtitle,
    coverImage,
    title,
    slug,
    date,
    author,
    city,
    content,
  } = article;

  return (
    <SinglePage
      coverImage={coverImage.url}
      coverImageAlt={title}
      withBackButton
      title={title}
    >
      <TitleBox
        boxText={dayjs(date).format("DD MMM YYYY")}
        title={title}
        slug={`news/${slug}`}
      >
        <div className="container max-w-5xl mx-auto">
          <div className="mb-6 mt-6 md:mt-0">
            <div className="flex md:inline-flex mb-4 md:mb-0 mr-6">
              <Tag text={city.name} color="black" />
              <Tag text={articleType} transparent />
            </div>
            {date && (
              <p className="hidden md:inline-block mb-0 font-sans font-semibold tracking-wide text-lg">
                {dayjs(date).format("ddd DD MMMM YYYY @ HH") + "H"}
              </p>
            )}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl lg:pt-6 mb-4 font-heading md:mr-36 lg:mr-40">
            {title}
          </h1>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
            By <span className="border-b-2 border-black ">{author.name}</span>
          </h2>
        </div>
      </TitleBox>
      <section className="container max-w-5xl mx-auto rich-text py-6 md:py-8 mb-24">
        <p className="font-bold">{subtitle}</p>
        {content && renderRichTextWithImages(content)}
      </section>
    </SinglePage>
  );
}

export async function getStaticProps({
  params,
  preview = false,
}: {
  params: any;
  preview: boolean;
}) {
  const data = await getNewsPageSingle(params.slug, preview);

  return {
    props: { preview, ...data },
    revalidate: 60 * 60,
  };
}

export async function getStaticPaths() {
  const paths = await getArticlePathsToPreRender();

  return { paths, fallback: "blocking" };
}
