import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getSearchResults, resetSearchResults } from '@/store/shop/search-slice';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { toast } from 'sonner';
import { fetchProductDetails } from '@/store/shop/product-slice';
import ProductDetailsDialog from '@/components/shopping-view/product-details';

export default function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { searchResults = [] } = useSelector((state) => state.searchSlice);
  const { user } = useSelector((state) => state.auth);
  const { productDetails } = useSelector((state) => state.shoppingProduct);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  // 🔁 Load keyword from URL on first mount
  useEffect(() => {
    const initialKeyword = searchParams.get('keyword');
    if (initialKeyword) {
      setKeyword(initialKeyword);
      dispatch(getSearchResults(initialKeyword));
    }
  }, []);

  // 🔍 Trigger search when keyword changes
  useEffect(() => {
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword.length > 3) {
      const delay = setTimeout(() => {
        setSearchParams(new URLSearchParams({ keyword: trimmedKeyword }));
        dispatch(getSearchResults(trimmedKeyword));
      }, 500);

      return () => clearTimeout(delay);
    } else {
      setSearchParams(new URLSearchParams({ keyword: trimmedKeyword }));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  function handleAddtoCart(getCurrentProductionId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductionId,
        quantity: 1,
      })
    ).then((data) => {
      if (data.payload?.success) {
        dispatch(fetchCartItems(user.id));
        toast.success('Successfully added to cart');
      }
    });
  }

  function handleGetProductDetails(getCurrentProductionId) {
    dispatch(fetchProductDetails({ id: getCurrentProductionId })).then((res) => {
      if (res.payload?.data) {
        setOpenDetailsDialog(true);
      }
    });
  }

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <input
            value={keyword}
            name="keyword"
            onChange={(e) => setKeyword(e.target.value)}
            className="py-3 px-4 w-full border rounded-md"
            placeholder="Search Products..."
            type="text"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <ShoppingProductTile
              key={product._id}
              product={product}
              handleGetProductDetails={handleGetProductDetails}
              handleAddtoCart={handleAddtoCart}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        )}
      </div>

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}
