declare global {
  declare module '*.scss' {
    const src: string
    export default src
  }
}
