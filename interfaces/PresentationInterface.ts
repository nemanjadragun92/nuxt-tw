export interface CredentialsInterface {
  publisher: {
    name: string
    role: string
  }
  data: string
  social: {
    linkedIn: string
    github: string
  }
}

export interface PresentationInterface {
  type: 'default' | 'intro' | 'credentials'
  time: number
  navigationTitle: string
  title?: string
  description?: string
  image?: string
  imageClass?: string
  imageVariant?: { light: string; dark: string }
  credentials: CredentialsInterface
  list?: any[]
  link?: string
}
