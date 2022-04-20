import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Product} from '../../../../shared/classes/product';
import {VariantConfigService} from '../../../../services/variant-config.service';
import {ArticleService} from '../../../../services/article.service';

@Component({
    selector: 'app-size',
    templateUrl: './size.component.html',
    styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {

    @Input() products: Product[] = [];
    @Input() size: any[] = [];

    @Output() sizeFilter: EventEmitter<any> = new EventEmitter<any>();

    public collapse: boolean = true;

    constructor(private productService: ArticleService,
                protected variantConfigService: VariantConfigService) {
    }
    variants = [];
    ngOnInit(): void {
        const schemaName = localStorage.getItem('schemaName');
        this.productService.queryVariantEshop(schemaName).subscribe(res => {
            const variants = res;
            const lang = localStorage.getItem('lang');

            this.variantConfigService.findLang(lang).subscribe(reslt => {
                const variantsConfig = reslt.body;
                const variantes = [];
                for (let i = 0; i <= variants.length; i++) {
                    let name = '';
                    if (variants[i]) {
                        name = variants[i].nameConfigTranslated;
                        if (name !== 'default') {
                            const dataSource = variantsConfig.filter(function(item) {
                                return item.nameConfigTranslated === name;
                            });
                            if (dataSource[0] !== undefined) {
                                variantes.push(dataSource[0]);
                            }

                        }

                    }
                }
                this.variants = variantes;
                this.variants.map(i => i.hideme = true);

                this.variantConfigService.getAllVariantsCompany(schemaName).subscribe(rslt => {
                    let tabVariant;
                    tabVariant = rslt.body;
                    tabVariant.map(i => i.hideme = true);
                    for (let i = 0; i < tabVariant.length; i++) {
                        this.variants.push(tabVariant[i]);
                    }
                });


            });
        });
    }

    get filterbysize() {
        const uniqueSize = [];
        this.products.filter((product) => {
            product.variants.filter((variant) => {
                if (variant.size) {
                    const index = uniqueSize.indexOf(variant.size);
                    if (index === -1) {
                        uniqueSize.push(variant.size);
                    }
                }
            });
        });
        return uniqueSize;
    }

    appliedFilter(event) {
        let index = this.size.indexOf(event.target.value);  // checked and unchecked value
        if (event.target.checked) {
            this.size.push(event.target.value);
        }// push in array cheked value
        else {
            this.size.splice(index, 1);
        }  // removed in array unchecked value

        let size = this.size.length ? {variant: this.size.join(',')} : {size: null};
        this.sizeFilter.emit(size);
    }

    // check if the item are selected
    checked(item) {
        if (this.size.indexOf(item) != -1) {
            return true;
        }
    }

}
