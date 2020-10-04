import { Routes } from "@angular/router";
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { TemplateComponent } from './pages/template/template.component';
import { DateValidatorsComponent } from './pages/date-validators/date-validators.component';
//my components


export const ROUTES: Routes = [
    { path: "reactive", component: ReactiveComponent },
    { path: "template", component: TemplateComponent },
    { path: "validators", component: DateValidatorsComponent },
    { path: "**", pathMatch: "full", redirectTo: "home" }
];
