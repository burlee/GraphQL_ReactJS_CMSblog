import React from 'react';

export default ({searchTerm}) => {
  return (
    <React.Fragment>
        <input 
            type="text" 
            onChange={searchTerm}
            placeholder="Wyszukaj artykułu..."
            style={{
                width: '50%', 
                height: '40px', 
                margin: '10px', 
                borderRadius: '3px',
                outline: 'none',
                border: 'none',
                boxShadow:'0px 0px 15px #4c4c4c',
                paddingLeft: '5px'
            }}    
        />
    </React.Fragment>
  )
}
