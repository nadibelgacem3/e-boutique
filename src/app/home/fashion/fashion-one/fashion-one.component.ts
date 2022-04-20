import { Component, OnInit } from '@angular/core';
import { ProductSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {numberSchema} from '../../../app.constants';
import {SlideService} from '../../../services/slide.service';
import {HomeService} from '../../../services/home.service';
import {Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
@Component({
  selector: 'app-fashion-one',
  templateUrl: './fashion-one.component.html',
  styleUrls: ['./fashion-one.component.scss']
})
export class FashionOneComponent implements OnInit {

  public products: Product[] = [];
  public productCollections: any[] = [];
  
  constructor(public productService: ProductService, protected slideService: SlideService, private homeService: HomeService, private router: Router,private meta: Meta,
              private titleService: Title) {

  }

  public ProductSliderConfig: any = ProductSlider;

  public sliders = [
    {
      title: 'Welcome',
      subTitle:"",
      image: "assets/images/banner/5.jpg"
    }
  ]

  // Collection banner
  public collections = [

  ];

  // Blog
  public blog = [
  ];

  // Logo
  public logo = [{
    image: 'assets/images/logos/1.png',
  }, {
    image: 'assets/images/logos/2.png',
  }, {
    image: 'assets/images/logos/3.png',
  }, {
    image: 'assets/images/logos/4.png',
  }, {
    image: 'assets/images/logos/5.png',
  }, {
    image: 'assets/images/logos/6.png',
  }, {
    image: 'assets/images/logos/7.png',
  }, {
    image: 'assets/images/logos/8.png',
  }];
  private isDead$ = new Subject();
  ngOnInit(): void {

    const url = window.location.href;
    this.slideService.findByUrl(url.slice(numberSchema, (url.length))).subscribe(res => {
      let schemaName = null;
      if (res) {
        localStorage.setItem('schemaName', res.schemaName);
        schemaName = localStorage.getItem('schemaName');
        this.homeService.queryHeader(schemaName)
            .pipe(takeUntil(this.isDead$))
            .subscribe(value => {
              localStorage.setItem("entreprise", value[0].name);
              this.titleService.setTitle(localStorage.getItem('entreprise'));
              localStorage.setItem("theme", value[0].theme);
              if (value[0].logo) {
                localStorage.setItem("logo", value[0].logo);
              } else {
                localStorage.setItem("logo", "assets/images/dragon.ico");
              }
            });
        this.homeService.getCurrency(schemaName).subscribe(res2 => {
            localStorage.setItem("devise", JSON.stringify(res2[0]));
        });
        this.productService.getProducts.subscribe(response => {
          this.products = response;
          this.length = response.length;
          // Get Product Collection
          this.products.filter((item) => {
            item.collection.filter((collection) => {
              const index = this.productCollections.indexOf(collection);
              if (index === -1) this.productCollections.push(collection);
            })
          })
        });
        if (!res.isActivated) {
          this.router.navigate(['/pages/comingsoon']);
          localStorage.setItem('schemaName', '');
        }
      }
      this.homeService.getSeo(schemaName).subscribe(res1 => {
        if(res1.body[0]){
          this.meta.updateTag({
            name: 'description', content: res1.body[0].description
          });
          this.meta.updateTag({
            name: 'title', content: res1.body[0].title
          });
        }
      });

      // call the Slider Service
      if (schemaName) {
        this.homeService.querySlide(schemaName)
            .pipe(takeUntil(this.isDead$))
            .subscribe(reslt => {
              this.sliders = [];
              const sliderBlocs: any = reslt[0].blocs;
              sliderBlocs.sort((a, b) => {
                    if (a.indice < b.indice) {
                      return -1;
                    }
              });
              for (let j = 0; j < sliderBlocs.length; j++) {
                const slider = {
                  title: 'Welcome',
                  subTitle: sliderBlocs[j].text.text,
                  image: sliderBlocs[j].image.image
                }
                this.sliders.push(slider);
              }

            });

        // call the Section Service
        this.homeService.querySection(schemaName)
            .pipe(takeUntil(this.isDead$))
            .subscribe(value => {
              if(value.length>0){
                const  section1 = value[0];
                const sectionBlocs: any = section1.blocs;
                sectionBlocs.sort((a, b) => {
                  if (a.indice < b.indice) {
                    return -1;
                  }
                });

                for (let j = 0; j < sectionBlocs.length; j++) {
                  const collection = {
                    image: sectionBlocs[j].image.image,
                    save: '',
                    title: sectionBlocs[j].text.text,
                  }
                  this.collections.push(collection);
                }

                for (let i = 1; i < value.length; i++) {
                  const  section = value[i];
                  const sectioBlocs: any = section.blocs;
                  sectioBlocs.sort((a, b) => {
                    if (a.indice < b.indice) {
                      return -1;
                    }
                  });
                  for (let j = 0; j < sectioBlocs.length; j++) {
                    const collection = {
                      image: sectioBlocs[j].image.image,
                      date: '',
                      title: sectioBlocs[j].text.text,
                      by: ''
                    }
                    this.blog.push(collection);
                  }
                }
              }
            });
      }
    });
  }

  // Product Tab collection
  length = 0;
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collection.find(i => i === collection)) {
        return item
      }
    })
  }


}
