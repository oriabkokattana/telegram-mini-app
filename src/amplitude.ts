import * as amplitude from '@amplitude/analytics-browser';

export const initAmplitude = () => amplitude.init(import.meta.env.VITE_AMPLITUDE_API_KEY);

export const trackEvent = (eventName: string, properties: Record<string, string | number> = {}) => {
  amplitude.track(eventName, properties);
};

export const setAmplitudeUserProperties = (userProperties: Record<string, string | number>) => {
  const identifyEvent = new amplitude.Identify();
  Object.keys(userProperties).forEach((property) => {
    identifyEvent.set(property, userProperties[property]);
  });
  amplitude.identify(identifyEvent);
};
