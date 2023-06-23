export interface BaseAnimationType {
  element: Element | string | HTMLElement;
  currentTimeline?: GSAPTimeline;
}

export interface FadeInAnimationType extends BaseAnimationType {
  direction: 'up' | 'down' | 'left' | 'right';
}

enum DirectionsEnum {
  up = 'up',
  down = 'down',
  left = 'left',
  right = 'right',
}
