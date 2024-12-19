import React, { createRef, useState, useCallback } from 'react';
import './styles.css';
import { Image as KonvaImage, Layer, Stage } from 'react-konva';
import useImage from 'use-image';
import { IndividualSticker } from './individualSticker';
import { stickersData } from './stickersData';
import { photoData } from './photoData';
import EditableResizableInput from './TextField/EditableResizableInput';
import FontPicker from "font-picker-react";

export default function App() {
  const [background, setBackground] = useState(null); 
  const [images, setImages] = useState([]);
  const [fields, setFields] = useState([]);
  const [showTextInput, setShowTextInput] = useState(false); 
  const [activeFontFamily, setFont] = useState();

  const addStickerToPanel = ({ src, width, x, y }) => {
    setImages((currentImages) => [
      ...currentImages,
      {
        width,
        x,
        y,
        src,
        resetButtonRef: createRef(),
      },
    ]);
  };

  const addPhotoToPanel = ({ src }) => {
    setBackground(src); // Set background image
  };

  const addTextToPanel = () => {
    setShowTextInput(true); // Show the text input
  };

  const resetAllButtons = useCallback(() => {
    images.forEach((image) => {
      if (image.resetButtonRef.current) {
        image.resetButtonRef.current();
      }
    });
  }, [images]);

  const handleCanvasClick = useCallback((event) => {
    if (event.target.attrs.id === 'backgroundImage') {
      resetAllButtons();
    }
  }, [resetAllButtons]);

  // Load background image using useImage hook
  const [backgroundImage] = useImage(background);

  return (
    <>
    <div className='top-main'>
      {showTextInput && <div className='top-container'>
    <FontPicker
          apiKey="AIzaSyDPtqHOkdnMVZb6wrHcyz1Mwyn0Au-HCbI"
          activeFontFamily={activeFontFamily}
          onChange={(nextFont) => setFont(nextFont.family)}
        />
        
    </div>}
    
    </div>
      <div className="main-container">
        <div className="left-container">
          <h4 className="heading">Click/Tap to add sticker to photo!</h4>
          {stickersData.map((sticker, index) => (
            <button
              key={index}
              className="button"
              onMouseDown={() =>
                addStickerToPanel({
                  src: sticker.url,
                  width: sticker.width,
                  x: 100,
                  y: 100,
                })
              }
            >
              <img alt={sticker.alt} src={sticker.url} width={sticker.width} />
            </button>
          ))}
          <h4 className="heading">Click/Tap to add photo!</h4>
          {photoData.map((photo, index) => (
            <button
              key={index}
              className="button"
              onMouseDown={() =>
                addPhotoToPanel({
                  src: photo.url,
                  width: photo.width,
                  x: 100,
                  y: 100,
                })
              }
            >
              <img alt={photo.alt} src={photo.url} width={photo.width} />
            </button>
          ))}
          <h4
            className="heading"
            onClick={addTextToPanel}
            style={{ cursor: 'pointer' }}
          >
            Click to Add Text!
          </h4>
        </div>
        <div className="right-container">
          <Stage
            width={1000}
            height={800}
            className="stage"
            onClick={handleCanvasClick}
            onTap={handleCanvasClick}
          >
            <Layer>
              {backgroundImage && (
                <KonvaImage image={backgroundImage} id="backgroundImage" />
              )}
              {images.map((image, i) => (
                <IndividualSticker
                  key={i}
                  image={image}
                  onDelete={() => {
                    const newImages = [...images];
                    newImages.splice(i, 1);
                    setImages(newImages);
                  }}
                  onDragEnd={(event) => {
                    image.x = event.target.x();
                    image.y = event.target.y();
                  }}
                />
              ))}
            </Layer>
          </Stage>
          {showTextInput && <EditableResizableInput />}
        </div>
      </div>
    
    </>
  );
}
