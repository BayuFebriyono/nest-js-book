import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './modules/books/domain/book.entity';
import { Member } from './modules/members/domain/member.entity';
import { BookModule } from './modules/books/book.module';
import { MemberModule } from './modules/members/member.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'library',
      entities: [Book, Member],
      synchronize: true,
    }),
    BookModule,
    MemberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
