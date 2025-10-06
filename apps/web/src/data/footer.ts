type LinkProps = {
  group: string
  items: {
    title: string
    href: string
  }[]
}

export const footerLinks: LinkProps[] = [
  // {
  //   group: 'Product',
  //   items: [
  //     {
  //       title: 'Features',
  //       href: '#'
  //     },
  //     {
  //       title: 'Pricing',
  //       href: '#'
  //     },
  //     {
  //       title: 'About',
  //       href: '#'
  //     }
  //   ]
  // },
  {
    group: 'Solution',
    items: [
      {
        title: 'Startup',
        href: 'index#startup'
      },
      {
        title: 'Organizations',
        href: 'index#organizations'
      }
    ]
  },
  {
    group: 'Company',
    items: [
      {
        title: 'About',
        href: 'index#about'
      },
      {
        title: 'Contact',
        href: 'index#contact'
      },
      {
        title: 'How It Works',
        href: '/#how-it-works'
      }
    ]
  },
  {
    group: 'Legal',
    items: [
      {
        title: 'Terms',
        href: '/terms'
      },
      {
        title: 'Privacy',
        href: '/privacy-policy'
      }
    ]
  }
]
