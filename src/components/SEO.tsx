import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  schema?: any;
  canonical?: string;
}

export const SEO = ({ title, description, schema, canonical }: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={`https://www.myquicktrippers.com${canonical}`} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={`https://www.myquicktrippers.com${canonical}`} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {schema && (
        <script type="application/ld+json">
          {typeof schema === 'string' ? schema : JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
