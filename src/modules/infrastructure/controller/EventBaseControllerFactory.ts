import Handler from "./Handler";

export default abstract class EventBaseControllerFactory<T> {
  protected abstract getVersion(event: T): string;

  public abstract getInstance(): Handler;
}