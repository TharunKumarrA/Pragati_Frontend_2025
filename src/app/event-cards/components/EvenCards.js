import Image from "next/image";
import styles from "../styles/EventCard.module.css";

const EventCards = ({ title, date, type, price, image, symbols }) => {
  const [firstPart, secondPart] = title.split(" Arena");

  return (
    <div className={styles.eventCard}>
      <div className={styles.cardImage}>
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
        <div className={styles.symbols}>
          {symbols.map((symbol, index) => (
            <Image
              key={index}
              src={symbol}
              alt={`symbol-${index}`}
              width={50}
              height={50}
            />
          ))}
        </div>
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles.title}>
          {firstPart} <br /> Arena
        </h2>
        <div className={styles.eventDetails}>
          <div className={styles.eventInfo}>
            <p>📅 {date}</p>
            <p>👤 {type}</p>
          </div>
          <div>
            <p className={styles.price}>{price}</p>
          </div>
        </div>
        <p className={styles.gstText}>Incl. of GST</p>
      </div>
    </div>
  );
};

export default EventCards;
