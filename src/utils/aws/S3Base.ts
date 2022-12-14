export default interface S3Base {
  /**
   * @function getObjectFile
   * @param path {string}
   * @description returns an S3 object
   */
  getObjectFile(path: string): Promise<any>;

  getSignedUrl(path: string): Promise<any>;

  uploadFiles(filters: {}): Promise<any>;

  streamToString(stream: any): Promise<any>;
}