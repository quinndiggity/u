i_text(`(s_obj views
cursor {
  id 'cursor h '80% w 2 b 'cc position 'absolute
}
text (f text h color
  (s h h|28)
  {tag 'div white-space 'pre i text c color margin 0 h h line-height h}
)
input (fv sText caret h
  [row
    (text (slice sText 0 caret) h)
    [row 'relative cursor (text sText^caret h)]
  ]
)
)`)