import { gql } from "@apollo/client";

export const ALL_POST_SLUGS = gql`
  query AllPostSlugs {
    posts(first: 100, where: { status: PUBLISH }) {
      nodes { slug }
    }
  }
`;

export const POST_BY_SLUG = gql`
  query PostBySlug($slug: ID!, $asPreview: Boolean = false) {
    post(id: $slug, idType: SLUG, asPreview: $asPreview) {
      title
      content
      date
      featuredImage { node { sourceUrl altText } }
      #seo: seo { title metaDesc } # if using Yoast + WPGraphQL SEO
    }
  }
`;

export const HOMEPAGE_POSTS = gql`
  query HomePosts {
    posts(first: 10, where: { status: PUBLISH, orderby: { field: DATE, order: DESC }}) {
      nodes { slug title date excerpt }
    }
  }
`;