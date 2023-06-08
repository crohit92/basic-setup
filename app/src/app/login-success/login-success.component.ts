import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.scss'],
})
export class LoginSuccessComponent {
  constructor(
    private readonly auth: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.route.queryParamMap.subscribe((params) => {
      if (params.has('code')) {
        const code = params.get('code')!;
        this.auth.getAccessToken(code).subscribe(() => {
          this.router.navigate(['dashboard']);
        });
      } else {
        throw new Error('Authorization code not available');
      }
    });
  }
}
