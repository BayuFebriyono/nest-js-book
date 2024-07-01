import { Controller, Get, Param, Post } from '@nestjs/common';
import { MemberService } from '../application/member.service';
import { Member } from '../domain/member.entity';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  getAllMembers(): Promise<Member[]> {
    return this.memberService.getAllMembers();
  }

  @Post('borrow/:memberCode/:bookCode')
  borrowBook(
    @Param('memberCode') memberCode: string,
    @Param('bookCode') bookCode: string,
  ): Promise<void> {
    return this.memberService.borrowBook(memberCode, bookCode);
  }

  @Post('return/:memberCode/:bookCode/:returnDate')
  returnBook(
    @Param('memberCode') memberCode: string,
    @Param('bookCode') bookCode: string,
    @Param('returnDate') returnDate: Date,
  ): Promise<void> {
    return this.memberService.returnBook(memberCode, bookCode, returnDate);
  }
}
