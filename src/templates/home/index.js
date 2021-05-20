import { Button, Layout } from "components/common";
import React, { useContext } from "react";
import LatestBlogs from "./components/latest-blogs";
import { graphql, Link } from "gatsby";
import Col from "components/Col";

const Home = ({ data }) => {
  const { posts, markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  const postEdges = posts.edges;

  const Image = frontmatter.featuredImage;

  return (
    <Layout title={frontmatter.title}>
      <Col columns={2} sm={1} lg={2} md={2}>
        <div className="description">
          <h1>{frontmatter.title}</h1>
          <p>{frontmatter.tagline}</p>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <Link to={frontmatter.cta.ctaLink}>
            <Button type="primary">{frontmatter.cta.ctaText}</Button>
          </Link>
        </div>
        {Image && (
          <div className="featured-image">
            <img src={Image} alt={frontmatter.title} />
          </div>
        )}
      </Col>

      <LatestBlogs postEdges={postEdges} />
    </Layout>
  );
};

export default Home;

export const listingQuery = graphql`
  query HomePageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        tagline
        featuredImage
        cta {
          ctaText
          ctaLink
        }
      }
    }
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      limit: 4
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 140)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            cover
          }
          fields {
            slug
            date
          }
        }
      }
    }
  }
`;
