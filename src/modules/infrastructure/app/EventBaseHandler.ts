import Handler from "./Handler";

export default abstract class EventBaseHandler<T> {
  protected abstract getVersion(event: T): string;

  public abstract getInstance(): Handler;
}