import { Helmet } from "react-helmet-async";
import {
  SITE_URL,
  DEFAULT_OG_IMAGE,
  formatSeoTitle,
  formatSeoDescription,
  resolveImageUrl,
  combineSchemas,
} from "@/lib/seo";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  schema?: object | object[] | string;
  canonical?: string;
  /** Raw title without auto brand suffix or truncation */
  rawTitle?: boolean;
  noindex?: boolean;
}

export const SEO = ({
  title,
  description,
  image,
  schema,
  canonical,
  rawTitle = false,
  noindex = false,
}: SEOProps) => {
  const pageTitle = rawTitle ? title : formatSeoTitle(title);
  const metaDescription = formatSeoDescription(description);
  const canonicalPath = canonical ?? "/";
  const canonicalUrl =
    canonicalPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`;
  const ogImage = resolveImageUrl(image);

  const schemaScript =
    schema === undefined
      ? undefined
      : typeof schema === "string"
        ? schema
        : Array.isArray(schema)
          ? combineSchemas(...schema)
          : combineSchemas(schema);

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${title} — MyQuickTrippers India tours`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="MyQuickTrippers" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      {schemaScript && (
        <script type="application/ld+json">{schemaScript}</script>
      )}
    </Helmet>
  );
};
