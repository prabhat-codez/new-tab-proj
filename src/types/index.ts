export type ImageFile = {
  id: string
  file: File
  name: string
  type: string
  imageUrl?: string
}

export type Query = {
  query: string
  id: string
  isIcon: boolean
}
