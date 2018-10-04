import React, { PureComponent } from 'react';
import classes from './Gallery.scss';

export default class Gallery extends PureComponent {
  render() {
    const { imageUrlToGallery, closeGallery } = this.props;
    let gallery = imageUrlToGallery.map( image => {
        return <img 
                src={image} 
                alt="Zdjęcie blogowe" 
                key={image}
                style={{
                    maxWidth: '90%',
                    margin: '20px auto',
                    display: 'block'
                }}
                onClick={e=>e.stopPropagation()}
            />
    })
    return (
      <div className={classes.Gallery} onClick={closeGallery}>
        {gallery}
        <button onClick={closeGallery}>X</button>
      </div>
    )
  }
}
