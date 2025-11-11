import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Header from "../src/components/Header";
import ProductCard from "../src/components/ProductCard";
import Footer from "../src/components/Footer";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }, [products, query]);

  return (
    <>
      <Head>
        <title>Appscrip — Product Listing</title>
      </Head>

      <Header onSearch={(v) => setQuery(v)} searchValue={query} />

      <main className={styles.main}>
        <h1 className={styles.h1}>Product Listing</h1>
        <h2 className={styles.h2}>Showing {filtered.length} products</h2>

        <section className={styles.grid}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
