import PixelCursor from "@/components/PixelCursor";
import Headline from "@/components/Headline";
import VoxelAvatar from "@/components/VoxelAvatar";
import StatBars from "@/components/StatBars";
import Specimens from "@/components/Specimens";
import WorkGrid from "@/components/WorkGrid";
import TerminalEasterEgg from "@/components/TerminalEasterEgg";

export default function Home() {
  return (
    <>
      <PixelCursor />

      <header>
        <div className="prompt">
          <span className="path">elizabeth@sg</span>:~$ whoami
          <span className="caret"></span>
        </div>
        <nav>
          <a href="mailto:ensignpotato@gmail.com">email</a>
          <a href="https://sg.linkedin.com/in/lizabethlee">linkedin</a>
          <a href="https://www.behance.net/lizabethmarielee">behance</a>
          <a href="https://www.instagram.com/luppiesnaps/">photos</a>
          <a href="https://www.instagram.com/itslupiedoodles/">doodles</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">field notes · singapore · est. observation 2020—</p>
          <Headline />
          <div className="lede">
            <p>
              A multidisciplinary designer, creator, engineer and storyteller.
              I like fast proofs-of-concept, the kind that ship in hours, not
              days. If I think something should exist, I build it. An
              interface, a website, a tool, a process.
            </p>
            <p>
              The path here was one question at a time. I started in interior
              design, learning to bring the beautiful spaces in my mind to
              life. Then I thought: <em>why not build websites for my spaces
              to live?</em> So I studied computer science, picking up UI·UX
              and engineering along the way. Then:{" "}
              <em>what if my websites get hacked?</em> So, cybersecurity it
              is! School ended but my passion for learning and building
              didn&rsquo;t. These days I build, test, ship and optimise
              cybersecurity tools whilst exploring what this world has to
              offer, underwater and on land ;)
            </p>
            <p className="locked">
              I&rsquo;m still building my story —{" "}
              <a href="#work">the chapters so far are below</a>.
            </p>
          </div>
        </div>

        <aside className="char-card" aria-label="character sheet">
          <div className="char-head">
            <span>character select</span>
            <span>npc: false</span>
          </div>
          <div className="char-body">
            <div className="char-avatar">
              <VoxelAvatar />
              <span className="drag-hint" aria-hidden="true">
                ◄ drag to rotate ►
              </span>
            </div>
            <StatBars />
          </div>
        </aside>
      </section>

      <Specimens />

      <WorkGrid />

      <section className="cta">
        <div>
          <h2>
            The professional dossier{" "}
            <span className="no-net">isn&rsquo;t on the internet.</span>
          </h2>
          <p className="hint">on purpose. it&rsquo;s better in person anyway.</p>
        </div>
        <a
          className="btn"
          href="mailto:ensignpotato@gmail.com?subject=Okay%2C%20I%27m%20curious"
        >
          request access →
        </a>
      </section>

      <footer>
        <span>elizabeth lee · singapore · 2026</span>
        <span className="egg-hint">psst — try typing whoami</span>
      </footer>

      <TerminalEasterEgg />
    </>
  );
}
