/* =============================================
   HBCU Crown GSO Outlet - Stripe Configuration
   Live Payment Links for all products + sizes
   ============================================= */

const STRIPE_CONFIG = {
  // Payment links for each product + size combination
  paymentLinks: {
    // ---- Blue Jacket ($125) ----
    'NCAT-JACKET-BLUE__XS':  'https://buy.stripe.com/eVq7sNc3I6y64DyciCcQU0a',
    'NCAT-JACKET-BLUE__S':   'https://buy.stripe.com/4gM5kF9VAf4C9XS96qcQU0b',
    'NCAT-JACKET-BLUE__M':   'https://buy.stripe.com/eVq7sN9VA1dM8TO6YicQU0c',
    'NCAT-JACKET-BLUE__L':   'https://buy.stripe.com/3cIbJ3ffU1dM8TO96qcQU0d',
    'NCAT-JACKET-BLUE__XL':  'https://buy.stripe.com/5kQeVf4BgcWuda44QacQU0e',
    'NCAT-JACKET-BLUE__2XL': 'https://buy.stripe.com/6oU3cxc3Ig8GficciCcQU0f',

    // ---- Black Jacket ($125) ----
    'NCAT-JACKET-BLACK__XS':  'https://buy.stripe.com/9B67sN6Jo1dMficeqKcQU0g',
    'NCAT-JACKET-BLACK__S':   'https://buy.stripe.com/6oUcN72t83lUb1W96qcQU0h',
    'NCAT-JACKET-BLACK__M':   'https://buy.stripe.com/7sY7sN0l01dMee82I2cQU0i',
    'NCAT-JACKET-BLACK__L':   'https://buy.stripe.com/cNi5kF9VA9Ki5HC1DYcQU0j',
    'NCAT-JACKET-BLACK__XL':  'https://buy.stripe.com/6oUaEZ1p42hQ5HCaaucQU0k',
    'NCAT-JACKET-BLACK__2XL': 'https://buy.stripe.com/bJeeVfffUbSq9XSaaucQU0l',

    // ---- Grey Jacket ($125) ----
    'NCAT-JACKET-GREY__XS':  'https://buy.stripe.com/7sY3cxd7MbSq6LGbeycQU0m',
    'NCAT-JACKET-GREY__S':   'https://buy.stripe.com/5kQfZjd7M3lU1rm6YicQU0n',
    'NCAT-JACKET-GREY__M':   'https://buy.stripe.com/28E28taZEf4C1rm4QacQU0o',
    'NCAT-JACKET-GREY__L':   'https://buy.stripe.com/4gMcN7c3I8Ge1rm2I2cQU0p',
    'NCAT-JACKET-GREY__XL':  'https://buy.stripe.com/5kQ5kFgjYbSq3zubeycQU0q',
    'NCAT-JACKET-GREY__2XL': 'https://buy.stripe.com/bJe9AVgjYbSqc60ciCcQU0r',

    // ---- Camouflage Jacket ($125) ----
    'NCAT-JACKET-CAMO__XS':  'https://buy.stripe.com/28EeVf7Ns6y65HC2I2cQU0s',
    'NCAT-JACKET-CAMO__S':   'https://buy.stripe.com/fZu3cxffU09I0ni5UecQU0t',
    'NCAT-JACKET-CAMO__M':   'https://buy.stripe.com/bJe7sN0l0e0y1rmaaucQU0u',
    'NCAT-JACKET-CAMO__L':   'https://buy.stripe.com/14AfZjffUe0yda482mcQU0v',
    'NCAT-JACKET-CAMO__XL':  'https://buy.stripe.com/cNi4gB7Ns4pY5HC6YicQU0w',
    'NCAT-JACKET-CAMO__2XL': 'https://buy.stripe.com/6oUcN7ebQ3lUda4eqKcQU0x',

    // ---- Light Lemon Jacket ($125) ----
    'NCAT-JACKET-LEMON__XS':  'https://buy.stripe.com/9B65kF8Rw4pY3zu2I2cQU0y',
    'NCAT-JACKET-LEMON__S':   'https://buy.stripe.com/5kQdRb8Rwe0yda4gyScQU0z',
    'NCAT-JACKET-LEMON__M':   'https://buy.stripe.com/dRm28t5Fkf4C2vq2I2cQU0A',
    'NCAT-JACKET-LEMON__L':   'https://buy.stripe.com/cNi00l2t8f4Cgmg4QacQU0B',
    'NCAT-JACKET-LEMON__XL':  'https://buy.stripe.com/7sYdRbgjYaOmficdmGcQU0C',
    'NCAT-JACKET-LEMON__2XL': 'https://buy.stripe.com/6oU14p6JoaOm9XSfuOcQU0D',

    // ---- Black Sweatpants ($80) ----
    'NCAT-SWEATS-001__XS':  'https://buy.stripe.com/aFaaEZd7Me0y5HCciCcQU0E',
    'NCAT-SWEATS-001__S':   'https://buy.stripe.com/7sY4gB1p4e0ygmg82mcQU0F',
    'NCAT-SWEATS-001__M':   'https://buy.stripe.com/eVq28t1p4aOm6LGciCcQU0G',
    'NCAT-SWEATS-001__L':   'https://buy.stripe.com/00wfZj9VA4pYda496qcQU0H',
    'NCAT-SWEATS-001__XL':  'https://buy.stripe.com/bJe4gB6Jo4pYgmgeqKcQU0I',
    'NCAT-SWEATS-001__2XL': 'https://buy.stripe.com/cNi00lgjY1dM8TO96qcQU0J',

    // ---- Cropped Shorts ($30) ----
    'NCAT-SHORTS-001__XS':  'https://buy.stripe.com/5kQ7sNc3I7Cafic4QacQU0K',
    'NCAT-SHORTS-001__S':   'https://buy.stripe.com/4gM8wR6JoaOmb1W4QacQU0L',
    'NCAT-SHORTS-001__M':   'https://buy.stripe.com/9B69AVc3I1dM2vqbeycQU0M',
    'NCAT-SHORTS-001__L':   'https://buy.stripe.com/fZu14p6Jof4Cfic6YicQU0N',
    'NCAT-SHORTS-001__XL':  'https://buy.stripe.com/dRmeVfc3IcWu2vqaaucQU0O',
    'NCAT-SHORTS-001__2XL': 'https://buy.stripe.com/eVq6oJgjYaOm2vq1DYcQU0P',

    // ---- Rugby Polo ($80) ----
    'NCAT-POLO-001__XS':  'https://buy.stripe.com/5kQ8wR1p48GegmgciCcQU0Q',
    'NCAT-POLO-001__S':   'https://buy.stripe.com/aFacN78Rw7Ca8TO1DYcQU0R',
    'NCAT-POLO-001__M':   'https://buy.stripe.com/00w4gB3xc1dMc60gyScQU0S',
    'NCAT-POLO-001__L':   'https://buy.stripe.com/9B600l1p49Ki5HCgyScQU0T',
    'NCAT-POLO-001__XL':  'https://buy.stripe.com/28EaEZ4BgaOmda4ciCcQU0U',
    'NCAT-POLO-001__2XL': 'https://buy.stripe.com/dRm3cx9VA5u2b1W2I2cQU0V',

    // ---- Blue Shorts ($80) ----
    'NCAT-SHORTS-BLUE__XS':  'https://buy.stripe.com/8x26oJ6Jog8G1rm6YicQU0W',
    'NCAT-SHORTS-BLUE__S':   'https://buy.stripe.com/dRmaEZ7NsaOm8TOgyScQU0X',
    'NCAT-SHORTS-BLUE__M':   'https://buy.stripe.com/8x2cN76JobSq3zu96qcQU0Y',
    'NCAT-SHORTS-BLUE__L':   'https://buy.stripe.com/fZu9AVebQ1dM4Dy4QacQU0Z',
    'NCAT-SHORTS-BLUE__XL':  'https://buy.stripe.com/7sY28t6Jo9Ki2vqaaucQU10',
    'NCAT-SHORTS-BLUE__2XL': 'https://buy.stripe.com/bJe28t4Bg09I3zufuOcQU11',

    // ---- White Shorts ($80) ----
    'NCAT-SHORTS-WHITE__XS':  'https://buy.stripe.com/5kQbJ34Bgg8G5HC82mcQU12',
    'NCAT-SHORTS-WHITE__S':   'https://buy.stripe.com/eVq28taZE09I0ni6YicQU13',
    'NCAT-SHORTS-WHITE__M':   'https://buy.stripe.com/fZu3cxgjY09I1rm6YicQU14',
    'NCAT-SHORTS-WHITE__L':   'https://buy.stripe.com/28EbJ32t8g8Gfic1DYcQU15',
    'NCAT-SHORTS-WHITE__XL':  'https://buy.stripe.com/6oU8wR5Fkg8G0nieqKcQU16',
    'NCAT-SHORTS-WHITE__2XL': 'https://buy.stripe.com/eVq5kF2t8f4Cda40zUcQU17',
  }
};
