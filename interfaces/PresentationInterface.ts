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
  navigationTitle: string
  title?: string
  description?: string
  image?: string | { light: string; dark: string }
  credentials: CredentialsInterface
}
