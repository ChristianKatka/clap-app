import { AuthenticatedGuard } from './authenticated.guard';
import { UnauthenticatedGuard } from './unauthenticated.guard';
import { SignUpConfirmationGuard } from './sign-up-confirmation.guard';

export const guards: any[] = [AuthenticatedGuard, UnauthenticatedGuard, SignUpConfirmationGuard];

export * from './authenticated.guard';
export * from './unauthenticated.guard';
export * from './sign-up-confirmation.guard';
