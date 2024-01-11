interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* <SiteHeader /> */}
      <main className="">{children}</main>
    </>
  )
}
