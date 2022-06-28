

class EventBus {
  events: Map<string, Function[]>;

  constructor() {
    this.events = new Map();
  }

  dispatch = (channel: string) => {
    this.events.get(channel)?.forEach((fn) => fn());
  };

  on = <Fn extends Function>(channel: string, listener: Fn) => {
    if (this.events.has(channel)) {
      this.events.get(channel)!.push(listener);
      return;
    }
    this.events.set(channel, [listener]);
  };

  off = <Fn extends Function>(channel: string, listener: Fn) => {
    if (!this.events.get(channel)) {
      return;
    }
    this.events.set(channel, this.events.get(channel)!.filter((fn) => fn != listener));
  };
}

const eventBus = new EventBus();

export default eventBus;
