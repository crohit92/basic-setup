import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService implements Storage {
  STORE = sessionStorage;
  constructor() {}
  get length(): number {
    return this.STORE.length;
  }
  clear(): void {
    this.STORE.clear();
  }
  getItem(key: string): string | null {
    return this.STORE.getItem(key);
  }
  key(index: number): string | null {
    return this.STORE.key(index);
  }
  removeItem(key: string): void {
    this.STORE.removeItem(key);
  }
  setItem(key: string, value: string): void {
    this.STORE.setItem(key, value);
  }
}
