import { Component ,ElementRef, ViewChild, Renderer2, AfterViewInit, OnInit, Input  } from '@angular/core';
import { MenProductsService } from '../../Services/men-products.service';
import { IProduct } from '../../Models/iproduct';
import { WishListService } from '../../Services/wish-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit, AfterViewInit  {
 
  @Input() product: IProduct = {} as IProduct; 
  loggedUserToken:any;
  isAddedToWishList:boolean = false ;
  

  constructor(private _MenProductsService:MenProductsService  , private _WishListService : WishListService , private toastr: ToastrService){}

  ngOnInit(): void {
    this.loggedUserToken=localStorage.getItem('token')


  }

  AddToWishList(productId:any ){
    this._WishListService.addToWishList(productId).subscribe({
      next: (response) => { 

        this.showSuccess()
        console.log(response); 
         if(response == 'Product added to wishlist.'){
          this.isAddedToWishList = true ;
         }
         
      },
      error : (err) => {
        console.log(this.loggedUserToken);
        
        console.log(err)
        ;}
    })
  }

  removeFromWishList(productId: string) {
    this._WishListService.removeFromWishList(productId).subscribe({
      next: (response) => {
        console.log(response);
        this.showError()
        
      },
      error: (error) => {
        console.error('Error removing from wishlist:', error);
      }
    });
  }


  ngAfterViewInit(): void {
    const wrappers = document.querySelectorAll('.wrapper');

    wrappers.forEach(wrapper => {
      const buyButton = wrapper.querySelector('.buy');
      const removeButton = wrapper.querySelector('.remove');
      const bottom = wrapper.querySelector('.bottom');

      if (buyButton && bottom) {
        buyButton.addEventListener('click', () => {
          bottom.classList.add('clicked');
        });
      }

      if (removeButton && bottom) {
        removeButton.addEventListener('click', () => {
          bottom.classList.remove('clicked');
        });
      }
    });
  }


  showSuccess() {
    this.toastr.success('Product Added To Wish List');
  }

  showError() {
    this.toastr.error('Product Removed To Wish List');
  }
}
