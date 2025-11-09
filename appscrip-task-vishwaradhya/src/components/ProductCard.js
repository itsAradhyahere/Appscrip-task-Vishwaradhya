// src/components/ProductCard.js
import styles from "../styles/Home.module.css";

export default function ProductCard({ product }) {
  // create an SEO friendly filename fallback using title words (only used if saved locally)
  const altText = product.title;

  return (
    <article className={styles.card} aria-labelledby={`p-${product.id}`}>
      <div className={styles.imageWrap}>
        <img
          src={product.image}
          alt={altText}
          className={styles.productImg}
          loading="lazy"
        />
      </div>

      <h3 id={`p-${product.id}`} className={styles.cardTitle}>
        {product.title}
      </h3>

      <p className={styles.price}>${Number(product.price).toFixed(2)}</p>
    </article>
  );
}
