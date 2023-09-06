import styles from './HighlightCard.module.css'

function HighlightCard(props) {
  const {title, children} = props
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{title}</span>
      <div className={styles.childrenWrapper}>{children}</div>
    </div>
  );
}

export default HighlightCard;