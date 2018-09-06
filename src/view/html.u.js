i_text(`(s 
css {
  theme {
    px 1 bs 'solid
    s0 12 s1 16 s2 20 s3 24
    c0 '#2b303b c1 '#bf616a c2 '#a3be8c c3 '#ebcb8b
    c4 '#8fa1b3 c5 '#b48ead c6 '#96b5b4 c7 '#c0c5ce
    c8 '#747369 c9 '#f2777a ca '#99cc99 cb '#ffcc66
    cc '#6699cc cd '#cc99cc ce '#66cccc cf '#f2f0ec
  }
  abbr (os
    b background
    bs border-style
    bw border-width
    bc border-color
    c color
    d display
    f fontsize
    h height
    m margin
    p padding
    pl padding-left
    pr padding-right
    w width
    ta text-align
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
    (+ '< tag |s sAttr sStyle '> innerHtml '</ tag '>)
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
      (s node (assign tree.0) node.i (+ (map tree^1 html.g_tree)))
      (html.g_node node)
    )
    iso (html.g_node tree)
  )
}
)`)