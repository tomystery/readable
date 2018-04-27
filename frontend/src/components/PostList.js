import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { formateDate } from '../util/util'





class PostList extends React.Component {
    render() {

        const { order, posts, currentCategory } = this.props;
        let postList = posts
        if (currentCategory !== 'all') {
            postList = postList.filter((post) => (post.category === currentCategory))
        }
        //sort 
        if (order === 'time') {
            postList.sort((a, b) => {
                return new Date(b.timestamp) - new Date(a.timestamp);
            });
        } else {
            //sort by vote
            postList.sort((a, b) => (a.voteScore < b.voteScore));
        }
        return (
            <div className="post-list">
                <ul>
                    {postList.map((post) => (
                        <li key={post.id} className='post-list-li'>
                            <div >
                                <p className='post-list-timestamp'>{formateDate(post.timestamp)}</p>
                                <Link to={`/post/${post.id}`}><h3>{post.title}</h3></Link>
                                <p><span>作者：{post.author}</span> <span>评论数：{post.commentCount}</span> <span>投票数：{post.voteScore}</span></p>
                            </div>
                        </li>
                    ))}

                </ul>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        currentCategory: state.categoryReducer.currentCategory
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList);

