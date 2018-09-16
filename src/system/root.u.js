i_text(`(s
root {
  nmap (os
    i insert_mode
    o indexPalette
    b basePalette
    h go_last
    j cursor_up
    k cursor_down
    l go_child
    Enter go_child
    Backspace rm_index
    ArrowLeft go_last
    ArrowRight go_child
    ArrowUp cursor_up
    ArrowDown cursor_down
  )
  imap (os
    Escape normal_mode
    Backspace rm_left
    mBackspace rm_line_start
    aBackspace rm_prev_space
    Delete rm_right
    ArrowLeft cursor_left
    ArrowRight cursor_right
    ArrowUp cursor_up
    ArrowDown cursor_down
    aArrowLeft prev_space
    aArrowRight next_space
    mArrowLeft line_start
    mArrowRight line_end
    mArrowUp line_top
    mArrowDown line_bottom
    Enter new_line
    mz undo
    msz redo
  )
  normal_mode (f {imap 0})
  insert_mode (f {imap 1})
  basePalette (f
    ['baseP ']
  )
  indexPalette (f
    ['indexP ']
  )
}
)`)