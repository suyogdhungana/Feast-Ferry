import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import Cart from "./Cart"
import { Product } from "@/types"
import SearchBar from "./SearchBar"

const Navbar: React.FC<{ cartItems: { [key: string]: { product: Product; quantity: number } } }> = ({ cartItems }) => {
    return (
        <>
            <div className='bg-gray-100 top-0 sticky z-50'>
                <div className='border-b flex justify-between'>
                    <div className='items-center'>
                        <Link to={'/'}>
                            <div className="px-6 py-4">
                                {/* Logo */}
                                <span className="cursive">FeastFerry</span>
                            </div>
                        </Link>
                    </div>
                    <SearchBar />
                    <div className="px-6 py-4 hidden md:flex gap-6">
                        <SignedOut>
                            <Button>
                                <SignInButton />
                            </Button>
                        </SignedOut>
                        <SignedIn>
                            <Cart cartItems={cartItems} />
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </>)
}

export default Navbar