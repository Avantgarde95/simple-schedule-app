export interface Schedule {
  id: number;
  content: string;
  unixTime: number;
  importance: "Normal" | "Important" | "VeryImportant";
}
