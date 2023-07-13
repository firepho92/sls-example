export default interface Handler<T = object, U = object> {
  execute(port?: T): Promise<U>
}