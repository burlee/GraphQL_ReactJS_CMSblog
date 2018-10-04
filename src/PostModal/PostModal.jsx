import React, { PureComponent } from 'react';
import classes from './PostModal.scss';
import { withRouter } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import Gallery from './Gallery/Gallery'

class PostModal extends PureComponent {
  state = {
    showPost: false,
    background: '#454553',
    imageUrlToGallery: [],
    showGallery: false,
    galleryBtnValue:'Zobacz galerię'
  }

  showPostDetails = () => {
    this.setState({showPost: true});
    window.document.body.style.overflow = "hidden";
  }
  
  hidePostDetails = () => {
    this.setState({showPost: false});
    window.document.body.style.overflow = "visible";
  }

  handlePosition = () => {
    let scroller = this.refs.content;
    let height = scroller.clientHeight;
    let scrollHeight = scroller.scrollHeight - height;
    let scrollTop = scroller.scrollTop;
    let scrollPos = Math.floor(scrollTop / scrollHeight * 100);

    if(scrollPos <= 25){
      this.setState({background: '#454553'})
    }else if(scrollPos <= 50){
      this.setState({background: '#4c4c4c'})
    }else if(scrollPos <= 75){
      this.setState({background: '#656565'})
    }else if(scrollPos <= 100){
      this.setState({background: '#545467'})
    }
    
  }

  fetchImgUrl = () => {
    const allImages = this.refs.content.querySelectorAll("img");
    const allImagesToArray = [...allImages];

    if(allImagesToArray.length === 0){
      this.setState({showGallery:false, galleryBtnValue: 'Brak zdjęć w galerii'});
      setTimeout(()=> this.setState({galleryBtnValue: 'Zobacz galerię'}), 3000)
      return;
    }

    const imagesUrl = allImagesToArray.map( image => {
      return image.src;
    })

    this.setState({imageUrlToGallery: imagesUrl, showGallery: true})
  }

  render() {

    const { title, body, imgUrl, createdAt, category} = this.props;

    return (
      <div className={classes.PostModal}>
        <div className={classes.PostButton}>
            <i className="fas fa-arrow-right" onClick={this.showPostDetails}></i>
        </div>
        <div className={classes.PostInformation}>
            <div className={classes.PostMainInformation}>
              <h1>{title}</h1>
              <img src={`https://media.graphcms.com/${imgUrl}`} alt={title}/>
            </div>
            <div className={classes.SocialContainer}>
              <span style={{background: '#a4a4a4', color: '#FFF'}}>{category}</span>
              <span>Dodano: {createdAt.slice(0,10)}</span>
            </div>
        </div>
        {this.state.showPost ? 
          <div className={classes.PostDetails}>
              <div className={classes.PostDetails_1} style={{background: this.state.background}}>
                <h1>{title}</h1>
                <img src={`https://media.graphcms.com/${imgUrl}`} alt={title}/>
              </div>
              <div className={classes.PostDetails_2} onScroll={this.handlePosition} ref="content">
                <button onClick={this.hidePostDetails}>X</button>
                {this.state.showGallery ? <Gallery closeGallery={()=>this.setState({showGallery: false})} imageUrlToGallery={[...this.state.imageUrlToGallery]}/> : null}
                <Markdown>
                  {body}
                </Markdown>
                <h1 onClick={this.fetchImgUrl}>{this.state.galleryBtnValue}</h1>
              </div>
          </div> : null
        }
      </div>
    )
  }
}

export default withRouter(PostModal);