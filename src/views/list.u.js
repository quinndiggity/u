i_text(`(s_obj views
select (fv highlight list
  (map list (f item i
    (let color (if highlight=i 'cc))
    (text item.name 30 color)
  ))
)

)`)