export const BASE_URL = 'https://api.oddsbit.io/'
export const API_BASE_URL = 'https://api.oddsbit.io/auto'

export const DEFAULT = "0"
export const ACTIVE = "1"
export const NA = "n/a"
export const TYPES = ["checkbox", "color"]

export const USERS_TYPE = {
  0: 'consumer',
  1: 'company'
}

export const DOCUMENTS_TYPE = {
  0: 'passport',
  1: 'other',
  2: 'vat',
  3: 'registration_certificate'
}

export const DOCUMENTS_VERIFICATIONS = {
  0: "not_verified",
  1: "verified",
  2: "pending",
  3: "rejected",
}

export const NOTIFICATIONS_TYPE = {
  0: 'shares',
  1: 'selling',
  2: 'purchase',
  3: 'info',
}

export const CARD_STATUS = {
  0: "not_active",
  1: "active",
  2: "sold"
}

export const NAVIGATION = {
  home: {
    link: '/',
    text: 'navigation.home',
  },
  buy: {
    link: '/cars',
    text: 'navigation.buy',
  },
  car: {
    link: '/car',
    text: 'navigation.car',
  },
  new_auto: {
    link: '/new-auto',
    text: 'navigation.new_auto',
  },
  how_it_works: {
    link: '/how-it-works',
    text: 'navigation.how_it_works',
  },
  reviews: {
    link: '/reviews',
    text: 'navigation.reviews',
  },
  services: {
    link: '/services',
    text: 'navigation.services',
  },
  about_us: {
    link: '/about-us',
    text: 'navigation.about_us',
  },
  advanced_search: {
    link: '/advanced-search',
    text: 'navigation.advanced_search'
  },
  not_found: {
    link: '/not-found',
    text: 'navigation.not_found'
  },
  sitemap: {
    link: '/sitemap',
    text: 'navigation.sitemap'
  },
  login: {
    link: '/login',
    text: 'navigation.login'
  },
}

export const ROUTES_USER = {
  profile: {
    link: 'profile',
    text: 'navigation.profile',
  },
  favorites: {
    link: '/profile/favorite',
    text: 'navigation.favorites',
    icon: 'heart'
  },
  saved: {
    link: '/profile/saved',
    text: 'navigation.saved',
    icon: 'bookmark'
  },
  last: {
    link: '/profile/last-search',
    text: 'navigation.last',
    icon: 'history'
  },
  orders: {
    link: '/profile/orders',
    text: 'navigation.orders',
    icon: 'order'
  },
  settings: {
    link: '/profile/settings',
    text: 'navigation.settings',
    icon: 'settings'
  },
  vehicles: {
    link: '/profile/vehicles',
    text: 'navigation.vehicles',
    icon: 'drive'
  },
  archive: {
    link: '/profile/archive',
    text: 'navigation.archive',
    icon: 'trash'
  },
  notification: {
    link: '/profile/notification',
    text: 'navigation.notification',
    icon: 'bell'
  },
  chat: {
    link: '/profile/chat',
    text: 'navigation.chat',
    icon: 'mail'
  }
}
