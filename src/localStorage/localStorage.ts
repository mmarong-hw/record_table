import { isStorageDefined, parseIfJson } from "./helper.ts";
import type { RecordDataType } from "../hook/useRecord.ts";

const isLocalStorageDefined = isStorageDefined("localStorage");

export class LocalStorage<T> {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  get(): T | null {
    if (!isLocalStorageDefined) {
      return null;
    }

    const item = window.localStorage.getItem(this.key);

    return item ? parseIfJson(item) : null;
  }

  set(value: T): void {
    if (!isLocalStorageDefined) {
      return;
    }

    try {
      window.localStorage.setItem(this.key, JSON.stringify(value));
    } catch (e) {
      if (e instanceof Error && e.name !== "QuotaExceededError") {
        throw e;
      }
    }
  }

  remove() {
    if (!isLocalStorageDefined) {
      return;
    }

    window.localStorage.removeItem(this.key);
  }
}

export const localStorageKeys = {
  RECORD: "record",
} as const;

export const storage = new LocalStorage<RecordDataType[]>(
  localStorageKeys.RECORD,
);
