import React from "react";
import styles from "../styles/individual.module.css";
import { User } from "lucide-react";
import { Calendar } from "lucide-react";
import { Phone } from "lucide-react";
import { Trophy } from "lucide-react";

const IndividualEvent = ({
  eventName,
  description,
  dateTime,
  members,
  contactName,
  contactNumber,
  pricePerPerson,
  firstPrize,
  secondPrize,
  cardImage,
  coinImages,
}) => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.menuIcon}>☰</div>
        <h1 className={styles.logo}>PRAGATI</h1>
        <div className={styles.profileIcon}>
          <User />
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.leftSection}>
          <img src={cardImage} alt="Event Poster" className={styles.cardImage} />
          <div className={styles.loginButtonContainer}>
            <button className={styles.registerButton}>Login to Register!</button>
          </div>

        </div>
        <div className={styles.rightSection}>
          
          <h2 className={styles.eventTitle}>
            <span>{eventName.split(" ")[0]}</span>
            <br />
            <span>{eventName.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className={styles.descriptionTitle}>Description</p>
          <p className={styles.description}>{description}</p>

          <div className={styles.eventDetails}>
            <p>
              <Calendar /> {dateTime}
            </p>
            <p>
              <User /> Members: {members}
            </p>
            <p>
              <Phone /> Contact: {contactName} - {contactNumber}
            </p>
          </div>
          
          <div className={styles.coinAndPrice}>
            <div className={styles.coinContainer}>
              {coinImages.map((coin, index) => (
                <img
                  key={index}
                  src={coin}
                  alt={`Coin ${index + 1}`}
                  className={styles.coin}
                />
              ))}
            </div>
            <div className={styles.priceContainer}>
              ₹<span className={styles.price}>{pricePerPerson}</span> <br></br>per person
            </div>
          </div>
        </div>
      </main>

      <div className={styles.secondaryActions}>
        <button className={styles.detailsButton}>Details</button>
        <button className={styles.rulesButton}>Rules</button>
      </div>

      <div className={styles.prizes}>
        <div className="flex justify-start items-center gap-10 mt-5 ml-10">
          <div className="flex flex-col items-center text-center">
            <Trophy className="text-yellow-400"size={80} />
            <p  className="mt-1 text-sm font-bold text-white">
              1st Prize: <br /> ₹{firstPrize}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Trophy className="text-gray-300" size={80} />
            <p  className="mt-1 text-sm font-bold text-white">
              2nd Prize: <br /> ₹{secondPrize}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualEvent;
