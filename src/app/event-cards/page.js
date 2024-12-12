<<<<<<< HEAD
import EventCards from "./components/EventCards";
=======
import EventCards from "./components/EvenCards";
>>>>>>> a20b8df4edb95de3de5d6458c67eebe368e31758

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
