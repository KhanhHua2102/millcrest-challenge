import { Route } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { Page1Component } from './pages/landing/page1.component';
import { Page2Component } from './pages/landing/page2.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'page1',
    component: Page1Component,
  },
  {
    path: 'page2',
    component: Page2Component,
  },
];
