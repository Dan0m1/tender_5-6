import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecurityConfigService {
  constructor(private configService: ConfigService) {}

  get secret(): string {
    return this.configService.get<string>('security.secret')!;
  }

  get jwtTtl(): number {
    return this.configService.get<number>('security.jwtTtl')!;
  }

  get jwtRefreshTtl(): number {
    return this.configService.get<number>('security.jwtRefreshTtl')!;
  }
}
