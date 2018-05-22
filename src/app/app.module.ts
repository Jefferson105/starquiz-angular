import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ScoreComponent } from './score/score.component';
import { GameComponent } from "./game/game.component";
import { HomeComponent } from './home/home.component';
import { MainMenuModule } from './main-menu/main-menu.module';
import { CardModule } from './card/card.module';

const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: 'game', component: GameComponent },
  { path: 'score', component: ScoreComponent },
  { path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    MainMenuModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
