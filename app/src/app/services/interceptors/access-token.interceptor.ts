import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageKeys } from 'src/app/models/storage-keys';
import { SessionStorageService } from '../session-storage.service';
export function interceptAccessToken(
  req: HttpRequest<any>,
  next: HttpHandlerFn
) {
  const sessionStore: SessionStorageService = inject(SessionStorageService);
  const clone = req.clone({
    headers: req.headers.set(
      'Authorization',
      `Bearer ${sessionStore.getItem(StorageKeys.ACCESS_TOKEN) ?? ''}`
    ),
  });
  return next(clone);
}
