/**
 * Represents an animation that can be played.
 *
 * TODO: For now this is just a promise that can be awaited. Maybe we could add animation controls here?
 */
export type WAnimation = () => Promise<void>;
