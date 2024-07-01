import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberRepository } from '../infrastructure/member.repository';
import { Member } from '../domain/member.entity';
import { BookService } from '../../books/application/book.service';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberRepository)
    private memberRepository: MemberRepository,
    private bookService: BookService,
  ) {}

  async borrowBook(memberCode: string, bookCode: string): Promise<void> {
    const member = await this.memberRepository.findOne({
      where: { code: memberCode },
    });
    if (!member) throw new NotFoundException('Member not found');
    if (member.isPenalized) throw new Error('Member is currently penalized');
    if (member.borrowedBooksCount >= 2)
      throw new Error('Cannot borrow more than 2 books');

    await this.bookService.borrowBook(bookCode, member.id);
    member.borrowedBooksCount += 1;
    await this.memberRepository.save(member);
  }

  async returnBook(
    memberCode: string,
    bookCode: string,
    returnDate: Date,
  ): Promise<void> {
    const member = await this.memberRepository.findOne({
      where: { code: memberCode },
    });
    if (!member) throw new NotFoundException('Member not found');

    const book = await this.bookService.returnBook(
      bookCode,
      member.id,
      returnDate,
    );
    member.borrowedBooksCount -= 1;

    const borrowedDays =
      (returnDate.getTime() - book.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    if (borrowedDays > 7) {
      member.isPenalized = true;
      member.penaltyEndDate = new Date(
        returnDate.getTime() + 3 * 24 * 60 * 60 * 1000,
      );
    }

    await this.memberRepository.save(member);
  }

  async getAllMembers(): Promise<Member[]> {
    return this.memberRepository.find();
  }
}
