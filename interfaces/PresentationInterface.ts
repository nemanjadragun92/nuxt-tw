export interface CredentialsInterface {
  publisher: {
    name: string
    role: string
  }
  data: string
  social: {
    linkedIn: string
    github: string
    portfolio: string
  }
}

export interface PresentationInterface {
  order: number
  slug: string
  type: 'default' | 'intro' | 'credentials' | 'examples' | 'iframe'
  time: number
  navigationTitle: string
  title?: string
  description?: string
  imageVariant?: { light: string; dark: string }
  credentials: CredentialsInterface
  list?: any[]
  link?: string
  image?: string
  imageClass?: string
  images?: { href: string }[]
  source?: string
}
