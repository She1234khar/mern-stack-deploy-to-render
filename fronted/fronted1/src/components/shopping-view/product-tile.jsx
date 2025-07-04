import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export default function ShoppingProductTile({product,handleGetProductDetails,handleAddtoCart}) {
  return (
   <Card className='w-full max-w-sm mx-auto'>
<div onClick={()=>handleGetProductDetails(product._id)}>
<div className='relative'>
          <img src={product.image} alt={product.title} className='w-full h-[300px] object-cover rounded-t-lg' />

{
  product.salePrice > 0 ? <Badge className='absolute top-2 left-2 bg-red-600 hover:bg-red-700'>Sale</Badge> : null
}

        </div>

        <CardContent className='p-4'>
          <h2 className='text-xl font-bold mb-2'>{product.title}</h2>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-sm text-muted-foreground'>{product.category}</span>
            <span  className='text-sm text-muted-foreground'>{product.brand}</span>
          </div>

          <div className='flex justify-between items-center mb-2'>
  <span
    className={`text-lg font-semibold ${
      product?.salePrice > 0 ? 'line-through text-muted-foreground' : 'text-green-600'
    }`}
  >
    ${product.price}
  </span>

  {product.salePrice > 0 && (
    <span className='text-lg font-semibold text-red-600'>
      ${product.salePrice}
    </span>
  )}
</div>




        </CardContent>

        {/* <CardFooter>
          <Button onClick={()=>handleAddtoCart(product._id)} className='w-full'>Add to cart</Button>
        </CardFooter> */}
</div>
<CardFooter>
          <Button onClick={()=>handleAddtoCart(product._id)} className='w-full'>Add to cart</Button>
        </CardFooter>

   </Card>
  )
}
