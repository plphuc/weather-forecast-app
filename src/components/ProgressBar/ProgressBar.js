import styles from './ProgressBar.module.css';

function ProgressBar(props) {
  const {humidityPct, progressBarHeight} = {...props}
  return (
    <div className={styles.wrapper}>
      <div className={styles.percentageNumb}>
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
      <div className={styles.container} style={{height: progressBarHeight}}>
        <div style={{width: humidityPct + "%"}} className={styles.pastProgress}></div>
      </div>
      <div className={styles.percentageChar}>
        <span>%</span>
      </div>
    </div>
  );
}

export default ProgressBar;
