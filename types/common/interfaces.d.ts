declare namespace common {
  interface Person {
    firstName: string;
    lastName: string;
    age: number;
  }

  interface LocalType {
    [key: string]: any
  }
}