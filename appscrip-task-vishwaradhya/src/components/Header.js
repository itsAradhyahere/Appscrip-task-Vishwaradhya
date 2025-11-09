// src/components/Header.js
import styles from "../styles/Home.module.css";

export default function Header({ onSearch = () => {}, searchValue = "" }) {
  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        {/* Put a logo at public/images/logo.png (optional) */}
        <img src="/images/logo.png" alt="Appscrip Logo" className={styles.logo} onError={(e)=>{e.target.style.display='none'}} />
        <div>
          <h1 className={styles.siteTitle}>Appscrip Store</h1>
        </div>
      </div>

      <div className={styles.headerRight}>
        <nav className={styles.nav}>
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">About</a>
        </nav>

        <div className={styles.searchWrap}>
          <label htmlFor="search" className="sr-only">Search products</label>
          <input
            id="search"
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            className={styles.searchInput}
            placeholder="Search products, category, or description..."
            aria-label="Search products"
          />
        </div>
      </div>
    </header>
  );
}
