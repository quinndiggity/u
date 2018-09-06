i_text(`(s 
css {
  theme {
    px 1 bs 'solid
    s0 12 s1 16 s2 20 s3 24
    c0 '#151515 c1 '#ac4142 c2 '#90a959 c3 '#f4bf75
    c4 '#6a9fb5 c5 '#aa759f c6 '#75b5aa c7 '#d0d0d0
    c8 '#505050 c9 '#ac4142 ca '#90a959 cb '#f4bf75
    cc '#6a9fb5 cd '#aa759f ce '#75b5aa cf '#f5f5f5
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