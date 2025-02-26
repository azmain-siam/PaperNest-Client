import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAddProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/products/productsApi";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductsTable from "@/components/dashboard/products/ProductsTable";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export interface IProduct {
  _id: string;
  name: string;
  brand: string;
  price: number;
  category:
    | "Writing"
    | "Office Supplies"
    | "Art Supplies"
    | "Educational"
    | "Technology";
  description: string;
  quantity: number;
  image: string;
  inStock: boolean;
}

export default function ProductsManagement() {
  const [addProduct, { error }] = useAddProductMutation();
  const { data, isLoading, refetch } = useGetAllProductsQuery(undefined);
  const products: IProduct[] = data?.data;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProduct>();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const onSubmitHandler = async (data: IProduct) => {
    const res = await addProduct(data);

    if (res.data.status) {
      toast.success("Product added successfully");
      refetch();
    } else {
      toast.error("Product not added");
      console.log(error);
    }

    setIsAddDialogOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedProduct ? "Edit Product" : "Add New Product"}
              </DialogTitle>
              <DialogDescription>
                {selectedProduct
                  ? "Edit the product details below."
                  : "Fill in the product details below."}
              </DialogDescription>
            </DialogHeader>

            {/* Product adding/editing form */}
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="grid grid-cols-2 gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    {...register("name", {
                      required: "Product name is required",
                    })}
                    placeholder="Enter product name"
                  />
                  {errors.name && (
                    <p className="text-red-500">
                      {errors.name.message as string}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    type="text"
                    {...register("brand", { required: "Brand is required" })}
                    placeholder="Enter brand name"
                  />
                  {errors.brand && (
                    <p className="text-red-500">
                      {errors.brand.message as string}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    {...register("price", { required: "Price is required" })}
                    placeholder="$0.00"
                  />
                  {errors.price && (
                    <p className="text-red-500">
                      {errors.price.message as string}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    {...register("quantity", { required: "Stock is required" })}
                    placeholder="0"
                  />
                  {errors.quantity && (
                    <p className="text-red-500">
                      {errors.quantity.message as string}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue("category", value as IProduct["category"])
                    }
                    {...register("category", {
                      required: "Category is required",
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Writing",
                        "Office Supplies",
                        "Art Supplies",
                        "Educational",
                        "Technology",
                      ].map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                      {/* <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem> */}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-red-500">
                      {errors.category?.message as string}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    type="text"
                    {...register("image")}
                    placeholder="Enter image URL"
                  />
                  {errors.image && (
                    <p className="text-red-500">
                      {errors.image.message as string}
                    </p>
                  )}
                </div>

                <div className="grid gap-2 col-span-2">
                  <Label htmlFor="brand">Description</Label>
                  <Textarea
                    id="description"
                    {...register("description", {
                      required: "Description is required",
                    })}
                    placeholder="Enter description..."
                  />
                  {errors.description && (
                    <p className="text-red-500">
                      {errors.description.message as string}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <ProductsTable
        products={products}
        setIsAddDialogOpen={setIsAddDialogOpen}
        setSelectedProduct={setSelectedProduct}
      />
    </div>
  );
}
