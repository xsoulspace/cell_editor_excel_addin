declare interface TourInterface {
  target: string
  header: {
    title: string
  }
  content: string
  params?: {
    placement?: string
  }
}
