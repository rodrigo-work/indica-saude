type LinkProps = {
  group: string
  items: {
    title: string
    href: string
  }[]
}

export const footerLinks: LinkProps[] = [
  {
    group: 'Product',
    items: [
      {
        title: 'Features',
        href: '#'
      },
      {
        title: 'Pricing',
        href: '#'
      },
      {
        title: 'About',
        href: '#'
      }
    ]
  },
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
      }
    ]
  },
  {
    group: 'Legal',
    items: [
      {
        title: 'Terms',
        href: '/index#terms'
      },
      {
        title: 'Privacy',
        href: 'index#privacy'
      },
      {
        title: 'Contact',
        href: 'index#contact'
      }
    ]
  }
]
