// creationTime, startTime: UNIX time in milliseconds.
export interface Schedule {
  // Set by application.
  id: string;
  creationTime: number;

  // Set by user.
  content: string;
  isImportant: boolean;
  startTime: number;
}
