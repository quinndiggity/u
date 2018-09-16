i_text(`(s components.baseP (components.Palette {
  name 'base
  init_list (f (keys d))
  confirm (f
    (let mi matches,index)
    (ifn mi.noMatch
         (s base mi.name app [])
       (s base query app []
          d,query [[(+ query |s 'root)]] )
       (save_storage '_bases (keys d))
    )
    ['outIndex 0]
  )
}))`)