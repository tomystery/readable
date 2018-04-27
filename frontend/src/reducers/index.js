import { combineReducers } from 'redux'
import {
    RECEIVE_CATEGORIES, RECEIVE_POSTS, RECEIVE_COMMENT, CHANGE_ORDER, ADD_POST,
    RECEIVE_CURRENT_CATEGORY, COMMENT_ORDER, GET_CURRENT_COMMENT_ID, EDIT_MODAL_OPEN, EDIT_MODAL_CLOSE,
    UPDATE_COMMENT, DEL_COMMENT, ADD_COMMENT, EDIT_POST_MODAL_OPEN, EDIT_POST_MODAL_CLOSE, UPDATE_POST, DEL_POST, POST_UPDATE_TITLE, POST_UPDATE_BODY
} from '../actions'
import { stat } from 'fs';



/* 分类相关 */
const categoryState = {
    categories: [],
    currentCategory: 'all'
}

function categoryReducer(state = categoryState, action) {
    switch (action.type) {
        case RECEIVE_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            };
        case RECEIVE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.category
            }
        default:
            return state
    }
}

/* post相关  */

const postState = {
    posts: [],
    visible: false
}

function postReducer(state = postState, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return {
                ...state,
                posts: action.posts

            }
        case ADD_POST:
            const postList = state.posts.concat()
            postList.push(action.post)
            return {
                ...state,
                posts: postList
            }
        case EDIT_POST_MODAL_OPEN:
            return {
                ...state,
                visible: true
            }
        case EDIT_POST_MODAL_CLOSE:
            return {
                ...state,
                visible: false
            }
        case UPDATE_POST:
            let updateResult = state.posts
            updateResult.forEach((post, index) => post.id === action.post.id ? (state.posts[index] = action.post) : '')
            return {
                ...state,
                posts: updateResult
            }
        case DEL_POST:
            let delResult = state.posts.concat()
            delResult.forEach((post, index) => post.id === action.id ? (delResult.splice(index, 1)) : "")
            return {
                ...state,
                posts: delResult
            }
        case POST_UPDATE_TITLE:
            let postResult = state.posts.concat()
            
            postResult.forEach((post, index) => post.id === action.id ? (state.posts[index].title = action.value) : '')
            return {
                ...state,
                posts: postResult
            }
        case POST_UPDATE_BODY:
            let postResult1 = state.posts.concat()
            postResult1.forEach((post, index) => post.id === action.id ? (state.posts[index].body = action.value) : '')
            return {
                ...state,
                posts: postResult1
            }
        default:
            return state


    }

}

/* comments相关  */
const commentState = {
    comments: [],
    commentOrder: 'vote',
    visible: false

}
function commentReducer(state = commentState, action) {
    let copy;
    switch (action.type) {
        case RECEIVE_COMMENT:
            return {
                ...state,
                comments: action.comment
            }
        case COMMENT_ORDER:
            let newOrder;
            if (state.commentOrder === 'vote') {
                newOrder = 'time'
            } else {
                newOrder = 'vote'
            }
            return {
                ...state,
                commentOrder: newOrder

            }
        case EDIT_MODAL_OPEN:
            return {
                ...state,
                visible: true
            }
        case EDIT_MODAL_CLOSE:
            return {
                ...state,
                visible: false
            }
        case UPDATE_COMMENT:
            const updateResult = state.comments
            updateResult.forEach((comment, index) => (comment.id === action.comment.id ? (state.comments[index] = action.comment) : ''))

            return {
                ...state,
                comments: updateResult

            }
        case DEL_COMMENT:
            copy = state.comments.concat();

            state.comments.forEach((comment, index) => comment.id === action.id ? (copy.splice(index, 1)) : "")

            return {
                ...state,
                comments: copy
            }
        case ADD_COMMENT:
            const commentsList = state.comments.concat()
            commentsList.push(action.comment)
            return {
                ...state,
                comments: commentsList
            }
        default:
            return state
    }

}

/* others相关 */
const otherState = {
    order: "vote",
    currentCommentId: ''
}

function otherReducer(state = otherState, action) {
    switch (action.type) {
        case CHANGE_ORDER:
            let newOrder;
            if (state.order === 'time') {
                newOrder = 'vote';
            } else {
                newOrder = 'time'
            }
            return {
                ...state,
                order: newOrder
            }
        case GET_CURRENT_COMMENT_ID:
            return {
                ...state,
                currentCommentId: action.id
            }
        default:
            return state;
    }

}

export default combineReducers({
    categoryReducer,
    postReducer,
    commentReducer,
    otherReducer
})