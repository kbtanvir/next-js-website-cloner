export const sitePath = "/sites/eshopper";

export const Paths = {
  home: {
    title: "Home",
    path: sitePath,
  },
  shop: {
    title: "shop",
    path: `${sitePath}/shop`,
  },
  cart: {
    title: "cart",
    path: `${sitePath}/cart`,
  },
  checkout: {
    title: "checkout",
    path: `${sitePath}/checkout`,
  },
  orderSuccess: {
    title: "success",
    path: `${sitePath}/order/success`,
  },
};

function makeNavigation(homeUrl: string) {
  return {
    home: {
      title: "Home",
      path: homeUrl,
    },
    about: {
      title: "About",
      path: `${homeUrl}/about`,
    },
    contact: {
      title: "Contact",
      path: `${homeUrl}/contact`,
    },
    shop: {
      title: "shop",
      path: `${homeUrl}/shop`,
    },
    cart: {
      title: "cart",
      path: `${homeUrl}/cart`,
    },
    checkout: {
      title: "checkout",
      path: `${homeUrl}/checkout`,
    },
    orderSuccess: {
      title: "success",
      path: `${homeUrl}/order/success`,
    },
  };
}

export const siteNavigation = {
  ecommerce: makeNavigation("/sites/eshopper"),
  aiImageGen: makeNavigation("/sites/ai-image-gen"),
  realEstate: makeNavigation("/sites/real-estate"),
  admin: makeNavigation("/admin"),
  crypto: makeNavigation("/sites/crypto"),
};
