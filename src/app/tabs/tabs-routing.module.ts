import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab6',
        loadComponent: () => import('../tab6/tab6.page').then(m => m.Tab6Page)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3-routing.module').then(m => m.Tab3PageRoutingModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../tab4/tab4-routing.module').then(m => m.Tab4PageRoutingModule)
      },
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1-routing.module').then(m => m.Tab1PageRoutingModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab6',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
