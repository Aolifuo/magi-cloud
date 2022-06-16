import { useEffect } from "react";

class EventBus {
  instance: HTMLElement | null;

  constructor() {
    this.instance = null;
  }

  dispatch = (type: string) => {
    this.instance?.dispatchEvent(new CustomEvent(type));
  };

  subscribe = (type: string, listener: EventListenerOrEventListenerObject) => {
    this.instance?.addEventListener(type, listener);
  };

  unsubscribe = (type: string, listener: EventListenerOrEventListenerObject) => {
    this.instance?.removeEventListener(type, listener);
  };
}

const eventBus = new EventBus();

export default function useEventBus() {
  useEffect(() => {
    if (eventBus.instance === null) {
      eventBus.instance = document.createElement('event-bus');
    }
  }, []);

  return eventBus;
}
