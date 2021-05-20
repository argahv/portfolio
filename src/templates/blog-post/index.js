import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import { Container, Layout } from "components/common";
import UserInfo from "components/UserInfo/UserInfo";
import Disqus from "components/Disqus/Disqus";
import PostTags from "components/PostTags/PostTags";
import SocialLinks from "components/SocialLinks/SocialLinks";
import SEO from "components/SEO/SEO";
import config from "../../../data/SiteConfig";
import Toc from "components/Toc";
import moment from "moment";

export default function PostTemplate({ data, pageContext }) {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <Toc post={postNode.tableOfContents} />
        <div>
          <Container>
            <h1>{post.title}</h1>
            <p style={{ fontSize: 18, lineHeight: 1.7 }}>
              {moment(post.date).format(config.dateFormat)}
            </p>
            {post.cover && (
              <div style={{ width: "75%", height: "auto", margin: "auto" }}>
                <img src={post.cover} alt={post.title} />
              </div>
            )}
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          </Container>
          <div className="post-meta">
            <PostTags tags={post.tags} />
            <SocialLinks postPath={slug} postNode={postNode} />
          </div>
          <UserInfo config={config} />
          <Disqus postNode={postNode} />
        </div>
      </div>
    </Layout>
  );
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      tableOfContents
      frontmatter {
        title
        cover
        date
        category
        tags
      }
      fields {
        slug
        date
      }
    }
  }
`;
