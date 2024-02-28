import { cartStore, type ICartItem } from "./store"
import { type Product } from "@prisma/client"

export class CartService {
  syncCart(products: Product[]) {
    const { cart } = cartStore.getState()

    if (products.length === 0) return this.clearCart()

    products.forEach((product) => {
      const index = cart.findIndex((item) => item.id === product.id)
      // if product id is not matched, remove the product from cart
      // else update the product
      cartStore.setCart((state) => {
        if (index === -1) {
          console.log("removing product", product)
          return state.filter((item) => item.id !== product.id)
        }
        console.log("updating product", product)
        return state.map((item) =>
          item.id === product.id ? { ...item, product } : item
        )
      })
    })
  }
  setCartTotal() {
    cartStore.setState((state) => ({
      ...state,
      total: state.cart.reduce(
        (acc, item) => acc + item.qty * item.product.price,
        0
      ),
    }))
  }
  addToCart(dto: Omit<ICartItem, "qty">) {
    cartStore.setCart((cart) => {
      const index = cart.findIndex((item) => item.id === dto.id)

      if (index === -1) {
        return [...cart, { ...dto, qty: 1 }]
      }

      return cart.map((item) =>
        item.id === dto.id ? { ...item, qty: item.qty + 1 } : item
      )
    })

    this.setCartTotal()
  }

  removeFromCart(dto: Pick<ICartItem, "id">) {
    cartStore.setCart((cart) => cart.filter((item) => item.id !== dto.id))

    this.setCartTotal()
  }
  updateQty(dto: Pick<ICartItem, "id">, qty: number) {
    cartStore.setCart((cart) => {
      const index = cart.findIndex((item) => item.id === dto.id)

      if (index === -1) {
        return cart
      }

      return cart.map((item) => (item.id === dto.id ? { ...item, qty } : item))
    })

    this.setCartTotal()
  }

  clearCart() {
    cartStore.setState((state) => ({
      ...state,
      cart: [],
      total: 0,
    }))
  }
}

export const cartService = new CartService()
