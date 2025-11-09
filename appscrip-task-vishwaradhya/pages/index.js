// src/pages/index.js
import Head from "next/head";
import { useState, useMemo } from "react";
import Header from "../src/components/Header";
import ProductCard from "../src/components/ProductCard";
import Footer from "../src/components/Footer";
import styles from "../styles/Home.module.css";

/**
 * Server-side fetch of products for SSR
 */
export async function getServerSideProps() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    return { props: { products } };
  } catch (err) {
    console.error("SSR fetch error:", err);
    return { props: { products: [] } };
  }
}

export default function Home({ products }) {
  const [query, setQuery] = useState("");

  // Filtered list (client-side) - memoized
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
    );
  }, [products, query]);

  return (
    <>
      <Head>
        <title>Appscrip — Product Listing</title>
        <meta
          name="description"
          content="Appscrip Product Listing Page — responsive PLP built using Next.js with server-side rendering."
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="Appscrip, product listing, e-commerce, Next.js, SSR" />
        {/* Basic JSON-LD ProductCollection schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Appscrip Product Listing",
              "description": "A demo product listing created for Appscrip assignment",
              "itemListElement": products.slice(0, 10).map((p, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "url": typeof window !== "undefined" ? window.location.href : "https://example.com/",
                "item": {
                  "@type": "Product",
                  "name": p.title,
                  "image": p.image,
                  "description": p.description,
                  "sku": p.id,
                  "brand": p.category,
                  "offers": {
                    "@type": "Offer",
                    "price": String(p.price),
                    "priceCurrency": "USD"
                  }
                }
              }))
            })
          }}
        />
      </Head>

      <Header onSearch={(v) => setQuery(v)} searchValue={query} />

      <main className={styles.main}>
        <h1 className={styles.h1}>Product Listing</h1>
        <h2 className={styles.h2}>
          Showing {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </h2>

        <section className={styles.grid} aria-live="polite">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
