import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EthereumGuard } from './guards/ethereum.guard';
import { HomeComponent } from './pages/home/home.component';
import { EthereumMissingComponent } from './pages/etherum-missing/ethereum-missing.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [EthereumGuard],
  },
  {
    path: 'ethereum-missing',
    component: EthereumMissingComponent,
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
