import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';
import PostModal from '../PostModal/PostModal';
import Spinner from '../Spinner/Spinner';
import Search from '../Search/Search';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import classes from './Posts.scss'
import _ from '../../src/utilities'


const client = new ApolloClient({
    uri: `https://api-euwest.graphcms.com/v1/cjmq0c0it4qdb01cu2gmqnyts/master`
})

const POSTS_QUERY = gql`
    {
      posts(orderBy: createdAt_DESC){
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
        searchTerm: '',
        category: '',
        categories: [],
        fillteredCategories: []
    }
    
    componentDidMount(){
        client.query({
          query: POSTS_QUERY
        })
        .then( ({data: {posts}}) => {

            const fetchedPosts = posts;
            const categories = [];

            fetchedPosts.forEach( ({category}) => {categories.push(category)})
            this.setState({categories})
        })
        .then( ()=> {
            const categories = [...this.state.categories];
            const fillteredCategories = this.remove_duplicate_from_arr(categories);
            this.setState({fillteredCategories})
        })

    }

    remove_duplicate_from_arr = arr => {
        let s = new Set(arr);
        let it = s.values();
        return Array.from(it);
    }
    
    
    render() {
        let categories = this.state.fillteredCategories.map( category => {
            return <button key={category} onClick={()=> this.setState({category})}>{category}</button>
        })
        return (
            <React.Fragment>
                <Search searchTerm={e=>this.setState({searchTerm:e.target.value})}/>
                <div className={classes.CategoryBox} ref="category">
                    <button onClick={()=> this.setState({category: ''})}>Wszystkie</button>
                    {categories}
                </div>
                <ApolloProvider client={client}>
                    <Query query={POSTS_QUERY}>
                        {({ loading, data }) => {
                            if (loading) return <Spinner/>
                            const { posts } = data;
                            return posts
                            .filter( ({title}) => {
                                return title.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1;
                            })
                            .filter( ({category}) => {
                                return category.toLowerCase().indexOf(this.state.category.toLowerCase()) !== -1;
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
                    <ScrollToTop/>
                </ApolloProvider>
            </React.Fragment>
        );
    }
}

export default Posts;
