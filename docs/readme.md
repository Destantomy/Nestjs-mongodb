- to install mongoose which a mongodb library to interact with database : npm i @nestjs/mongoose mongoose
- class validator: is used to validate data received from the client are correct and match with declared data, use this cli: npm i class-validator; ex: if data declared as string nest will return response 400 without declaring any 'if'.
- class transformer: is used to transform data such as plain JSON -> class instance, transforming string -> number/boolean, hiding the sensitive field. Ex: export class PaginationDto {
  @Type(() => Number)
  page: number; }
  without transformer: typeof page === "string"
  Ex to hiding important field:
  import { Exclude } from 'class-transformer';

export class UserResponseDto {
email: string;

@Exclude()
password: string;
}
-> so why validator and transformer are using together? Because validator need class instance and transformer transforming json into class.
