import React, { PureComponent } from 'react';
import classes from './PostModal.scss';
import { withRouter } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import Gallery from './Gallery/Gallery';
import BlogTextOption from './BlogTextOption/BlogTextOption'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class PostModal extends PureComponent {
  state = {
    showPost: false,
    background: '#454553',
    imageUrlToGallery: [],
    showGallery: false,
    galleryBtnValue:'Zobacz galerię',
    fontSize: 14
  }
  componentDidMount(){
    
    const array = [1,2,3,4,5]
    const res = Math.min(...array);
    console.log(res)
    
  }

  ret = (str) => {
    return Math.max(0, Math.min(10, str))
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

  enlargeFont = () => {
    if(this.state.fontSize === 20)return;

    const paragraph = [...this.refs.content.querySelectorAll("p")];
    const fontSize = this.state.fontSize;
    this.setState({fontSize: fontSize+1});

    paragraph.forEach( paragraph => {
      paragraph.style.fontSize = `${fontSize+1}px`;
    })

  }

  decreaseFont = () => {
    if(this.state.fontSize === 12)return;

    const paragraph = [...this.refs.content.querySelectorAll("p")];
    const fontSize = this.state.fontSize;
    this.setState({fontSize: fontSize-1});

    paragraph.forEach( paragraph => {
      paragraph.style.fontSize = `${fontSize-1}px`;
    })
    
  }

  
  render() {

    const transitionOption = {
      transitionName: "fade",
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 400
    };

    const { title, body, imgUrl, createdAt, category} = this.props;

    return (
      <article className={classes.PostModal}>
        <div className={classes.PostButton}>
            <i className="fas fa-arrow-right" onClick={this.showPostDetails}></i>
            <button onClick={this.showPostDetails}>Przejdź do bloga</button>
        </div>
        <div className={classes.PostInformation}>
            <div className={classes.PostMainInformation}>
              <header>{title}</header>
              <img src={`https://media.graphcms.com/${imgUrl}`} alt={title}/>
            </div>
            <div className={classes.SocialContainer}>
              <span style={{background: '#a4a4a4', color: '#FFF'}}>{category}</span>
              <span>Dodano: {createdAt.slice(0,10)}</span>
            </div>
        </div>
        <ReactCSSTransitionGroup {...transitionOption}>
          {this.state.showPost ? 
            <div className={classes.PostDetails}>
                <div className={classes.PostDetails_1} style={{background: this.state.background}}>
                  <header style={{color: '#FFF'}}>{title}</header>
                  <img src={`https://media.graphcms.com/${imgUrl}`} alt={title}/>
                </div>
                <article className={classes.PostDetails_2} onScroll={this.handlePosition} ref="content">
                  <button onClick={this.hidePostDetails}>X</button>
                  {this.state.showGallery ? 
                    <Gallery closeGallery={()=>this.setState({showGallery: false})} imageUrlToGallery={[...this.state.imageUrlToGallery]}/> 
                  : null}
                  <Markdown>
                    {body}
                  </Markdown>
                  <button style={{background: "none", position: 'inherit', color: '#4c4c4c', width: '100%', padding: '10px'}} onClick={this.fetchImgUrl}>{this.state.galleryBtnValue}</button>
                </article>
                <BlogTextOption background={this.state.background} enlargeFont={this.enlargeFont} decreaseFont={this.decreaseFont}/>
            </div> : null
          }
        </ReactCSSTransitionGroup>
      </article>
    )
  }
}

export default withRouter(PostModal);