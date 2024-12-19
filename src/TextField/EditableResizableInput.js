import React from 'react';
import Draggable from 'react-draggable';

const EditableResizableInput = ({ x = 1000, y = 100, width = '100px', onChange }) => {




  return (
    <Draggable>
      <div className="box" style={{ position: 'absolute', left: x, top: y, width: width }}>
        {/* <input type='textarea' placeholder='Enter Text' className="apply-font font-style"/> */}
        <textarea  placeholder='Enter Text' className="apply-font font-style" rows="4" cols="10"/>

      </div>
    </Draggable>
  );
};

export default EditableResizableInput;
