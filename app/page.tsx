import PixelCursor from "@/components/PixelCursor";
import Headline from "@/components/Headline";
import CharacterSheet from "@/components/CharacterSheet";
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
          <a href="#about">about</a>
          <a href="mailto:lizabethmarielee@gmail.com">email</a>
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
            <p className="locked">
              I&rsquo;m still building my story —{" "}
              <a href="#work">the chapters so far are below</a>.
            </p>
          </div>
        </div>

        <aside className="char-card" aria-label="character sheet">
          <CharacterSheet />
        </aside>
      </section>

      <WorkGrid />

      <section className="about" id="about">
        <p className="eyebrow">backstory · loaded from save file</p>
        <h2>The origin story</h2>
        <div className="about-body">
          <p>
            At a young age, Elizabeth was drawn to beautiful spaces — colours
            made her feel alive. She ventured into interior design, learning
            to bring the spaces in her mind to life. Moving naturally from 2D
            drawings to 3D renders, she wanted to go deeper:{" "}
            <em>reimagining spaces before they are ever built</em>. So she
            pivoted into computer science, picking up UI·UX and engineering
            along the way.
          </p>
          <p>
            Her curiosity about creation — and how things really work —
            naturally gave way to a specialisation in{" "}
            <em>AI and cybersecurity</em>. School ended, but her passion for
            learning and building didn&rsquo;t. These days she keeps up with
            the latest cyber, AI and design trends to build, test, ship and
            optimise tools and processes, whilst exploring what this world has
            to offer — underwater and on land ;)
          </p>
        </div>
      </section>

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
          href="mailto:lizabethmarielee@gmail.com?subject=Okay%2C%20I%27m%20curious"
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
