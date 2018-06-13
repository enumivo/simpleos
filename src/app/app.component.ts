import {Component} from '@angular/core';
import {EOSJSService} from './eosjs.service';
import {Router} from '@angular/router';
import {AccountsService} from './accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private eos: EOSJSService,
              private router: Router,
              public aService: AccountsService) {
    const endpoint = 'http://45.33.118.116:8000';
    const chain_id = 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f';
    this.eos.init(endpoint, chain_id).then((savedAccounts: any) => {
      if (savedAccounts) {
        if (savedAccounts.length > 0) {
          this.aService.loadLocalAccounts(savedAccounts);
          router['navigate'](['dashboard', 'vote']);
        } else {
          console.log('No saved accounts!');
        }
      }
    });
  }
}
