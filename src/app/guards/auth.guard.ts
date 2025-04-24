import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { UserService } from "../users-list/user.service";

export const authGuard: CanActivateFn = () => {
    const userService = inject(UserService);
    const router = inject(Router);
    
    if (userService.isAdmin) {
        return true;
    }
    
    router.navigate(['/']);
    return false;
};