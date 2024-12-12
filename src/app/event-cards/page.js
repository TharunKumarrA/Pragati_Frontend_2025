import EventCards from "./components/EvenCards";

export default function Home() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <EventCards
        title="Athena's Debate Arena"
        date="19th Feb"
        type="Individual"
        price="₹200"
        image="/Images/1a. Athena.png" 
        symbols={["/Images/4b. Demeter.png","/Images/4a. Plutus.png"]}  
      />
    </div>
  );
}
