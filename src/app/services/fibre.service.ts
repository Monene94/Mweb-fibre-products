import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../entities/classes';

@Injectable({
  providedIn: 'root'
})
export class FibreService {

  constructor(private http: HttpClient) { }
  getCampaigns(): Observable<any> {
    return this.http.get<any>('https://apigw.mweb.co.za/prod/baas/proxy/marketing/campaigns/fibre?channels=120&visibility=public');
  }

  getProviders(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'https://www.mweb.co.za'
      })
    };
    return this.http.get<any>('https://www.mweb.co.za/media/images/providers', httpOptions);
  }

  getPromoCodesProducts(promoCodes: string[]): Observable<any> {
    return this.http.get<any>('https://apigw.mweb.co.za/prod/baas/proxy/marketing/products/promos/' + promoCodes.join(','), { params: { sellable_online: true } });
  }
}
