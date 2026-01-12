import styles from './Illustration.module.css';

const Illustration = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Placeholder for the illustration */}
        <div className={styles.imagePlaceholder}>
           <img 
            src="/illustration.png" 
            alt="Inventory Illustration" 
            className={styles.image} 
            onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='flex'}}
           />
           <div className={styles.fallback}>
             <span>Inventory Artwork</span>
           </div>
        </div>
        <h2 className={styles.title}>Organize Everything</h2>
        <p className={styles.description}>
          Keep track of your belongings, warranties, and important documents all in one secure place.
        </p>
      </div>
    </div>
  );
};

export default Illustration;
