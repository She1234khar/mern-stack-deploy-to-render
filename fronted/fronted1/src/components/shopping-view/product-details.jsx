import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Star } from 'lucide-react'; // ⭐️ Star icon
import { setProductDetails } from '@/store/shop/product-slice';
import { useDispatch } from 'react-redux';

export default function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch=useDispatch();
  console.log(productDetails, 'detail');

  
  const productRating = 4; // Out of 5
function handleDialogClose(){
  setOpen(false);
  dispatch(setProductDetails())
}
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">

        {/* LEFT: Product Image */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        
        <div className="grid gap-6">

          
          <DialogTitle className="text-3xl font-extrabold">{productDetails?.title}</DialogTitle>

      
          <div className="flex items-center gap-2">
            <div className="flex items-center text-yellow-500">
              {[...Array(productRating)].map((_, index) => (
                <Star key={index} size={18} fill="currentColor" />
              ))}
              {[...Array(5 - productRating)].map((_, index) => (
                <Star key={index} size={18} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({productRating}/5)</span>
          </div>

          
          <p className="text-muted-foreground">{productDetails?.description}</p>

        
          <div className="flex items-center gap-4 text-2xl font-bold">
            <span className={productDetails?.salePrice > 0 ? 'line-through text-muted-foreground' : 'text-green-600'}>
              ${productDetails?.price}
            </span>
            {productDetails?.salePrice > 0 && (
              <span className="text-red-600">
                ${productDetails?.salePrice}
              </span>
            )}
          </div>

          
          <Button className="w-full md:w-auto">Add to Cart</Button>

          
          <div className="max-h-[300px] overflow-auto border rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">

              
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Sangam Mukherjee</h3>
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, index) => (
                        <Star key={index} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Bahut hi acha product hai! Quality superb hai. 👍✨
                  </p>
                </div>
              </div>

              
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Rahul Kumar</h3>
                    <div className="flex items-center text-yellow-500">
                      {[...Array(4)].map((_, index) => (
                        <Star key={index} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Value for money! Delivery bhi fast thi.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
