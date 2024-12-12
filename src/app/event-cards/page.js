import EventCards from "./components/EventCards";

export default function Home() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <EventCards
        title="Athena's Debate Arena"
        date="19th Feb"
        type="Individual"
        price="₹200"
        image="/Images/backgrounds/owlcard.png" 
        symbols={["/Images/Emblems/4b_demeter.webp","/Images/Emblems/4a_plutus.webp"]}  
      />
    </div>
  );
}
