export enum IOType {
  STDOUT = 'stdout',
  STDERR = 'stderr',
}
export interface Payload {
  type: IOType;
  data: string;
}
