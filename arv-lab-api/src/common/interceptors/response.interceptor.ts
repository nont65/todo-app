import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpRequest = context.switchToHttp().getRequest();
    if (httpRequest.method !== 'GET') {
      return next.handle().pipe(map((data) => (data ? data : null)));
    }

    return next.handle().pipe(map((data) => (data ? { data } : null)));
  }
}
