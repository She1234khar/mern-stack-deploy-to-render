import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export default function AdminProductTile({ product,setcurrentEdited,setOpenCreateProductsDialog,setFormData,handleDelete }) {
  console.log(product);

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div> 
        <div className='relative'>
          <img src={product.image} alt={product.title} className='w-full h-[300px] object-cover rounded-t-lg' />
        </div>
        <CardContent> 
          <h2 className='text-xl font-bold mb-2'>{product.title}</h2>
          <div className='flex justify-between items-center mb-2'>
  {product.salePrice != null ? (
    <>
      <span className="text-lg line-through text-primary">
        ${product.price}
      </span>
      <span className="text-lg font-bold">
        ${product.salePrice}
      </span>
    </>
  ) : (
    <span className="text-lg font-bold">
      ${product.price}
    </span>
  )}
</div>

        </CardContent>
        <CardFooter className='flex justify-between items-center'>
          <Button onClick={()=>{
            setOpenCreateProductsDialog(true);
            setcurrentEdited(product._id);
            setFormData(product);
          }}>edit</Button>
          <Button onClick={()=>handleDelete(product._id)} >delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}
