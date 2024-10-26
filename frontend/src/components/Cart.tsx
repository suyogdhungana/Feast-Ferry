import { FaCartShopping } from "react-icons/fa6";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Product } from '@/types';
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";

interface CartProps {
    cartItems: { [key: string]: { product: Product; quantity: number } };
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
    const cartEntries = Object.entries(cartItems);

    // Calculate totals
    const totalItemsCost = cartEntries.reduce((total, [_, { product, quantity }]) => total + product.price * quantity, 0);
    const shippingCost = 0;
    const transactionFee = 2.50;
    const totalCost = totalItemsCost + shippingCost + transactionFee;

    return (
        <Sheet>
            <SheetTrigger className="group -m-2 flex items-center p-2">
                <div className="flex items-center h-6">
                    <div className="flex-shrink-0 text-gray-500 group-hover:text-gray-600">
                        <FaCartShopping className="h-6 w-6" />
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-600 group-hover:text-gray-800">
                        {cartEntries.length}
                    </span>
                </div>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
                <SheetHeader className="space-y-2.5 pr-6">
                    <SheetTitle>Food Cart</SheetTitle>
                    {cartEntries.length === 0 ? (
                        <SheetDescription>Your cart is empty.</SheetDescription>
                    ) : (
                        <SheetDescription>
                            {cartEntries.length} item(s) in your cart.
                        </SheetDescription>
                    )}
                </SheetHeader>
                <div className="flex-grow flex-col">
                    <div className="p-4">
                        {cartEntries.length === 0 ? (
                            <p className="text-gray-500">Add items to your cart to see them here.</p>
                        ) : (
                            <div className="flex w-full flex-col pr-6">
                                {cartEntries.map(([id, { product, quantity }]) => (
                                    <div key={id} className="flex justify-between mb-2">
                                        <span>{product.name} x{quantity}</span>
                                        <span>${(product.price * quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="space-y-4 pr-6">
                    <Separator />
                    <div className="space-y-1.5 text-sm">
                        <div className="flex">
                            <span className="flex-1">Shipping</span>
                            <span>${shippingCost.toFixed(2)}</span>
                        </div>
                        <div className="flex">
                            <span className="flex-1">Transaction Fee</span>
                            <span>${transactionFee.toFixed(2)}</span>
                        </div>
                        <div className="flex">
                            <span className="flex-1">Total</span>
                            <span>${totalCost.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <SheetFooter>
                    <SheetTrigger asChild>
                        <Link to='/' className={buttonVariants({ className: 'w-full mr-5' })}>
                            Continue to Checkout
                        </Link>
                    </SheetTrigger>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default Cart;
