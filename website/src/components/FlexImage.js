import React from 'react';

export default function FlexImage({children, column_count = "2"}) {
  const itemClass = (column_count == "3") ? "flex-threecol-item" : "flex-twocol-item";

  return (
    <div class="image-flex-container">
    {React.Children.map(children, child =>
      <div class={itemClass}>
        {child}
      </div>
      )
    }
    </div>
  )
}
