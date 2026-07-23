const letters = (word: string) =>
  word.split("").map((ch, i) => <i key={i}>{ch}</i>);

// "building" letters get an inner <b> so the hover brick-stack animation
// can run without clobbering the one-time rise animation on the <i>s
const bricks = (word: string) =>
  word.split("").map((ch, i) => (
    <i key={i}>
      <b>{ch}</b>
    </i>
  ));

export default function Headline() {
  return (
    <h1>
      Constantly{" "}
      <span className="w-build" aria-label="building">
        {bricks("building")}
      </span>{" "}
      &amp;{" "}
      <span className="w-break" aria-label="breaking">
        {letters("breaking")}
      </span>
      .
    </h1>
  );
}
