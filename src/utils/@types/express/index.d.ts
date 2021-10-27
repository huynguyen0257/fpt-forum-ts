import { UserDoc } from '@/models';

declare global {
  namespace Express {
    interface Request {
      currentUser: UserDoc;
    }
  }
}
