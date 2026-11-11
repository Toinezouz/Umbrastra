/**
 * The sky behind every screen: a still night.
 *
 * One soft glow near the horizon and a sparse field of faint stars, nothing
 * else and nothing that moves. It is there to give the page depth, never to
 * be looked at: the table is what matters. Decorative, hidden from assistive
 * technologies. Styles: `.sky` in base.css.
 */
export function SkyBackdrop(): JSX.Element {
  return (
    <div className="sky" aria-hidden="true">
      <div className="sky__stars" />
    </div>
  );
}
