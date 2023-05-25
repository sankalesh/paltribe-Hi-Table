import isEmpty from "lodash-es/isEmpty";
import { ICartDish, ICartExtra, ICart, ICartVariant } from "../store/useCart";
import { IBusinessData } from "../types/hiTableData";

export const getPrice = (price: number | string) => {
  if (!price || price === 0) {
    // return 'FREE'
    return "";
  }

  return `₹${price}`;
};

export const getTimeIn12HrFormat = (time: string) => {
  if (!time || !time.includes(":")) return "";

  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);

  const amPm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;

  return `${hour12}:${minutes} ${amPm}`;
};

export const getPriceOfExtra = (extra: ICartExtra) => {
  let arrExtra = Object?.values(extra);
  let extraPrice = 0;
  for (let i = 0; i < arrExtra.length; i++) {
    let obj = arrExtra[i];
    extraPrice += parseInt(`${obj?.price || 0}`) * parseInt(`${obj?.quantity}`);
  }

  return extraPrice;
};

export function getDishPriceByVarient(
  variant: ICartVariant,
  cartDish: ICartDish
) {
  const dishPrice = cartDish?.dishData?.price;
  const { extra } = variant;
  let price = 0;
  price += parseInt(`${variant?.portion?.price || dishPrice}`);

  if (!isEmpty(extra)) price += getPriceOfExtra(extra);

  return price;
}

export const getDishPrice = (cartDish: ICartDish) => {
  let dishPrice = 0;
  cartDish.variants.map(
    (variant) => (dishPrice += getDishPriceByVarient(variant, cartDish))
  );
  return dishPrice;
};

export const getGrandTotalPrice = (cart: ICart) => {
  let grandTotal = 0;
  const cartItems = Object.values(cart);
  for (const cartDish of cartItems) {
    grandTotal += getDishPrice(cartDish);
  }
  return grandTotal;
};

export function getGrandTotal(cart: any, data: IBusinessData) {
  let total = 0;

  if (isEmpty(cart)) return total;

  Object.keys(cart).forEach((dishId) => {
    let dishPriceByVariants = 0;
    const cartDish = cart[dishId];

    if (
      cartDish?.variants?.length > 0 &&
      Object.keys(cartDish?.variants?.[0]?.extra || {})?.length > 0 &&
      cartDish?.variants?.[0]?.portion
    ) {
      cart?.[dishId]?.variants?.forEach((variant) => {
        const { portion, extra } = variant;
        if (isEmpty(portion) && isEmpty(extra)) {
          dishPriceByVariants += 1;
        } else {
          dishPriceByVariants += portion?.price || 0;

          Object.keys(extra).forEach((key) => {
            const { price, quantity } = extra[key];
            dishPriceByVariants += price * quantity;
          });
        }
      });
    } else {
      dishPriceByVariants = cartDish?.variants?.length || 1;
    }

    total +=
      dishPriceByVariants *
      (data?.dishesData?.find((d) => d.id === dishId)?.price || 1);
  });
  return total;
}
