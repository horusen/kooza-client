import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // Home Module
  {
    path: '',
    component: HomeComponent,
    children: [
      // Credit loan
      {
        path: 'credit-loan',
        loadChildren: () =>
          import('./credit-loan/credit-loan.module').then(
            (module) => module.CreditLoanModule
          ),
      },

      // Dashboard
      {
        path: '',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (module) => module.DashboardModule
          ),
      },
    ],
  },

  // Auth Module
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
