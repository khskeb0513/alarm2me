export class JwtPayloadDto {
  constructor(public sub: string, public email: string, public name: string) {}
}
