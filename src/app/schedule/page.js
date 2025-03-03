"use client";

import Footer from "../components/footer";
import Navbar from "../components/navbar";
import ScheduleBooklet from "../components/schedule";

export default function SchedulePage() {
  return (
    <div>
      <Navbar />
      <div className="mt-16 mb-8">
        <ScheduleBooklet
          leftImage={
            "https://ga4uaouwxu.ufs.sh/f/s7BvCMQMnrE66IsqkGpNyUnoRXYhjMKlwBGLab1rIAsF3CDz"
          }
          rightImage={
            "https://ga4uaouwxu.ufs.sh/f/s7BvCMQMnrE6L798ODzIsde5xChk29Q6Nz1UyWKHjbu4RMOB"
          }
        />
      </div>
      <Footer />
    </div>
  );
}
