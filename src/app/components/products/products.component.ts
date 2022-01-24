import { Component, OnInit } from '@angular/core';
import { FibreService } from 'src/app/services/fibre.service';
import { Campaign, PriceRange, Product, PromocodeProduct, Provider, SummarizedProduct } from 'src/app/entities/classes';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  campaigns: Campaign[] = [];
  selectedCampaign!: Campaign;
  promoCodes: string[] = [];
  promoCodeProducts: PromocodeProduct[] = [];
  summarizedProducts: SummarizedProduct[] = [];
  providers: string[] = [];
  selectedProviders: string[] = [];
  selectedProducts: SummarizedProduct[] = [];
  selectedPriceRanges: PriceRange[] = [];

  priceRanges: PriceRange[] = [{min: 0, max: 699, label: 'R0 - R699'}, {min: 700, max: 999, label: 'R700 - R999'}, {min: 1000, max: 9999, label: 'R1000+'}]

  logoBaseURL = "https://www.mweb.co.za/media/images/providers"

  providerInfo: Provider[] = [
    {
      code: 'centurycity',
      name: 'Century City Connect',
      url: `${this.logoBaseURL}/provider-century.png`
    },
    {
      code: 'evotel',
      name: 'Evotel',
      url: `${this.logoBaseURL}/provider-evotel.png`
    },
    {
      code: 'octotel',
      name: 'Octotel',
      url: `${this.logoBaseURL}/provider-octotel.png`
    },
    {
      code: 'vumatel',
      name: 'Vumatel',
      url: `${this.logoBaseURL}/provider-vuma.png`
    },
    {
      code: 'openserve',
      name: 'Openserve',
      url: `${this.logoBaseURL}/provider-openserve.png`
    },
    {
      code: 'frogfoot',
      name: 'Frogfoot',
      url: `${this.logoBaseURL}/provider-frogfoot.png`
    },
    {
      code: 'mfn',
      name: 'MFN',
      url: `${this.logoBaseURL}/provider-metrofibre.png`
    },
    {
      code: 'vodacom',
      name: 'Vodacom',
      url: `${this.logoBaseURL}/provider-vodacom.png`
    },
    {
      code: 'linkafrica',
      name: 'Link Africa',
      url: `${this.logoBaseURL}/provider-linkafrica.png`
    },
    {
      code: 'linklayer',
      name: 'Link Layer',
      url: `${this.logoBaseURL}/provider-link-layer.png`
    },
    {
      code: 'lightstruck',
      name: 'Lightstruck',
      url: `${this.logoBaseURL}/provider-lightstruck.png`
    },
    {
      code: 'mitchells',
      name: 'Mitchells Fibre',
      url: `${this.logoBaseURL}/provider-mitchells.png`
    },
    {
      code: 'vumareach',
      name: 'Vuma Reach',
      url: `${this.logoBaseURL}/provider-vuma.png`
    }
  ]

  constructor(private fibreService: FibreService) { }

  ngOnInit(): void {
    this.getCampaigns();
  }

  getCampaigns() {
    this.fibreService.getCampaigns().subscribe(data => {
      this.campaigns = <Campaign[]>data.campaigns;

      if(this.campaigns){
        this.selectedCampaign = this.campaigns[0];
        this.onSelectCampaign();
      }
    });
  }

  onSelectCampaign() {
    // this.selectedCampaign = campaign;
    this.promoCodes = this.selectedCampaign.promocodes;
    this.getPromoCodesProducts(this.promoCodes);
  }

  getPromoCodesProducts(promoCodes: string[]) {
    this.fibreService.getPromoCodesProducts(promoCodes).subscribe(data => {
      this.promoCodeProducts = <PromocodeProduct[]>data;

      this.getSummarizedProducts();
    });
  }

  getSummarizedProduct = ({ productCode, productName, productRate, subcategory, highlights, lineSpeed }: 
    { productCode: string, productName: string, productRate: number, subcategory: string , highlights: string[], lineSpeed:number}) => {
    const provider = subcategory ? subcategory.replace('Uncapped', '').replace('Capped', '').trim() : '';
    return { productCode, productName, productRate, provider, highlights, lineSpeed};
  }

  // getProductsFromPromo = (pc: PromocodeProduct) => {
  //   const promoCode = pc.promoCode;
  //   return pc.products.reduce((prods, p) => [...prods, this.getSummarizedProduct(p)], []);
  // }

  getSummarizedProducts() {
    this.providers = [];
    this.summarizedProducts = [];
    this.promoCodeProducts.forEach(pc => {
      pc.products.forEach(p => {
        const sp = this.getSummarizedProduct(p);
        this.summarizedProducts.push(sp);
      });
    });

    this.providers = [...new Set(this.summarizedProducts.map(p => p.provider))];
    // sort by price from lowest to highest
    this.providers = this.providers.sort((pa, pb) => {
      return pa.localeCompare(pb);
    });
  }

  onSelectProvider(event: any, prv: string) {

    const index = this.selectedProviders.indexOf(prv);

    if (index === -1) {
      if (event.srcElement.checked) {
        this.selectedProviders.push(prv);
      } else {
        this.selectedProviders.splice(index, 1);
      }
    } else {
      if (event.srcElement.checked) {
        this.selectedProviders.push(prv);
      } else {
        this.selectedProviders.splice(index, 1);
      }
    }
    this.getSelectedProducts();
  }

  onSelectImgProvider(prv: string){
    this.selectedProviders = [];
    const index = this.selectedProviders.indexOf(prv);

    if (index === -1) {
      this.selectedProviders.push(prv);
    } else {
      this.selectedProviders.splice(index, 1);
    }

    console.log( this.selectedProviders);
    this.getSelectedProducts();
  }

  getSelectedProducts() {

    // filter products by infrastructure provider
    const selectedProviderSet = new Set(this.selectedProviders)
    let selectedProducts = this.summarizedProducts.filter(p => selectedProviderSet.has(p.provider));

    // filter products by price range
    selectedProducts = selectedProducts.filter(this.filterByPriceRanges);

    // sort by price from lowest to highest
    this.selectedProducts = selectedProducts.sort((pa, pb) => pa.productRate - pb.productRate);
  }

  filterByPriceRanges = (product: { productRate: any; }) => {
    // If no price range has been selected then include all products
    if (this.selectedPriceRanges.length === 0) {
      return true;
    }
    
    for (const range of this.selectedPriceRanges) {
      const price = product.productRate;
      if (price >= range.min && price <= range.max) {
        return true;
      }
    }
    
    return false;
  }

  onSelectPriceRange(event: any, price: PriceRange) {

    const index = this.selectedPriceRanges.indexOf(price);

    if (index === -1) {
      if (event.srcElement.checked) {
        this.selectedPriceRanges.push(price);
      } else {
        this.selectedPriceRanges.splice(index, 1);
      }
    } else {
      if (event.srcElement.checked) {
        this.selectedPriceRanges.push(price);
      } else {
        this.selectedPriceRanges.splice(index, 1);
      }
    }
    this.getSelectedProducts();
  }

  getLog(provider: string){
    const logo = this.providerInfo.filter(p => p.name === provider);
    
    return logo.length > 0 ? logo[0].url : '';
  }
}
