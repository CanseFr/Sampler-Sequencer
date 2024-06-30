export interface FeedbackDelayType {
  wet: number;
  decay: number;
  preDelay: number;
}

export const initFeedbackDelay: FeedbackDelayType = {
  wet: 0,
  decay: 0.2,
  preDelay: 0.2,
}