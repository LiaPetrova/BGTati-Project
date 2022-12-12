import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';


import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { CoreModule } from './core/core.module';
import { PagesModule } from './feature/pages/pages.module';
import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule, } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { environment } from '../environments/environment';

import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';










@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,

    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    // AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // // AngularFireModule.initializeApp(environment.firebase),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    // provideStorage(() => getStorage()),
    // AngularFireAuthModule,
    // AngularFireDatabaseModule,

    CoreModule,
    PagesModule,
    SharedModule,
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (authService: AuthService) => {
    //     return () => authService.addUser();
    //   },
    //   deps: [AuthService],
    //   multi: true
    // },
  ],
  bootstrap: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ]
})
export class AppModule { }
