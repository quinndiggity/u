i_text(`(s 
css {
  theme {
    px 1 bs 'solid
    s [12 16 20 24]
    c (as #2d2d2d #f2777a #99cc99 #ffcc66 #6699cc #cc99cc #66cccc #d3d0c8 #747369 #f2777a #99cc99 #ffcc66 #6699cc #cc99cc #66cccc #f2f0ec]
  }
  abbr (os
    bg background
    m margin
    w width
    h height
    c color
    f fontsize
  )
}
html {
  attr (as href src id class title)
  g_str (f tag oAttr oStyle innerHtml
    (s sAttr (reduce ' oAttr (f ret val key (+ ret key '=" val '" |s)))
       sStyle (reduce ' oStyle (f ret val key
         (s cssKey (prop key css.abbr)
            cssVal (prop val css.theme))
         (if (isn cssVal)
             (s cssVal (+ cssVal*css.theme.px 'px)))
         (+ ret cssKey ': cssVal ';)
       ))
       sStyle (if sStyle (+ 'style=" sStyle '") ')
    )
    (+ '< tag |s sAttr sStyle '> innerHtml '< tag '/>)
  )
  g_node (f obj
    (s tag (ifu obj.tag 'div $)
       innerHtml (ifu obj.i ' $)
       oStyle (assign obj)
       oAttr (take html.attr oStyle)
    )
    (delete oStyle 'tag 'i)
    (html.g_str tag oAttr oStyle innerHtml)
  )
  g_tree (fm tree
    isa (do
      (s node tree.0 node.i (+ (map tree^1 html.g_tree)))
      (html.g_node node) 
    )
    iso (html.g_node tree)
  )
}
)`)