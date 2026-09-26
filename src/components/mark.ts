/**
 * Geometry for the personal mark — a geometric lowercase "p" whose bowl can be
 * drawn out to any length. Shared by the nav logo (which stretches on hover)
 * and the homepage intro (which stretches it as a progress bar), so the two
 * cannot drift apart.
 */

/** Natural size of the mark. */
export const MARK_BOX = { w: 20.1797, h: 24 };

/** How far the bowl pulls out at full stretch, in the mark's own units. */
export const MARK_STRETCH = 62;

/**
 * The outline with the bowl extended by `d`. Both sub-paths are the original
 * curves with every point right of the bowl's centre pushed out by `d`, joined
 * by straight runs; at d = 0 those runs are zero-length and this is the mark as
 * drawn. The command sequence is identical at every `d`, which is what lets the
 * shape be tweened.
 */
export function markPath(d: number) {
  return (
    `M${20.1797 + d} 0V13.2002` +
    `C${20.1796 + d} 17.1765 ${16.9558 + d} 20.4003 ${12.9795 + d} 20.4004` +
    `L12.9795 20.4004` +
    `C9.61514 20.4004 6.79015 18.0924 6 14.9736V24H0V0H${20.1797 + d}Z` +
    `M12.9795 3.05469C9.93709 3.05472 7.47073 5.52107 7.4707 8.56348V12.8936` +
    `C7.4707 15.936 9.93707 18.4023 12.9795 18.4023` +
    `L${12.9795 + d} 18.4023` +
    `C${16.0219 + d} 18.4023 ${18.4883 + d} 15.936 ${18.4883 + d} 12.8936V8.56348` +
    `C${18.4882 + d} 5.52105 ${16.0219 + d} 3.05469 ${12.9795 + d} 3.05469` +
    `L12.9795 3.05469Z`
  );
}
