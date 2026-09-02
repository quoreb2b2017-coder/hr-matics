import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About - HRmatics",
  description:
    "HRmatics is a digital publication covering news and analysis for HR leaders and people operations teams.",
};

export default function Page() {
  return (
    <>
      <SiteHeader />
      <div className="wrap">
        <div className="thero">
          <span className="kicker k">About</span>
          <h1>Intelligence for the people who run people operations</h1>
          <p>
            HRmatics is a digital publication covering the news, policy, and
            practice shaping modern HR — written for CHROs, people ops leaders,
            talent and rewards teams, and the operators around them.
          </p>
        </div>
      </div>

      <div className="wrap">
        <div className="body-grid" style={{ gridTemplateColumns: "1fr 340px" }}>
          <main className="prose" style={{ maxWidth: "none", fontSize: "19px" }}>
            <p className="lede">
              HRmatics exists to help HR leaders make better decisions with less
              noise. We cover what actually moves people operations —
              compliance, talent, total rewards, HR technology, culture, and
              leadership — and we translate complex developments into clear,
              useful analysis.
            </p>
            <h2 id="standards">Editorial standards</h2>
            <p>
              Our journalism is independent. We separate reporting from
              sponsored content, label partner material clearly, and hold
              studio-produced resources to the same accuracy standards as our
              newsroom. When we get something wrong, we correct it transparently.
            </p>
            <h2>What we cover</h2>
            <p>
              Employment law and compliance; talent acquisition and workforce
              planning; total rewards and benefits; HR analytics and systems;
              culture and employee experience; and the evolving role of the HR
              leader.
            </p>
            <h2 id="advertise">Reach our audience</h2>
            <p>
              HRmatics reaches people-ops decision-makers actively researching
              solutions for their teams. We help partners connect with that
              audience through sponsored content, custom research, webinars, and
              lead-generation programs — all produced to editorial standard and
              delivered with clear consent. To explore a partnership, get in
              touch below.
            </p>
            <h2 id="contact">Contact</h2>
            <p>
              Editorial:{" "}
              <a href="mailto:editorial@hrmatics.com">editorial@hrmatics.com</a>
              <br />
              Advertising &amp; partnerships:{" "}
              <a href="mailto:partners@hrmatics.com">partners@hrmatics.com</a>
            </p>
          </main>
          <aside className="side">
            <div className="box nlbox" id="nl">
              <div className="bh">The HRmatics Brief</div>
              <div className="bb">
                <p>People-ops news worth your five minutes, every weekday.</p>
                <form className="js-fake-subscribe" data-source="about">
                  <input
                    type="email"
                    name="email"
                    placeholder="Work email"
                    required
                  />
                  <button className="btn btn-solid" type="submit">
                    Sign up
                  </button>
                  <p className="consent">
                    By signing up you agree to our Terms and Privacy Policy.
                  </p>
                </form>
              </div>
            </div>
            <div className="promo">
              <span className="tg">For partners</span>
              <h4>Advertise with HRmatics</h4>
              <p>Reach HR leaders actively evaluating solutions.</p>
              <a
                href="mailto:partners@hrmatics.com"
                className="btn btn-ghost"
              >
                Get in touch →
              </a>
            </div>
          </aside>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
