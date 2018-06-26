import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

//Dependencies
import { Toast } from '@ionic-native/toast';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { Camera} from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';


//Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { ProfilPage } from '../pages/profil/profil';
import { ArticlesPage } from '../pages/articles/articles';
import { AddCategoryPage } from '../pages/add-category/add-category';
import { AddImagesPage } from '../pages/add-images/add-images';
import { AddPricePage } from '../pages/add-price/add-price';
import { PublishPage } from '../pages/publish/publish';
import { ProductPage } from '../pages/product/product';
import { MenuPage } from '../pages/menu/menu';
import { FavouritesPage } from '../pages/favourites/favourites';
import { EditProfilPage } from '../pages/edit-profil/edit-profil';
import { SearchPage } from '../pages/search/search';
import { EditProductPage } from '../pages/edit-product/edit-product';
import { AboutPage } from '../pages/about/about';

import { UtilsProvider } from '../providers/utils/utils';
import { AuthProvider } from '../providers/auth/auth';


// Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyD24y8NxfxBDJQCpnFwhmd3hQYUKUrmjcU",
    authDomain: "vimo-hybrid.firebaseapp.com",
    databaseURL: "https://vimo-hybrid.firebaseio.com",
    projectId: "vimo-hybrid",
    storageBucket: "vimo-hybrid.appspot.com",
    messagingSenderId: "178572112563"
  };


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    ProfilPage,
    ArticlesPage,
    AddCategoryPage,
    AddImagesPage,
    AddPricePage,
    PublishPage,
    ProductPage,
    MenuPage,
    FavouritesPage,
    EditProfilPage,
    SearchPage,
    EditProductPage,
    AboutPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    ProfilPage,
    ArticlesPage,
    AddCategoryPage,
    AddImagesPage,
    AddPricePage,
    PublishPage,
    ProductPage,
    MenuPage,
    FavouritesPage,
    EditProfilPage,
    SearchPage,
    EditProductPage,
    AboutPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilsProvider,
    Toast,
    AuthProvider,
    SpinnerDialog,
    Camera,
    AngularFireStorage,
    Geolocation,
    Network
  ]
})
export class AppModule {


}
