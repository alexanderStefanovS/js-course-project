import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomGenerationComponent } from './components/custom-generation/custom-generation.component';
import { DbConnctionComponent } from './components/db-connction/db-connction.component';
import { DbMetadataComponent } from './components/db-metadata/db-metadata.component';
import { GenerationWayChoiceComponent } from './components/generation-way-choice/generation-way-choice.component';

const routes: Routes = [
  { path: '', component: GenerationWayChoiceComponent},
  { path: 'db-connection', component: DbConnctionComponent },
  { path: 'custom-generation', component: CustomGenerationComponent },
  { path: 'db-metadata', component: DbMetadataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
