import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberService } from './application/member.service';
import { MemberController } from './presentation/member.controller';
import { MemberRepository } from './infrastructure/member.repository';
import { Member } from './domain/member.entity';
import { BookModule } from '../books/book.module';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), BookModule],
  providers: [MemberService, MemberRepository],
  controllers: [MemberController],
})
export class MemberModule {}
