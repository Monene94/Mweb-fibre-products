export interface Campaign {
    code: string;
    name: string;
    description: string;
    urlSlug: string;
    category: string;
    isStandardCampaign: boolean;
    isDefaultCampaign: boolean;
    isPrivateCampaign: boolean;
    promocodes: Array<string>;
    links: Array<string>;
}

export interface SummarizedProduct {
    productCode: string;
    productName: string;
    productRate: number;
    provider: string;
    highlights: Array<string>;
    lineSpeed: number;
}

export interface Provider {
    code: string;
    name: string;
    url: string;
}

export interface PromocodeProduct {
    promoCode: string;
    promoCodeDescription: string;
    products: Array<Product>;
    promoCodeTagLine: string;
}

export interface Product {
    productCode: string;
    productName: string;
    category?: string;
    subcategory: string;
    consumerCategory?: string;
    productDescription?: string;
    productRate: number;
    productDiscountType?: string;
    productDiscountAmount?: number;
    productDiscountPeriod?: number;
    productDiscountSequence?: number;
    onceOffCharge?: boolean;
    summary?: string;
    isHero?: boolean;
    heroOption?: string;
    heroTagLine?: string;
    heroImage?: string;
    sellOnline?: boolean;
    accessLimit?: number;
    accessLimitUnits?: string;
    highlight1?: string;
    highlight2?: string;
    highlight3?: string;
    highlight1Icon?: string;
    highlight2Icon?: string;
    highlight3Icon?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: Array<string>
    includes?: any;
    highlights: Array<string>
    technicalTerms?: string;
    lineSpeed: number;
    parameters?: Array<Parameter>;
    friendlyName?: string;
    invoiceRollupDescription?: string;
    minimumContractMonths?: number;
    productType?: string;
    chargePeriod?: string;
    highlight4?: string;
    highlight5?: string;
    highlight6?: string;
    highlight4Icon?: string;
    highlight5Icon?: string;
    highlight6Icon?: string;
    displayPrice?: number;
    tagLine?: string;
}

export interface Parameter {
    name: string;
    value: string;
}

export interface PriceRange {
    min: number;
    max: number;
    label: string;
}