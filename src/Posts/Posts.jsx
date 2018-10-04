import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';
import PostModal from '../PostModal/PostModal';
import Spinner from '../Spinner/Spinner';
import Search from '../Search/Search';
import ScrollToTop from '../ScrollToTop/ScrollToTop';


const client = new ApolloClient({
    uri: `https://api-euwest.graphcms.com/`
})

const POSTS_QUERY = gql`
    {
      posts {
        createdAt
        id
        title
        body
        category
        photo {
          handle
          id
        }
      }
    }
`;

const BOOK_QUERY = gql`
    {
      books {
        createdAt
        updatedAt
        status
        id
        bookTitle
      }
    }
`;


class Posts extends Component {
    state = {
        searchTerm: ''
    }

    // componentDidMount(){
    //     client.query({
    //       query: POSTS_QUERY
    //     }).then( ({data: {posts}}) => {
    //       const fetchedPosts = posts;
    //         console.log(fetchedPosts)
    //         this.setState({fetchedPosts})
    //       fetchedPosts.forEach(({body, id}) => {
    //         console.log(body, id)
    //       })
    //     })
    // }

    scrollToTop = () => {
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        })
    }
    

    render() {
        return (
            <React.Fragment>
                <Search searchTerm={e=>this.setState({searchTerm:e.target.value})}/>

                <ApolloProvider client={client}>
                    <Query query={POSTS_QUERY}>
                        {({ loading, data }) => {
                            if (loading) return <Spinner/>
                            const { posts } = data;
                            return posts
                            .filter( post => {
                                return post.title.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1;
                            })
                            .map( (post , index) =>
                            <PostModal
                                id={index+1}
                                title={post.title}
                                body={post.body}
                                key={post.id}
                                category={post.category}
                                imgUrl={post.photo.handle}
                                createdAt={post.createdAt}
                            />)
                        }}
                    </Query>
                    {/* <div>
                    <h1>dsa</h1>
                        <Query query={BOOK_QUERY}>
                            {({data, loading})=>{
                                if(loading) return <Spinner/>

                                const { books } = data;
                                console.log( books)
                                return books.map( book => <span>{book.bookTitle}</span>)
                            }}
                        </Query>
                    </div> */}
                    <ScrollToTop scrollToTop={this.scrollToTop}/>
                </ApolloProvider>
            </React.Fragment>
        );
    }
}

export default Posts;
