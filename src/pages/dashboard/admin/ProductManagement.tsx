import { useState } from "react";
import { MoreHorizontal, Plus, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
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

interface IProduct {
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
  const [addProduct] = useAddProductMutation();
  const { data, isLoading } = useGetAllProductsQuery(undefined);
  const products: IProduct[] = data?.data;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const createFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category", data.category);
    return formData;
  };

  const onSubmitHandler = (data) => {
    const formData = createFormData(data);
    // onSubmit(formData); // Send FormData to parent function
  };

  // const getStockStatus = (
  //   stock: number
  // ): "in-stock" | "low-stock" | "out-of-stock" => {
  //   if (stock === 0) return "out-of-stock";
  //   if (stock < 10) return "low-stock";
  //   return "in-stock";
  // };

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
              <div className="grid grid-cols-2 gap-4 py-4">
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
                    <p className="text-red-500">{errors.name.message}</p>
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
                    <p className="text-red-500">{errors.brand.message}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    {...register("price", { required: "Price is required" })}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="text-red-500">{errors.price.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    {...register("stock", { required: "Stock is required" })}
                    placeholder="0"
                  />
                  {errors.stock && (
                    <p className="text-red-500">{errors.stock.message}</p>
                  )}
                </div>

                <div className="col-span-1">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    {...register("category", {
                      required: "Category is required",
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-red-500">{errors.category.message}</p>
                  )}
                </div>
              </div>
            </form>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader className="sticky top-0">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0 &&
              products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    <Badge
                      variant={product.inStock ? "default" : "destructive"}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsAddDialogOpen(true);
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
