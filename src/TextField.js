import React from 'react'
import { Stage, Layer } from 'react-konva'

import HtmlDom from './HtmlDom'

const initialRectangles = [
  {
    x: 50,
    y: 50,
    // width: 100,
    // height: 100,
    fill: 'red',
    id: 'rect1'
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: 'green',
    id: 'rect2'
  }
]

export default function TextField() {
  const [rectangles, setRectangles] = React.useState(initialRectangles)
  const [selectedId, selectShape] = React.useState(null)

  const checkDeselect = e => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage()
    if (clickedOnEmpty) {
      selectShape(null)
    }
  }

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {rectangles.map((rect, i) => {
          return (
            <HtmlDom
              key={i}
              shapeProps={rect}
              isSelected={rect.id === selectedId}
              onSelect={() => {
                selectShape(rect.id)
              }}
              onChange={newAttrs => {
                const rects = rectangles.slice()
                rects[i] = newAttrs
                setRectangles(rects)
              }}
            />
          )
        })}
      </Layer>
    </Stage>
  )
}
